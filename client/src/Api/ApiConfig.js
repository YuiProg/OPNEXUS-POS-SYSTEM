const apiEndpoint = '/vaporyapos/';

const ApiConfig = Object.freeze({
    //========authentication======== 
    getUser: apiEndpoint + 'getUser',
    loginUsers: apiEndpoint + 'login',
    logoutUsers: apiEndpoint + 'logout',
    registerUsers : apiEndpoint + 'register',
    updateUsers: apiEndpoint + 'updateUser',
    addUser: apiEndpoint + 'addUser',
    fetchUsers: apiEndpoint + 'getUsers',
    deleteMultipleUsers: apiEndpoint + 'userDeleteMultiple',
    deleteSingleUser: apiEndpoint + 'deleteSingleUser',
    GET_SINGLE_USER: apiEndpoint + 'getSingleUser/:id',
    GET_USERS_BY_ID: apiEndpoint + 'getUsersById',
    UPDATE_USER: apiEndpoint + 'updateUser/:id',
    //==============================

    //=========add product==========
    addProduct: apiEndpoint + 'addProduct',
    fetchProduct: apiEndpoint + 'fetchProducts',
    deleteMultipleProduct: apiEndpoint + 'deleteMultipleProducts',
    deleteSingleProduct: apiEndpoint + 'deleteSingleProduct',
    fetchSingleProduct: apiEndpoint + 'fetchSingleProduct/:id',
    UPDATEPRODUCT: apiEndpoint + 'updateProduct/:id',
    //==============================

    //branch cards
    SETBRANCHACTIVE: apiEndpoint + 'setBranchActive/:location',
    SETBRANCHOFFLINE: apiEndpoint + 'setBranchOffline/:location',
    GETBRANCHES: apiEndpoint + 'getBranch',
    ADDBRANCH: apiEndpoint + 'addBranch',
    UPDATEBRANCH: apiEndpoint + 'updateBranch/:location',
    GETBRANCHBYLOCATION: apiEndpoint + 'branchLocation/:location',

    //timein
    TIMEIN: apiEndpoint + 'timein',
    TIMEOUT: apiEndpoint + 'timeout',
    GETDATATIME: apiEndpoint + 'getTimeData',
    GETALLTIMEDATA: apiEndpoint + 'getAllTimeData'
})

export default ApiConfig;