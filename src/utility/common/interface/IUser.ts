import { ObjectId } from "typeorm";

export interface IUser {
    id:  ObjectId
    name: string;
    username: string;
    password: string;
  }

  