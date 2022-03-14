"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reqString = { type: String, required: true };
const photoSchema = new mongoose_1.Schema({
    title: reqString,
    description: reqString,
    imageURL: reqString,
    public_id: reqString,
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("Photo", photoSchema);
