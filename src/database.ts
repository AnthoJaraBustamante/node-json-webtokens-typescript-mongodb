import mongoose from "mongoose";

mongoose
  .connect(process.env.DATABASE as string)
  .then((db) => console.log("db is connected"))
  .catch((err) => console.log("DATA BASE ERROR"));
