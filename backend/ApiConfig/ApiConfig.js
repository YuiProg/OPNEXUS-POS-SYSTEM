const apiEndpoint = '/vaporyapos/';

const ApiConfig = {
    //========authentication======== 
    getUser: apiEndpoint + 'getUser',
    loginUsers: apiEndpoint + 'login',
    logoutUsers: apiEndpoint + 'logout',
    registerUsers : apiEndpoint + 'register'
    //==============================
}

export default ApiConfig;