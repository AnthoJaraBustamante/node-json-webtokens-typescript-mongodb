"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cloudinary_1 = (0, tslib_1.__importDefault)(require("cloudinary"));
const express_1 = require("express");
const fs_1 = (0, tslib_1.__importDefault)(require("fs"));
const photo_schema_1 = (0, tslib_1.__importDefault)(require("../models/photo.schema"));
const frontrouter = (0, express_1.Router)();
cloudinary_1.default.v2.config({
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
    const result = await cloudinary_1.default.v2.uploader.upload(req.file.path);
    const newPhoto = new photo_schema_1.default({
        title,
        description,
        imageURL: result.url,
        public_id: result.public_id,
    });
    const uploadedPhoto = await newPhoto.save();
    fs_1.default.unlinkSync(req.file.path);
    res.send({
        success: true,
        message: "Imagen subida correctamente",
        photo: uploadedPhoto,
    });
});
exports.default = frontrouter;
