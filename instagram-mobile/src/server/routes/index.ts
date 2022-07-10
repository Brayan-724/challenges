import { Application } from "express";
import { Route } from "../utils/Route";
import { ApiRoutes } from "./api";

export class IndexRoute extends Route {
  constructor(app: Application) {
    super("/", app);

    this.addMiddleware((req, _res, next) => {
      if(!req.url.startsWith("/_next")) {
        console.log("Index Middleware: " + req.url);
      }
      next();
    })
    new ApiRoutes(this);
  }
}