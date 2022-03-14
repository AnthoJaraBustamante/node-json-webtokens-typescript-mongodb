import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IPayload } from '../interfaces/payload.interface';

export const TokenValidation = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ success: false, message: 'No se espeficificó un token' });
    }
    try {
        const payload = jwt.verify(token, process.env.TOKEN_SECRET || "mysecret") as IPayload;
        req.userId = payload._id;
    
        next(); // si todo esta bien, continua con el siguiente middleware
    } catch (err) { 
        return res.status(400).send({ success: false, message: 'Token inválido' });
    } 
}  