import jwt from 'jsonwebtoken';

const expires = 3 * 24 * 60 * 60;

const generateToken = (userId, res) => {
    console.log(userId);
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: expires});
    
    res.cookie('jwt', token, {
        maxAge: expires * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development"
    });

    return token;
}

export default generateToken;