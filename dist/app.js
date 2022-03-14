"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const morgan_1 = (0, tslib_1.__importDefault)(require("morgan"));
const multer_1 = (0, tslib_1.__importDefault)(require("multer"));
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const front_1 = (0, tslib_1.__importDefault)(require("./routes/front"));
const router_1 = (0, tslib_1.__importDefault)(require("./routes/router"));
const app = (0, express_1.default)();
//settings
app.set("port", process.env.PORT || 3000);
//estableciendo motor de plantillas ejs
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//middelwares
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
//configurando multer 
const storage = multer_1.default.diskStorage({
    destination: path_1.default.join(__dirname, "public/uploads"),
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + path_1.default.extname(file.originalname));
    },
});
app.use((0, multer_1.default)({ storage }).single('image'));
// static files
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use("/api/v1/auth/", router_1.default);
app.use("/images/", front_1.default);
exports.default = app;
