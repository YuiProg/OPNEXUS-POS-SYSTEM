import jwt from 'jsonwebtoken';
import Strings from '../strings/strings-codes.js';

const {
    UNAUTHORIZED,
    UNAUTHORIZED_MESS,
    ERROR_MESS
} = Strings;

const protectRoutes = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(UNAUTHORIZED).json({status: ERROR_MESS, message: UNAUTHORIZED_MESS});
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (!user) {
        return res.status(UNAUTHORIZED).json({status: ERROR_MESS, message: UNAUTHORIZED_MESS});
    }
    
    req.user = user;
    next();
}

export default protectRoutes;