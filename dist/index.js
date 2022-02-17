"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const dotenv_1 = (0, tslib_1.__importDefault)(require("dotenv"));
const app_1 = (0, tslib_1.__importDefault)(require("./app"));
require("./database");
const PORT = app_1.default.get('port');
//Crear funcion main
function main() {
    dotenv_1.default.config();
    // console.log(process.env.TESTING);
    app_1.default.listen(PORT);
    console.log(`Server running on port ${PORT}`);
}
main();
