import { Document } from "mongoose";
import { IUser } from "./user.interface";

export interface IPet extends Document {
  name: string;
  age: number;
  genre: string;
  size: string;
  birthdate: Date;
  description: string;
  avatar: string;
  createdAt: Date;
  owner: IUser;
}
