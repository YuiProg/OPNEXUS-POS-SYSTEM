import generateToken from '../lib/generateToken.js'
import ApiResponseModel from '../models/ApiResponseModel.js'
import Branch from '../models/Branches.js'
import SystemLogs from '../models/SystemLogs.js'
import User from '../models/UserModel.js'
import Strings from '../strings/strings-codes.js'
import sendMail from '../lib/sendEmail.js'



const { SUCCESS_MESS, SUCCESS, ERROR, CREATED, DELETEUSER, NEWUSER, UPDATEUSER, PASSWORDEDIT } =
  Strings

const errorHandling = (error) => {
  if (error.code === 11000) {
    return 'Clerk Already Exists.'
  }
  return error.message
}

const logResponse = (req, status, data) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} -> ${status}`, JSON.stringify(data))
}

export const validateNewUser = async (req, res) => {
  const data = req.body;
  
  if (data.username && data.password && data.firstName && data.lastName && data.email) {
    try {
      const existingUser = await User.findOne({ username: data.username });
      if (existingUser) {
        return res.status(ERROR).json({ status: 'Username already exists' });
      }
    } catch (error) {
      return res.status(ERROR).json({ status: 'Error validating username', error: error.message });
    }
    return res.status(SUCCESS).json({ status: 'Validation successful', data });
  } else {
    return res.status(ERROR).json({ status: 'Missing required fields' });
  }
}

export const register = async (req, res) => {
  try {
    const data = req.body;

    const { userId } = req.user;
    const userData = await User.getUser(userId);
    const createdUser = await User.registerUser(data);

    const logPayload = {
      user: userData.username,
      action: NEWUSER,
      branchLocation: userData.branchLocation,
      log: `${userData.username} created a new user called ${createdUser.username}`
    };
    console.log(data);
    if (data.sendEmail === true) {
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
                <p>THIS EMAIL IS CONFIDENTIAL AND SHALL BE USED FOR AUTHENTICATION PROCESSES.<p>
            `
        });
        console.log('Email sent:', info.response);
      } catch (error) {
        console.error('Error sending email:', error);
      }
    }
    await SystemLogs.addLog(logPayload)
    logResponse(req, CREATED, { status: SUCCESS_MESS, data: createdUser })
    ApiResponseModel(res, CREATED, SUCCESS_MESS, createdUser)
  } catch (error) {
    const message = errorHandling(error)
    logResponse(req, ERROR, { status: message })
    ApiResponseModel(res, ERROR, message)
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.loginUser(email, password);
    //const { _: _, ...userWithoutPassword } = user.toObject();
    generateToken(user._id, res)
    logResponse(req, SUCCESS, { status: SUCCESS_MESS, user: user.username || user.email })
    ApiResponseModel(res, SUCCESS, SUCCESS_MESS, user)
  } catch (error) {
    logResponse(req, ERROR, { status: error.message })
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
      logResponse(req, ERROR, { status: 'User not found' })
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
    logResponse(req, SUCCESS, { status: SUCCESS_MESS, data: updated_user })
    ApiResponseModel(res, SUCCESS, SUCCESS_MESS, updated_user, oldModel)
  } catch (error) {
    logResponse(req, ERROR, { status: error.message })
    ApiResponseModel(res, ERROR, error.message)
  }
}

export const logoutUser = async (req, res) => {
  res.cookie('jwt', '', { maxAge: 0 })
  //res.status(SUCCESS).json({status: SUCCESS_MESS, message: USER_LOGOUT});
  logResponse(req, SUCCESS, { status: SUCCESS_MESS })
  ApiResponseModel(res, SUCCESS, SUCCESS_MESS)
}

export const getAuthUser = async (req, res) => {
  try {
    const { userId } = req.user
    const user = await User.getUser(userId)

    /* eslint-disable-next-line */
    const { password: _, ...userWithoutPassword } = user.toObject()
    logResponse(req, SUCCESS, { status: SUCCESS_MESS, data: userWithoutPassword })
    ApiResponseModel(res, SUCCESS, SUCCESS_MESS, userWithoutPassword)
  } catch (error) {
    logResponse(req, ERROR, { status: error.message })
    ApiResponseModel(res, ERROR, error.message)
  }
}

export const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.getSingleUser(id)
    logResponse(req, SUCCESS, { status: SUCCESS_MESS, data: user })
    ApiResponseModel(res, SUCCESS, SUCCESS_MESS, user)
  } catch (error) {
    logResponse(req, ERROR, { status: error.message })
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
    logResponse(req, SUCCESS, { status: SUCCESS_MESS, count: usersWithFullName.length })
    ApiResponseModel(res, SUCCESS, SUCCESS_MESS, usersWithFullName)
  } catch (error) {
    logResponse(req, ERROR, { status: error.message })
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
        logResponse(req, ERROR, { status: `User ${user.username} is currently timed in!` })
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
      await SystemLogs.addLog(logPayload);
    }
    const result = await User.deleteMultiple(list)
    logResponse(req, SUCCESS, { status: SUCCESS_MESS, data: result })
    ApiResponseModel(res, SUCCESS, SUCCESS_MESS, result)
  } catch (error) {
    logResponse(req, ERROR, { status: error.message })
    ApiResponseModel(res, ERROR, error.message)
  }
}

export const deleteSingle = async (req, res) => {
  try {
    const { id } = req.body
    const user = await User.getSingleUser(id)
    if (user.timedIn) {
      logResponse(req, ERROR, { status: 'User is currently timed in!' })
      return ApiResponseModel(res, ERROR, 'User is currently timed in!')
    }
    //console.log(user.Id);
    if (user.branchLocation !== 'N/A') {
      await Branch.removeUserFromOldBranch(user.branchLocation, { Id: user._id })
    }
    
    const logPayload = {
      user: user.username,
      action: DELETEUSER,
      branchLocation: user.branchLocation,
      log: `${user.username} deleted the user ${user.username}`
    }
    await SystemLogs.addLog(logPayload);
    const result = await User.deleteSingleUser(id)
    logResponse(req, SUCCESS, { status: SUCCESS_MESS, data: result })
    ApiResponseModel(res, SUCCESS, SUCCESS_MESS, result)
  } catch (error) {
    logResponse(req, ERROR, { status: error.message })
    ApiResponseModel(res, ERROR, error.message)
  }
}

export const changePassword = async (req, res) => {
  try {
    const { id } = req.params
    const { newPassword, oldPassword } = req.body
    
    const updatedUser = await User.changePassword(id, newPassword, oldPassword)
    const logPayload = {
      user: updatedUser.username,
      action: PASSWORDEDIT,
      branchLocation: updatedUser.branchLocation,
      log: `${updatedUser.username} changed their password`
    }
    await SystemLogs.addLog(logPayload)
    logResponse(req, SUCCESS, { status: SUCCESS_MESS })
    ApiResponseModel(res, SUCCESS, SUCCESS_MESS)
  } catch (error) {
    logResponse(req, ERROR, { status: error.message })
    ApiResponseModel(res, ERROR, error.message)
  }
}

export const fetchActiveUsers = async (req, res) => {
  try {
    const users = await User.getActiveUsers();
    logResponse(req, SUCCESS, { status: SUCCESS_MESS, data: users});
    ApiResponseModel(res, SUCCESS, SUCCESS_MESS, users);
  } catch (error) {
    logResponse(req, ERROR, { status: error.message })
    ApiResponseModel(res, ERROR, error.message)
  }
}
