
const ApiResponseModel = (res, resStatus, status, data) => {
    return res.status(resStatus).json({status, data});
}

export default ApiResponseModel;