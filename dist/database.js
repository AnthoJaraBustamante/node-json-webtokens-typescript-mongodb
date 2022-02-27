"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = (0, tslib_1.__importDefault)(require("mongoose"));
mongoose_1.default
    .connect(process.env.DATABASE || "mongodb://localhost:27017/test")
    .then((db) => console.log("db is connected"))
    .catch((err) => console.log(process.env.DATABASE));
