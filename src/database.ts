import mongoose from "mongoose";

mongoose
  .connect(process.env.DATABASE || "mongodb+srv://ajarabustamante:Dned22dj@cluster0.mmyqi.mongodb.net/test")
  .then((db) => console.log("db is connected"))
  .catch((err) => console.log("DATA BASE ERROR"));
