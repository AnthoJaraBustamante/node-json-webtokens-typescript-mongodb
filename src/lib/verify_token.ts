import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IPayload } from '../interfaces/IPayload';

export const TokenValidation = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ success: false, message: 'No token provided' });
    }
    try {
        const payload = jwt.verify(token, process.env.TOKEN_SECRET || "mysecret") as IPayload;
        req.userId = payload._id;
        next(); // si todo esta bien, continua con el siguiente middleware
    } catch (err) { 
        return res.status(400).send({ success: false, message: 'Token invalid' });
    }
} 