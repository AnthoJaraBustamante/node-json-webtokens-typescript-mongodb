"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addExtraInfo = void 0;
const tslib_1 = require("tslib");
const pet_schema_1 = (0, tslib_1.__importDefault)(require("../models/pet.schema"));
const user_schema_1 = (0, tslib_1.__importDefault)(require("../models/user.schema"));
const addExtraInfo = async (req, res) => {
    try {
        const userById = await user_schema_1.default.findById(req.userId, { password: 0 });
        if (!userById) {
            return res
                .status(400)
                .send({ success: false, message: "El usuario no existe" });
        }
        const savedPets = [];
        for (const key in req.body.pet) {
            if (Object.prototype.hasOwnProperty.call(req.body.pet, key)) {
                const element = req.body.pet[key];
                const pet = new pet_schema_1.default({
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
        const user = await user_schema_1.default.findByIdAndUpdate(req.userId, {
            avatar: req.body.avatar,
            address: req.body.address,
            phone: req.body.phone,
            role: req.body.role,
            $push: { pet: savedPets },
        });
        const updated = await user_schema_1.default.findById(req.userId, { password: 0 });
        res.status(200).send({
            success: true,
            message: "Extra info added successfully",
            user: updated,
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
exports.addExtraInfo = addExtraInfo;
