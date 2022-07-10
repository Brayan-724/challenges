import config from "./ormconfig.json";
import { Connection, createConnection } from "typeorm";
import { Post } from "./entity/Post";
import { User } from "./entity/User";
import { Photo } from "./entity/Photo";
import { Comment } from "./entity/Comment";

export let connection: Connection;

export async function connect(): Promise<[Error, null] | [null, Connection]> {
  if(connection) {
    return [null, connection];
  }
  
  try {
    /**
     * {
      type: "postgres",
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
      database: config.database,
      ssl: false,
      entities: [Posts],
      synchronize: true,
      logging: false,
    }
     */
    connection = await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "apigram",
      password: "pass",
      database: "apigram_db",
      ssl: false,
      entities: [Post, User, Photo, Comment],
      synchronize: true,
      logging: false,
    });

    return [null, connection];
  } catch (error) {
    return [error as Error, null];
  }
}
