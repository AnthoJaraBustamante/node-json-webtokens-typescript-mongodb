import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../interfaces/IUser";
import User from "../models/userSchema";

//metodo signup para el registro
export const signup = async (req: Request, res: Response) => {
  const newUser: IUser = new User({
    fullname: req.body.fullname,
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
    const token: string = jwt.sign(
      { _id: savedUser._id },
      process.env.TOKEN_SECRET || "mysecret",
      { expiresIn: 60 * 60 * 24 }
    );
    //ocultando password de la respuesta usuario
    const user = await User.findById(savedUser._id, { password: 0 });
    //enviando respuesta
    res.send({
      success: true,
      token: token,
      expiresIn: 60 * 60 * 24,
      user: user,
    });
  } catch (error: any) {
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

//metodo signin para el login
export const signin = async (req: Request, res: Response) => {
  //al especificar password: 0 es para que no lo muestre
  const foundUser = await User.findOne({ email: req.body.email });

  if (!foundUser) {
    console.log("El email no existe");
    return res
      .status(400)
      .send({ success: false, message: "El email no existe" });
  }
  const correctPassword: boolean = await foundUser.validatePassword(
    req.body.password
  );
  if (!correctPassword) {
    console.log("La contraseña es incorrecta");
    return res
      .status(400)
      .send({ success: false, message: "La contraseña es incorrecta" });
  }
  const user = await User.findById(foundUser._id, { password: 0 });

  const token: string = jwt.sign(
    { _id: foundUser._id },
    process.env.TOKEN_SECRET || "mysecret",
    { expiresIn: 60 * 60 * 24 }
  );
  res.send({
    success: true,
    token: token, 
    expiresIn: 60 * 60 * 24,
    user: user,
  });
};

// metodo profile para ver los datos del usuario
export const profile = async (req: Request, res: Response) => {
  const user = await User.findById(req.userId, { password: 0 });
  if (!user) {
    return res
      .status(400)
      .send({ success: false, message: "El usuario no existe" });
  }
  console.log(req);
  res.send({ 
    success: true,
    user: user,
    req: req.userId,  
  });
};

//metodo testing para probar el token
export const testing = async (req: Request, res: Response) => {
  console.log(req);
  res.send({  
    success: true,
    message: "Token válido",
   
  });
};  
  