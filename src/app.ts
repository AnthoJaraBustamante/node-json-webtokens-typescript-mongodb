import express, { Application } from "express";
import morgan from "morgan";
import multer from "multer";
import path from "path";
import frontrouter from "./routes/front";
import authRoutes from "./routes/router";
 

const app: Application = express();
//settings
app.set("port", process.env.PORT || 3000);

//estableciendo motor de plantillas ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//middelwares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
//configurando multer 
const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/uploads"),
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  }, 
});

app.use(multer({ storage }).single('image'));
// static files
app.use(express.static(path.join(__dirname, 'public')));
 

  
app.use("/api/v1/auth/", authRoutes);
app.use("/images/", frontrouter);
export default app;
   