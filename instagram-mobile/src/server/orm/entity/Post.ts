import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IPost } from "../models/Post";
import { Comment } from "./Comment";
import { Photo } from "./Photo";
import { User } from "./User";

@Entity()
export class Post extends BaseEntity implements IPost {
  @PrimaryGeneratedColumn("uuid")
  post_id: string = "";

  @Column("text")
  description: string = "";

  @ManyToOne((type) => User, (user) => user.posts)
  @JoinColumn()
  //@ts-ignore
  author: User;

  @OneToMany((type) => Photo, (photo) => photo.post)
  //@ts-expect-error - Array initializer is not allowed in typeorm
  photos: Photo[];

  @OneToMany((type) => Comment, (comment) => comment.post)
  //@ts-expect-error - Array initializer is not allowed in typeorm
  comments: Comment[];

  @CreateDateColumn()
  created_at: Date = new Date();

  @CreateDateColumn()
  updated_at: Date = new Date();
}
