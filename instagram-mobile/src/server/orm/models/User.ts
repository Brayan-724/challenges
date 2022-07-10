import { IComment } from "./Comment";
import { IPhoto } from "./Photo";
import { IPost } from "./Post";

export interface IUser {
  user_id: string;
  username: string;
  bio: string;
  password: string;
  email: string;
  created_at: Date;
  updated_at: Date;

  posts: IPost[];
  comments: IComment[];
}