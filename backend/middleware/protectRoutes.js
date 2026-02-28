import jwt from 'jsonwebtoken';

const protectRoutes = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({status: 'error', message: 'Unauthorized'});
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (!user) {
        return res.status(401).json({status: 'error', message: 'Unauthorized'});
    }

    req.user = user;
    next();
}

export default protectRoutes;