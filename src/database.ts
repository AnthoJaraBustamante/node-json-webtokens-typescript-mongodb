import mongoose from "mongoose";

mongoose
  .connect(process.env.DATABASE as string || "mongodb://localhost:27017/test",  )
  .then((db) => console.log("db is connected"))
  .catch((err) => console.log( process.env.DATABASE)); 
  