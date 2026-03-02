const Strings = {
    //server error remember to put the error message when development
    SERVER_ERROR: 'Server error.', 
    CRED_ERROR: 'Invalid username or password.',
    //error messages
    loginFail: 'Failed to login user.',
    registerFail: 'Failed to register user.',
    NAME_EXIST: 'A user already has this username',
    PASS_REQ: 'Password is required.',
    ROLE_REQ: 'User role is required',
    BRANCH_REQ: 'Branch location is required.',
    INVALID_ID: 'Id is not valid.', 
    USER_NOT_EXIST: 'User does not exist.',
    USER_LOGOUT: 'User logged out.',

    //products fail
    FAILED_ADD: 'Failed to add product.',
    INVALID_PRODUCT_CODE: 'Invalid product code.',
    PRODUCT_QUANTITY: 'Please provide a quantity for product.',
    SUCCESS_ADD: 'Product added successfully.',
    
    SUCCESS_MESS: 'Success',
    ERROR_MESS: 'Error',
    UNAUTHORIZED_MESS: 'Unauthorized',

    //cred
    pw: 'password',
    nm: 'name',
    rl: 'role',
    br: 'branch',
    us: 'User',

    //status code
    SUCCESS: 200,
    ERROR: 500,
    CREATED: 201,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401
}

export default Strings;