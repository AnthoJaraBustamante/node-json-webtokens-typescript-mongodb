"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenValidation = void 0;
const tslib_1 = require("tslib");
const jsonwebtoken_1 = (0, tslib_1.__importDefault)(require("jsonwebtoken"));
const TokenValidation = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ success: false, message: 'No se espeficificó un token' });
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET || "mysecret");
        req.userId = payload._id;
        next(); // si todo esta bien, continua con el siguiente middleware
    }
    catch (err) {
        return res.status(400).send({ success: false, message: 'Token inválido' });
    }
};
exports.TokenValidation = TokenValidation;
