import mongoose from "mongoose";

mongoose
  .connect(process.env.TOKEN_SECRET || "mongodb://localhost/test")
  .then((db) => console.log("db is connected"))
  .catch((err) => console.log(err));
