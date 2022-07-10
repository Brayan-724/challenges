import { v4 as uuidV4 } from "uuid";
import { connect } from "../../orm";
import { Photo } from "../../orm/entity/Photo";
import { Post } from "../../orm/entity/Post";
import { User } from "../../orm/entity/User";
import { Route } from "../../utils/Route";

export interface INewPhoto {
  title: string;
  url: string;
}

export interface INewPost {
  description: string;
  photos: INewPhoto[];
}

export class PostsRoute extends Route {
  public static _testingUser: User = new User();

  constructor(app: Route) {
    super("/posts", app);

    this.addMiddleware((req, _res, next) => {
      console.log("Posts Middleware: " + req.url);
      next();
    });

    this.addRoute("get", "/", (req, res) => {
      res.send("Hello from posts");
    });

    this.addRoute("post", "/", async (req, res) => {
      // Validate request
      if (!req.body)
        return res.status(400).send({
          message: "No post data provided",
          status: 400,
        });

      const newPost = req.body as INewPost;

      if (!newPost.description || !newPost.photos) {
        return res.status(400).send({
          message: "Missing description or photos",
          status: 400,
        });
      }

      // Create the all photo instances to be saved
      const photos = newPost.photos.map((newPhoto) => {
        const photo = new Photo();
        photo.photo_id = uuidV4();
        photo.title = newPhoto.title;
        photo.url = newPhoto.url;

        return photo;
      });

      // Create the post instance to be saved
      const post = new Post();
      post.post_id = uuidV4();
      post.description = newPost.description;
      post.author = PostsRoute._testingUser;
      post.photos = photos;
      post.comments = [];
      post.created_at = new Date();
      post.updated_at = new Date();

      try {
        // Create and validate connection
        const [err, connection] = await connect();
        if (connection === null) {
          return res.status(500).send({
            message: "Error connecting to database",
            details: {
              name: err?.name,
              message: err?.message,
            },
            status: 500,
          });
        }

        const postRepository = connection.getRepository(Post);
        const photoRepository = connection.getRepository(Photo);

        // Save all
        await Promise.all(photos.map((photo) => photoRepository.save(photo)));
        await postRepository.save(post);

        return res.status(201).send({
          message: "Post created",
          status: 201,
        });
      } catch (_error) {
        const error = _error as Error;
        return res.status(500).send({
          message: "Error creating post",
          details: {
            name: error.name,
            message: error.message,
          },
          status: 500,
        });
      }
    });
  }
}

(async () => {
  PostsRoute._testingUser.user_id = uuidV4();
  PostsRoute._testingUser.username = "test";
  PostsRoute._testingUser.email = "mail@true.email.com";
  PostsRoute._testingUser.password = "pass";
  PostsRoute._testingUser.created_at = new Date();
  PostsRoute._testingUser.updated_at = new Date();
  PostsRoute._testingUser.posts = [];
  PostsRoute._testingUser.comments = [];

  const [err, connection] = await connect();
  if (connection === null) {
  } else {
    const userRepository = connection.getRepository(User);
    await userRepository.save(PostsRoute._testingUser);
  }
})();
