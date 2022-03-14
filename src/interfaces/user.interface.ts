import { Document } from "mongoose";
import { IPet } from "./pet.interface";

export interface IUser extends Document {
  fullname: string;
  email: string;
  password: string;
  avatar: string;
  address: string;
  phone: string;
  role: string;
  createdAt: Date;
  pet: [IPet];
  encryptPassword: (password: string) => Promise<string>;
  validatePassword: (password: string) => Promise<boolean>;
}
 