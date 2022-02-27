"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.deletePetById = exports.getPetsByName = exports.getPets = void 0;
const tslib_1 = require("tslib");
const petSchema_1 = (0, tslib_1.__importDefault)(require("../models/petSchema"));
const getPets = async (req, res) => {
    try {
        const pets = await petSchema_1.default.find({ owner: req.userId });
        res.status(200).send({
            success: true,
            pets: pets,
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).send({
            success: false,
            message: err.message,
        });
    }
};
exports.getPets = getPets;
const getPetsByName = async (req, res) => {
    try {
        const pet = await petSchema_1.default.find({ name: req.params.name });
        res.status(200).send({
            success: true,
            pet: pet,
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).send({
            success: false,
            message: err.message,
        });
    }
};
exports.getPetsByName = getPetsByName;
const deletePetById = async (req, res) => {
    try {
        const pet = await petSchema_1.default.findByIdAndDelete(req.params.id);
        res.status(200).send({
            success: true,
            pet: pet,
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).send({
            success: false,
            message: err.message,
        });
    }
};
exports.deletePetById = deletePetById;
const upload = async (req, res) => {
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
        }
        catch (error) {
            res.status(400).send({
                success: false,
                message: "No se pudo subir el archivo",
            });
        }
    }
};
exports.upload = upload;
