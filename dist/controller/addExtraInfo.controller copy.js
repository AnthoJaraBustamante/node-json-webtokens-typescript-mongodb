"use strict";
// import { Request, Response } from "express";
// import { IPet } from "../interfaces/IPet";
// import Pet from "../models/petSchema";
// import User from "../models/userSchema";
// export const addExtraInfo = async (req: Request, res: Response) => {
//   try {
//     const user = await User.findById(req.userId, { password: 0 });
//     if (!user) {
//       return res
//         .status(400)
//         .send({ success: false, message: "El usuario no existe" });
//     }
//     const pet: IPet[] = [];
//     for (const key in req.body.pet) {
//       if (Object.prototype.hasOwnProperty.call(req.body.pet, key)) {
//         const element = req.body.pet[key];
//         element.user = user;
//         const newPet = new Pet(element);
//         await newPet.save();
//         pet.push(newPet);
//       }
//     }
//     const extraInfo: IUserExtraInfo = new UserExtraInfo({
//       avatar: req.body.avatar,
//       address: req.body.address,
//       phone: req.body.phone,
//       role: req.body.role,
//       pets: pet,
//       user: user,
//       createdAt: new Date(),
//     });
//     await extraInfo.save();
//     const updated = await user?.save();
//     res.status(200).send({
//       success: true,
//       message: "Extra info added successfully",
//       extraInfo: updated,
//     });
//   } catch (err: any) {
//     console.log(err);
//     res.status(400).send({
//       success: false,
//       message: err.message,
//     });
//   }
// };
