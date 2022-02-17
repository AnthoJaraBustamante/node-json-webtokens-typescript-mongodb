"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const bcryptjs_1 = (0, tslib_1.__importDefault)(require("bcryptjs"));
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    }
});
userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcryptjs_1.default.genSalt(10);
    return bcryptjs_1.default.hash(password, salt);
};
userSchema.methods.validatePassword = async function (password) {
    return await bcryptjs_1.default.compare(password, this.password);
};
exports.default = (0, mongoose_1.model)('User', userSchema);
