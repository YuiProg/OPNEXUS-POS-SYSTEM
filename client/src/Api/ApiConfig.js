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
    setBranchActive: apiEndpoint + 'setBranchActive',
    getBranches: apiEndpoint + 'getBranch',
    addBranch: apiEndpoint + 'addBranch',

    //timein
    TIMEIN: apiEndpoint + 'timein',
    TIMEOUT: apiEndpoint + 'timeout',
    GETDATATIME: apiEndpoint + 'getTimeData',
})

export default ApiConfig;