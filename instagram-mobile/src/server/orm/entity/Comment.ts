import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { IComment } from "../models/Comment";
import { Post } from "./Post";
import { User } from "./User";

@Entity()
export class Comment extends BaseEntity implements IComment {
  @PrimaryGeneratedColumn("uuid")
  comment_id: string = "";

  @ManyToOne((type) => User, (user) => user.comments)
  @JoinColumn()
  // @ts-ignore
  author: User;

  @Column("text")
  description: string = "";

  @ManyToOne((type) => Post, (post) => post.comments)
  // @ts-ignore
  post: Post;
}