import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IPhoto } from "../models/Photo";
import { Post } from "./Post";

@Entity()
export class Photo extends BaseEntity implements IPhoto {
  @PrimaryGeneratedColumn("uuid")
  photo_id: string = "";

  @Column("text")
  title: string = "";

  @Column("text")
  url: string = "";

  @ManyToOne((type) => Post, (post) => post.photos)
  // @ts-ignore
  post: Post;
}