"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controller/auth.controller");
const extra_info_controller_1 = require("../controller/extra_info.controller");
const pets_crud_controller_1 = require("../controller/pets_crud.controller");
const verify_token_1 = require("../lib/verify_token");
const router = (0, express_1.Router)();
//auth routes
router.post("/signup", auth_controller_1.signup);
router.post("/signin", auth_controller_1.signin);
router.get("/profile", verify_token_1.TokenValidation, auth_controller_1.profile);
router.get("/testing", verify_token_1.TokenValidation, auth_controller_1.testing);
//add user extra info
router.post("/addExtraInfo", verify_token_1.TokenValidation, extra_info_controller_1.addExtraInfo);
//get user pets
router.get("/getPets", verify_token_1.TokenValidation, pets_crud_controller_1.getPets);
//get pets by name
router.get("/getPetsByName/:name", verify_token_1.TokenValidation, pets_crud_controller_1.getPetsByName);
//delete pet by id
router.delete("/deletePetById/:id", verify_token_1.TokenValidation, pets_crud_controller_1.deletePetById);
// Servicio para subir archivos
router.post("/upload", verify_token_1.TokenValidation, pets_crud_controller_1.upload);
exports.default = router;
