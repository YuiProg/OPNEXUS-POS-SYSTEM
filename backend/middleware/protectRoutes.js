import jwt from 'jsonwebtoken';
import Strings from '../strings/strings-codes.js';
import ApiResponseModel from '../models/ApiResponseModel.js';

const {
    FORBIDDEN,
    FORBIDDEN_MESS,
    ERROR_MESS
} = Strings;

const protectRoutes = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return ApiResponseModel(res, FORBIDDEN, FORBIDDEN_MESS);
    }
    const user = jwt.verify(token, process.env.JWT_SECRET);

    if (!user) {
        return ApiResponseModel(res, FORBIDDEN, FORBIDDEN_MESS);
    }
    
    req.user = user;
    next();
}

export default protectRoutes;