import { Request, Response } from "express";
import Pet from "../models/petSchema";

export const getPets = async (req: Request, res: Response) => {
  try {
    const pets = await Pet.find({ owner: req.userId });
    res.status(200).send({
      success: true,
      pets: pets,
    });
  } catch (err: any) {
    console.log(err);
    res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};
export const getPetsByName = async (req: Request, res: Response) => {
  try {
    const pet = await Pet.find({ name: req.params.name });
    res.status(200).send({
      success: true,
      pet: pet,
    });
  } catch (err: any) {
    console.log(err);
    res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};
export const deletePetById = async (req: Request, res: Response) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      pet: pet,
    });
  } catch (err: any) {
    console.log(err);
    res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};
export const upload = async (req: any, res: Response) => {
  if (!req.files) { 
    res.status(400).send({
      success: false,
      message: "No se especificó un archivo",
    });

    try {
      const file = req.files.image;
      res.json({
        success: false,
        message: "Se subió",
        file: file,
      });
    } catch (error) {
      res.status(400).send({
        success: false, 
        message: "No se pudo subir el archivo",
      });
    }
  }
};
