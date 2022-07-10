import { IUser } from "./User";

export interface IComment {
  comment_id: string;
  author: IUser;
  description: string;
}