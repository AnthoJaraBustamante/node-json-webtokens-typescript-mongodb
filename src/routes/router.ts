import { Router } from "express";
import {
  profile,
  signin,
  signup,
  testing
} from "../controller/auth.controller";
import { addExtraInfo } from "../controller/extra_info.controller";
import {
  deletePetById,
  getPets,
  getPetsByName
} from "../controller/pets_crud.controller";
import { TokenValidation } from "../lib/verify_token";

const router: Router = Router();


//auth routes
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/profile", TokenValidation, profile);
router.get("/testing", TokenValidation, testing);
//add user extra info
router.post("/addExtraInfo", TokenValidation, addExtraInfo);

//get user pets
router.get("/getPets", TokenValidation, getPets);
//get pets by name
router.get("/getPetsByName/:name", TokenValidation, getPetsByName);
//delete pet by id
router.delete("/deletePetById/:id", TokenValidation, deletePetById);
// Servicio para subir archivos

// Crear servicio para recibir imagenes
router.get("/getImage/:image", (req, res) => {
  const image = req.params.image;
  res.sendFile(`${__dirname}/../uploads/${image}`);
});

export default router;
