"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testing = exports.profile = exports.signin = exports.signup = void 0;
const tslib_1 = require("tslib");
const jsonwebtoken_1 = (0, tslib_1.__importDefault)(require("jsonwebtoken"));
const userSchema_1 = (0, tslib_1.__importDefault)(require("../models/userSchema"));
//metodo signup para el registro
const signup = async (req, res) => {
    const newUser = new userSchema_1.default({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });
    //encriptando password
    newUser.password = await newUser.encryptPassword(newUser.password);
    //guardando usuario en la base de datos
    try {
        //guardando nuevo usuario
        const savedUser = await newUser.save();
        // asignando token
        const token = jsonwebtoken_1.default.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET || "mysecret", { expiresIn: 60 * 60 * 24 });
        //ocultando password de la respuesta usuario
        const user = await userSchema_1.default.findById(savedUser._id, { password: 0 });
        //enviando respuesta
        res.send({
            success: true,
            token: token,
            expiresIn: 60 * 60 * 24,
            user: user,
        });
    }
    catch (error) {
        // el codigo 11000 menciona que existe un campo repetido
        if (error.code === 11000) {
            res
                .status(400)
                .send({ success: false, message: "El email ya esta en uso" });
            return;
        }
        // para cualquier otro error
        res.status(400).send({ success: false, message: error });
    }
};
exports.signup = signup;
//metodo signin para el login
const signin = async (req, res) => {
    //al especificar password: 0 es para que no lo muestre
    const foundUser = await userSchema_1.default.findOne({ email: req.body.email });
    if (!foundUser) {
        console.log("El email no existe");
        return res
            .status(400)
            .send({ success: false, message: "El email no existe" });
    }
    const correctPassword = await foundUser.validatePassword(req.body.password);
    if (!correctPassword) {
        console.log("La contraseña es incorrecta");
        return res
            .status(400)
            .send({ success: false, message: "La contraseña es incorrecta" });
    }
    const user = await userSchema_1.default.findById(foundUser._id, { password: 0 });
    const token = jsonwebtoken_1.default.sign({ _id: foundUser._id }, process.env.TOKEN_SECRET || "mysecret", { expiresIn: 60 * 60 * 24 });
    res.send({
        success: true,
        token: token,
        expiresIn: 60 * 60 * 24,
        user: user,
    });
};
exports.signin = signin;
// metodo profile para ver los datos del usuario
const profile = async (req, res) => {
    const user = await userSchema_1.default.findById(req.userId, { password: 0 });
    if (!user) {
        return res
            .status(400)
            .send({ success: false, message: "El usuario no existe" });
    }
    res.send({
        success: true,
        user: user,
    });
};
exports.profile = profile;
//metodo testing para probar el token
const testing = async (req, res) => {
    res.send({
        success: true,
        message: "Token valido",
    });
};
exports.testing = testing;
