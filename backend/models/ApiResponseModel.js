
const ApiResponseModel = (res, resStatus, status, data, oldModel) => {
    return res.status(resStatus).json({status, data, oldModel});
}

export default ApiResponseModel;