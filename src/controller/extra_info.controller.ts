import { Request, Response } from "express";
import { IPet } from "../interfaces/IPet";
import Pet from "../models/petSchema";
import User from "../models/userSchema";

export const addExtraInfo = async (req: Request, res: Response) => {
  try {
    const userById = await User.findById(req.userId, { password: 0 });
    if (!userById) {
      return res
        .status(400)
        .send({ success: false, message: "El usuario no existe" });
    }

    const savedPets: IPet[] = [];
    for (const key in req.body.pet) {
      if (Object.prototype.hasOwnProperty.call(req.body.pet, key)) {
        const element = req.body.pet[key];
        const pet: IPet = new Pet({
          name: element.name,
          age: element.age,
          genre: element.genre,
          size: element.size,
          birthdate: element.birthdate,
          description: element.description,
          avatar: element.avatar,
          owner: userById.id,
        });
        const savedPet = await pet.save();
        savedPets.push(pet);
        console.log(savedPets);
      }
    }

    const user = await User.findByIdAndUpdate(req.userId, {
      avatar: req.body.avatar,
      address: req.body.address,
      phone: req.body.phone,
      role: req.body.role,
      $push: { pet: savedPets },
    });
    const updated = await User.findById(req.userId, { password: 0 });

    res.status(200).send({
      success: true,
      message: "Extra info added successfully",
      user: updated,
    });
  } catch (err: any) {
    console.log(err);
    res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};
