import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IUser } from "../models/User";
import { Comment } from "./Comment";
import { Post } from "./Post";

@Entity()
export class User extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn("uuid")
  user_id: string = "";

  @Column("text")
  username: string = "";

  @Column("text")
  password: string = "";

  @Column("text")
  email: string = "";

  @CreateDateColumn()
  created_at: Date = new Date();

  @CreateDateColumn()
  updated_at: Date = new Date();

  @Column("text")
  bio: string = "";

  @OneToMany((type) => Post, (post) => post.author)
  //@ts-expect-error - Array initializer is not allowed in typeorm
  posts: Post[];

  @OneToMany((type) => Comment, comment => comment.author)
  //@ts-expect-error - Array initializer is not allowed in typeorm
  comments: Comment[];
}