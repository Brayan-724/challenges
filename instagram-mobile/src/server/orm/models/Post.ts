import { IComment } from "./Comment";
import { IPhoto } from "./Photo";
import { IUser } from "./User";

export interface IPost {
  post_id: string;
  description: string;
  author: IUser;
  photos: IPhoto[];
  comments: IComment[];
  created_at: Date;
  updated_at: Date;
}
