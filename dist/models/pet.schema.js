"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reqString = { type: String, required: true };
const petSchema = new mongoose_1.Schema({
    name: reqString,
    age: {
        type: Number,
        required: true,
    },
    genre: reqString,
    size: reqString,
    birthdate: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    avatar: {
        type: String,
        default: "https://i.pravatar.cc/300?u=a042581f4e29026704d",
    },
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("Pet", petSchema);
