import cloudinary from "cloudinary";
import { Router } from "express";
import fs from "fs";
import Photo from "../models/photo.schema";

const frontrouter: Router = Router();

cloudinary.v2.config({
  cloud_name: "dcg2blsca",
  api_key: "383181357241618",
  api_secret: "JTZx6Be6BBepsN0n8CTGq8F4x1I",
});
// index handlebars
frontrouter.get("/add", (req, res) => {
  res.render("upload");
});

frontrouter.post("/add", async (req, res) => {
  const { title, description } = req.body;
  if (!req.file) {
    return res
      .status(400)
      .send({ success: false, message: "No se ha subido ninguna imagen" });
  }
  const result = await cloudinary.v2.uploader.upload(req.file!.path);
  const newPhoto = new Photo({
    title,
    description,
    imageURL: result.url,
    public_id: result.public_id,
  });
  const uploadedPhoto = await newPhoto.save();
    fs.unlinkSync(req.file!.path); 
  res.send({
    success: true,
    message: "Imagen subida correctamente", 
    photo: uploadedPhoto,
  });
});
export default frontrouter;
 