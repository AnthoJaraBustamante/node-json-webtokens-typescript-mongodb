"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userExtraInfoSchema = new mongoose_1.Schema({
    avatar: {
        type: String,
        default: "https://i.pravatar.cc/300?u=a042581f4e29026704d",
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    pet: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Pet",
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
});
exports.default = (0, mongoose_1.model)("UserExtraInfo", userExtraInfoSchema);
