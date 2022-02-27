"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const express_fileupload_1 = (0, tslib_1.__importDefault)(require("express-fileupload"));
const express_handlebars_1 = require("express-handlebars");
const morgan_1 = (0, tslib_1.__importDefault)(require("morgan"));
const router_1 = (0, tslib_1.__importDefault)(require("./routes/router"));
const app = (0, express_1.default)();
//settings
app.set("port", process.env.PORT || 3000);
app.set("views", __dirname + "/views");
app.set(".hbs", (0, express_handlebars_1.engine)({
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
    extname: ".hbs"
}));
app.set("view engine", ".hbs");
//middelwares
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, express_fileupload_1.default)());
//routes
app.get("/", (req, res) => {
    res.json({
        message: "Hello World",
    });
});
app.use("/api/v1/auth/", router_1.default);
exports.default = app;
