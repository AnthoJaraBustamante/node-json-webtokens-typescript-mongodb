import dotenv from 'dotenv';
import app from "./app";
import './database';




const PORT = app.get('port');


//Crear funcion main
function main() { 
    dotenv.config()
    // console.log(process.env.TESTING);

    app.listen(PORT)
    console.log(`Server running on port ${PORT}`);
}

main();   