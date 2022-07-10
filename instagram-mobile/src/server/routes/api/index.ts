import { Route } from "../../utils/Route";
import { PostsRoute } from "./posts";

export class ApiRoutes extends Route {
  constructor(app: Route) {
    super("/api", app);

    this.addMiddleware((req, _res, next) => {
      console.log("Api Middleware: " + req.url);
      next();
    })
    new PostsRoute(this);
  }
}