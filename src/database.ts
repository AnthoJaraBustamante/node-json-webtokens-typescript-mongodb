import mongoose from "mongoose";

mongoose
  .connect(process.env.DATABASE || "mongodb://localhost/test")
  .then((db) => console.log("db is connected"))
  .catch((err) => console.log(err));
