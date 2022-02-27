import express, { Application } from "express";
import fileUpload from "express-fileupload";
import { engine } from 'express-handlebars';
import morgan from "morgan";
import authRoutes from "./routes/router";


const app: Application = express();
//settings
app.set("port", process.env.PORT || 3000);
app.set("views", __dirname + "/views");
app.set(".hbs", engine({
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
    extname: ".hbs"
}));
app.set("view engine", ".hbs");


//middelwares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(fileUpload());

//routes
app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});
app.use("/api/v1/auth/", authRoutes);
export default app;
