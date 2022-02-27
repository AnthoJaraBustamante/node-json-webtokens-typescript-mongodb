import dotenv from 'dotenv';
import app from "./app";
import './database';
const PORT =  process.env.PORT || 3000;
//Crear funcion main
function main() { 
    dotenv.config()
    // console.log(process.env.TESTING);
    app.listen(PORT)
    console.log(`Server running on port ${PORT}`);
}
main();   