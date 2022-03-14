import { model, Schema } from "mongoose";
import { IPhoto } from "../interfaces/photo.interface";
const reqString = { type: String, required: true };
const photoSchema = new Schema(
  {
    title: reqString,
    description: reqString,
    imageURL: reqString,
    public_id: reqString,
  },
  {
    timestamps: true,
  }
);

export default model<IPhoto>("Photo", photoSchema);
