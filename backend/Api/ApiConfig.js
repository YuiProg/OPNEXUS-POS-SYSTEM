

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
    addBranch: apiEndpoint + 'addBranch'
})

export default ApiConfig;