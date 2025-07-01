import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
    console.log(req.headers.authorization);
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Access denied' });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded);
        req.user = decoded;
        next();
    }catch (error) {
        return res.status(400).json({ error: 'Invalid token' });
    }

}
