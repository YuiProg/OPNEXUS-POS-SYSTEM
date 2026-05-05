import generateToken from '../lib/generateToken.js'
import ApiResponseModel from '../models/ApiResponseModel.js'
import Branch from '../models/Branches.js'
import SystemLogs from '../models/SystemLogs.js'
import User from '../models/UserModel.js'
import Strings from '../strings/strings-codes.js'
import sendMail from '../middleware/sendEmail.js'

const { SUCCESS_MESS, SUCCESS, ERROR, CREATED, DELETEUSER, NEWUSER, UPDATEUSER, PASSWORDEDIT } =
  Strings

const errorHandling = (error) => {
  if (error.code === 11000) {
    return 'Clerk Already Exists.'
  }
  return error.message
}

export const register = async (req, res) => {
  try {
    const data = req.body;

    const { userId } = req.user;
    const userData = await User.getUser(userId);
    const createdUser = await User.registerUser(data);
    console.log(data);
    const logPayload = {
      user: userData.username,
      action: NEWUSER,
      branchLocation: userData.branchLocation,
      log: `${userData.username} created a new user called ${createdUser.username}`
    };
    console.log(data);
    if (data.sendEmail) {
      //send email sa user
      try {
        const info = await sendMail({
            from: `"OPNEXUS" <${process.env.SMTP_USER}>`,
            to: data.email,
            subject: 'Welcome to Our Service',
            text: `Hello! you are now a ${data.role} of {POSNAME}. Your temporary password is: ${data.password}`,
            html: `
                <p>Hello! you are now a ${data.role} of {POSNAME}</p>
                <p>Your Email is ${data.email}<p>
                <p>Your temporary password is: <strong>${data.password}</strong></p>
                <p>Please change your password after logging in.</p>
                <p>THIS EMAIL IS CONFIDENTIAL AND SHALL USED FOR AUTHENTICATION PROCESSES.<p>
            `
        });
        console.log('Email sent:', info.response);
      } catch (error) {
        console.error('Error sending email:', error);
      }
    }
    await SystemLogs.addLog(logPayload)
    ApiResponseModel(res, CREATED, SUCCESS_MESS, createdUser)
  } catch (error) {
    const message = errorHandling(error)
    ApiResponseModel(res, ERROR, message)
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.loginUser(email, password)

    //const { _: _, ...userWithoutPassword } = user.toObject(); // already using _
    generateToken(user._id, res)
    ApiResponseModel(res, SUCCESS, SUCCESS_MESS, user)
  } catch (error) {
    ApiResponseModel(res, ERROR, error.message)
  }
}

export const updateUser = async (req, res) => {
  try {
    const data = req.body
    const { id } = req.params
    const { userId } = req.user
    const userData = await User.getUser(userId)
    const oldModel = await User.getSingleUser(id)
    if (!oldModel) {
      return ApiResponseModel(res, ERROR, 'User not found')
    }

    if (data.branchLocation !== 'N/A') {
      const branch = await Branch.updateUserInBranch(id, data.branchLocation, data)
      console.log(branch)
    }

    const logPayload = {
      user: userData.username,
      action: UPDATEUSER,
      branchLocation: userData.branchLocation,
      log: `${userData.username} updated the user ${oldModel.username}'s information`
    }

    await SystemLogs.addLog(logPayload)

    const updated_user = await User.updateUser(id, data)
    ApiResponseModel(res, SUCCESS, SUCCESS_MESS, updated_user, oldModel)
  } catch (error) {
    ApiResponseModel(res, ERROR, error.message)
  }
}

export const logoutUser = async (req, res) => {
  res.cookie('jwt', '', { maxAge: 0 })
  //res.status(SUCCESS).json({status: SUCCESS_MESS, message: USER_LOGOUT});
  ApiResponseModel(res, SUCCESS, SUCCESS_MESS)
}

export const getAuthUser = async (req, res) => {
  try {
    const { userId } = req.user
    const user = await User.getUser(userId)

    /* eslint-disable-next-line */
    const { password: _, ...userWithoutPassword } = user.toObject()
    ApiResponseModel(res, SUCCESS, SUCCESS_MESS, userWithoutPassword)
  } catch (error) {
    ApiResponseModel(res, ERROR, error.message)
  }
}

export const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.getSingleUser(id)
    ApiResponseModel(res, SUCCESS, SUCCESS_MESS, user)
  } catch (error) {
    ApiResponseModel(res, ERROR, error.message)
  }
}

export const getUsers = async (req, res) => {
  try {
    const { branch } = req.params

    const users = await User.getUsers(branch === 'null' ? null : req.params.branch || null)
    const usersWithFullName = users.map((user) => ({
      Id: user._id,
      Username: user.username,
      Employee: [user.firstName, user.middleName, user.lastName]
        .filter(Boolean)
        .join(' ')
        .toUpperCase(),
      ...user._doc
    }))
    ApiResponseModel(res, SUCCESS, SUCCESS_MESS, usersWithFullName)
  } catch (error) {
    ApiResponseModel(res, ERROR, error.message)
  }
}

export const deleteMultiple = async (req, res) => {
  try {
    const list = req.body
    const { userId } = req.user
    const userData = await User.getUser(userId)
    const users = await Promise.all(list.map((id) => User.getSingleUser(id)))

    for (const user of users) {
      if (user.timedIn) {
        return ApiResponseModel(res, ERROR, `User ${user.username} is currently timed in!`)
      }
      if (user.branchLocation !== 'N/A') {
        await Branch.removeUserFromOldBranch(user.branchLocation, { Id: user._id })
      }
      const logPayload = {
        user: userData.username,
        action: DELETEUSER,
        branchLocation: userData.branchLocation,
        log: `${userData.username} deleted the user ${user.username}`
      }
      await SystemLogs.addLog(logPayload)
    }
    const result = await User.deleteMultiple(list)
    ApiResponseModel(res, SUCCESS, SUCCESS_MESS, result)
  } catch (error) {
    ApiResponseModel(res, ERROR, error.message)
  }
}

export const deleteSingle = async (req, res) => {
  try {
    const { id } = req.body
    const user = await User.getSingleUser(id)
    if (user.timedIn) {
      return ApiResponseModel(res, ERROR, 'User is currently timed in!')
    }
    //console.log(user.Id);
    if (user.branchLocation !== 'N/A') {
      await Branch.removeUserFromOldBranch(user.branchLocation, { Id: user._id })
    }
    const result = await User.deleteSingleUser(id)
    ApiResponseModel(res, SUCCESS, SUCCESS_MESS, result)
  } catch (error) {
    ApiResponseModel(res, ERROR, error.message)
  }
}

export const changePassword = async (req, res) => {
  try {
    const { id } = req.params
    const { newPassword, oldPassword } = req.body
    console.log(oldPassword, newPassword)
    const updatedUser = await User.changePassword(id, newPassword, oldPassword)
    const logPayload = {
      user: updatedUser.username,
      action: PASSWORDEDIT,
      branchLocation: updatedUser.branchLocation,
      log: `${updatedUser.username} changed their password`
    }
    await SystemLogs.addLog(logPayload)
    ApiResponseModel(res, SUCCESS, SUCCESS_MESS)
  } catch (error) {
    ApiResponseModel(res, ERROR, error.message)
  }
}
