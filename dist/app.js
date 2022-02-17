"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const morgan_1 = (0, tslib_1.__importDefault)(require("morgan"));
const router_1 = (0, tslib_1.__importDefault)(require("./routes/router"));
const app = (0, express_1.default)();
//settings
app.set('port', process.env.PORT || 3000);
//middelwares
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
//routes
app.use('/api/v1/auth/', router_1.default);
exports.default = app;
