
import express, { Application } from 'express';
import morgan from 'morgan';
import authRoutes from "./routes/router";

const app: Application = express();
//settings
app.set('port', process.env.PORT || 3000);
//middelwares
app.use(morgan('dev'));
app.use(express.json());
//routes
app.get("/", (req, res) => {
    res.json({
        message: "Hello World"
    });
});
app.use('/api/v1/auth/', authRoutes);
export default app;
 