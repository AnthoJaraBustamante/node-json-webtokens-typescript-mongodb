import { model, Schema } from "mongoose";
import { IPet } from "../interfaces/IPet";
const reqString = { type: String, required: true };
const petSchema = new Schema(
  {
    name: reqString,
    age: {
      type: Number,
      required: true,
    },
    genre: reqString,
    size: reqString,
    birthdate: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
      default: "https://i.pravatar.cc/300?u=a042581f4e29026704d",
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default model<IPet>("Pet", petSchema);
