import jwt from 'jsonwebtoken';

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_KEY, (err, decoded) => { // callback
        if (err) {
            return false;
        }
        else {
            return decoded;
        }
    });
};

export default verifyToken;