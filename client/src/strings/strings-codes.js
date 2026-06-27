const Strings = Object.freeze({
    ID_SECRET: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
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
    SHIFT_ERR: 'Shift is required!',
    USER_C_P: 'Password changed.',

    //auth errors
    SALARY_ERR: 'PALDOOOOOOOO',
    FNAME_ERR: 'First name is required.',
    LNAME_ERR: 'Last name is required.',
    PNUM_ERR: 'Phone number is required.',
    ADDR_ERR: 'Address is required.',
    GEND_ERR: 'Gender is required.',
    EMAIL_ERR: 'Email is required.',

    //time in / out
    TIME_IN_SUCC: 'Timed in successfully',
    TIME_IN_ERR: 'Failed to time in!',
    TIME_OUT_SUCC: 'Timed out successfully',
    TIME_OUT_ERR: 'Failed to time out',

    //products fail
    FAILED_ADD: 'Failed to add product.',
    INVALID_PRODUCT_CODE: 'Invalid product code.',
    PRODUCT_QUANTITY: 'Please provide a quantity for product.',
    SUCCESS_ADD: 'Product added successfully.',
    PRICE_ERR: 'Price is required!',
    CATEG_ERR: 'Category is required!',
    SUCCESS_MESS: 'Success',
    ERROR_MESS: 'Error',
    UNAUTHORIZED_MESS: 'Unauthorized',
    FORBIDDEN_MESS: 'Forbidden',
    NEW_PRODUCT: 'New product created,',
    NEW_BRANCH: 'New branch created.',
    GET_BRANCH: 'Branches found',
    GET_PRODUCT: 'Products found',
    DELETE_PRODUCT: 'Product(s) deleted.',
    DELETE_BRANCH: 'Branch deleted.',
    UPDATE_PRODUCT: 'Product updated.',
    UPDATE_BRANCH: 'Branch updated.',

    //SALES
    ORDER_PROC: 'Order Successfull',
    GETSALES: 'Sales fetched',

    //VIP
    VIPADD: 'Vip successfully registered!',
    VIPFAIL: 'Vip failed to register.',
    VIPFOUND: 'Vip Card Activated.',
    VIPUPDATED: 'Vip card updated',
    VIPREMOVED: 'Vip card removed',
    VIPSDISABLED: 'Disabled list of vips',

    //CATEGORY
    CATEGORYCREATED: 'New category created',
    DELETECATEGORY: 'Category removed',
    GETCATEGORIES: 'Categories found',

    //logs
    GETLOGS: 'Logs fetched',
    LOGCREATED: 'Log created',

    //ACTION METHODS
    CREATEPRODUCT: 'PRODUCT CREATION',
    DELETEPRODUCT: 'PRODUCT DELETION',
    EDITPRODUCT: 'EDIT PRODUCT',
    VIPCREATION: 'VIP REGISTRATION',
    VIPDELETION: 'VIP REMOVAL',
    VIPDEACTIVATE: 'VIP DEACTIVATION',
    VIPACTIVATE: 'VIPACTIVATION',
    STAFFCREATION: 'STAFF ADDITION',
    STAFFTERMINATION: 'STAFF TERMINATION',
    CREATEDBRANCH: 'BRANCH CREATION',
    DELETEBRANCH: 'BRANCH DELETION',
    EDITBRANCH: 'EDIT BRANCH',
    TIMEDIN: 'TIMED IN',
    TIMEDOUT: 'TIMED OUT',
    NEWUSER: 'USER CREATION',
    UPDATEUSER: 'USER UPDATE',
    DELETEUSER: 'USER DELETION',
    EDITUSER: 'EDIT USER',
    PASSWORDEDIT: 'PASSWORD CHANGE',

    //settings
    UPDATESETTINGS: 'Settings updated.',
    RESETSETTINGS: 'Settings reset to default.',
    SETTINGSERROR: 'Failed to update settings.',
    GETSETTINGS: 'Settings Loading',
    
    //credy
    usnm: 'username',
    pw: 'password',
    nm: 'name',
    rl: 'role',
    br: 'branch',
    us: 'User',
    em: 'Email',

    //function codes
    ACCLOCK: 'FNCCD1',
    FETCHLOCKEDACCOUNTNOBRANCH: 'FNCCD2',

    //status codes
    // 1xx Informational
    CONTINUE: 100,
    SWITCHING_PROTOCOLS: 101,
    PROCESSING: 102,
    // 2xx Successful
    SUCCESS: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NON_AUTHORITATIVE_INFORMATION: 203,
    NO_CONTENT: 204,
    RESET_CONTENT: 205,
    PARTIAL_CONTENT: 206,
    MULTI_STATUS: 207,
    ALREADY_REPORTED: 208,
    IM_USED: 226,
    // 3xx Redirection
    MULTIPLE_CHOICES: 300,
    MOVED_PERMANENTLY: 301,
    FOUND: 302,
    SEE_OTHER: 303,
    NOT_MODIFIED: 304,
    USE_PROXY: 305,
    TEMPORARY_REDIRECT: 307,
    PERMANENT_REDIRECT: 308,
    // 4xx Client Error
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    PAYMENT_REQUIRED: 402,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    NOT_ACCEPTABLE: 406,
    PROXY_AUTHENTICATION_REQUIRED: 407,
    REQUEST_TIMEOUT: 408,
    CONFLICT: 409,
    GONE: 410,
    LENGTH_REQUIRED: 411,
    PRECONDITION_FAILED: 412,
    PAYLOAD_TOO_LARGE: 413,
    URI_TOO_LONG: 414,
    UNSUPPORTED_MEDIA_TYPE: 415,
    RANGE_NOT_SATISFIABLE: 416,
    EXPECTATION_FAILED: 417,
    IM_A_TEAPOT: 418,
    MISDIRECTED_REQUEST: 421,
    UNPROCESSABLE_ENTITY: 422,
    LOCKED: 423,
    FAILED_DEPENDENCY: 424,
    TOO_EARLY: 425,
    UPGRADE_REQUIRED: 426,
    PRECONDITION_REQUIRED: 428,
    TOO_MANY_REQUESTS: 429,
    REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
    UNAVAILABLE_FOR_LEGAL_REASONS: 451,
    // 5xx Server Error
    ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
    HTTP_VERSION_NOT_SUPPORTED: 505,
    VARIANT_ALSO_NEGOTIATES: 506,
    INSUFFICIENT_STORAGE: 507,
    LOOP_DETECTED: 508,
    NOT_EXTENDED: 510,
    NETWORK_AUTHENTICATION_REQUIRED: 511,
    //ignore niyo to hahaha
    WTF: 999 
})

export default Strings;