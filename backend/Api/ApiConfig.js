const apiEndpoint = '/vaporyapos/';

const ApiConfig = Object.freeze({
    //========authentication======== 
    getUser: apiEndpoint + 'getUser',
    loginUsers: apiEndpoint + 'login',
    logoutUsers: apiEndpoint + 'logout',
    registerUsers : apiEndpoint + 'register',
    //==============================

    //=========add product==========
    addProduct: apiEndpoint + 'addProduct'
})

export default ApiConfig;