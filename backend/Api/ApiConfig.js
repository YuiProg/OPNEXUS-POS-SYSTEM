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
    //==============================

    //=========add product==========
    addProduct: apiEndpoint + 'addProduct',
    fetchProduct: apiEndpoint + 'fetchProducts',
    //==============================

    //branch cards
    setBranchActive: apiEndpoint + 'setBranchActive',
    getBranches: apiEndpoint + 'getBranch',
    addBranch: apiEndpoint + 'addBranch'
})

export default ApiConfig;