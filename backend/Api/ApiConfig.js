

const apiEndpoint = '/vaporyapos/';

const ApiConfig = Object.freeze({
    //========authentication======== 
    getUser: apiEndpoint + 'getUser',
    loginUsers: apiEndpoint + 'login',
    logoutUsers: apiEndpoint + 'logout',
    registerUsers : apiEndpoint + 'register',
    updateUsers: apiEndpoint + 'updateUser',
    addUser: apiEndpoint + 'addUser',
    fetchUsers: apiEndpoint + 'getUsers/:branch',
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
    REMOVEUSERFROMBRANCH: apiEndpoint + 'removeUserBranch/:location',
    REMOVEADMINFROMBRANCH: apiEndpoint + 'removeAdminFromBranch/:location',
    DELETEBRANCH: apiEndpoint + 'deleteBranch/:location',
    //=================================

    //timein
    TIMEIN: apiEndpoint + 'timein',
    TIMEOUT: apiEndpoint + 'timeout',
    GETDATATIME: apiEndpoint + 'getTimeData/:userId',
    GETALLTIMEDATA: apiEndpoint + 'getAllTimeData',

    //SALES
    NEWSALE: apiEndpoint + 'procOrder',
    GETSALES: apiEndpoint + 'getSales/:branch',
    GETSINGLERECORD: apiEndpoint + 'getSingleRecordSale/:id',

    //VIP
    ADDVIP: apiEndpoint + 'addVip',
    GETALLVIP: apiEndpoint + 'getVipList',
    DELETEVIP: apiEndpoint + 'deleteVip/:id',
    DELETEMANYVIP: apiEndpoint + 'deleteManyVip',
    DISABLEMANYVIP: apiEndpoint + 'disableManyVip',
    DEACTIVATEVIP: apiEndpoint + 'deactivateVip/:id',
    USEVIPCARD: apiEndpoint + 'useVip/:id',
    UPDATEVIP: apiEndpoint + 'updateVip/:id',

    //DASHBOARD
    GETMONTHLYSALES: apiEndpoint + 'monthlySales/:branch',
    GETTODAYSALES: apiEndpoint + 'todaysSales/:branch',
    GETNETPROFIT: apiEndpoint + 'netProfit/:branch',
    GETTOPPRODUCTS: apiEndpoint + 'getTopProducts/:branch',
    GETTODAYSREVENUE: apiEndpoint + 'todayRevenue/:branch',

    //CATEGORY
    CREATECATEGORY: apiEndpoint + 'createCategory',
    GETCATEGORIES: apiEndpoint + 'getCategories',
    DELETECATEGORY: apiEndpoint + 'deleteCategory/:id'
})

export default ApiConfig;