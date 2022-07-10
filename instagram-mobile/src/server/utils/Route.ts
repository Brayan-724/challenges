import { Application, NextFunction, Request, Response, Router } from "express";

export type RouteMethod = "get" | "post" | "put" | "delete";
export type RouteHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export class Route {
  public static app: Application;
  protected router: Router = Router();

  constructor(route: string, parent: Route | Application) {
    if (parent instanceof Route) {
      parent.addMiddleware(route, this.router);
    } else {
      Route.app = parent;
      parent.use(route, this.router);
    }
  }

  getRouter(): Router {
    return this.router;
  }

  addMiddleware(handler: RouteHandler): void;
  addMiddleware(path: string, handler: RouteHandler): void;

  addMiddleware(pathOrHandler: string | RouteHandler, maybeHandler?: RouteHandler): void {
    const path = typeof pathOrHandler === "string" ? pathOrHandler : "";
    const handler = typeof pathOrHandler === "string" ? maybeHandler as RouteHandler : pathOrHandler;

    this.router.use(path, handler);
  }

  addRoute(method: RouteMethod, route: string, handler: RouteHandler): void;
  addRoute(route: string, handler: RouteHandler): void;

  addRoute(
    methodOrPath: string | RouteMethod,
    pathOrHandler: string | RouteHandler | Router,
    maybeHandler?: RouteHandler | Router
  ): void {
    const method =
      typeof maybeHandler !== "undefined"
        ? (methodOrPath as RouteMethod)
        : "get";
    const path =
      typeof pathOrHandler === "string" ? pathOrHandler : methodOrPath;
    const handler =
      typeof pathOrHandler === "string"
        ? (maybeHandler as RouteHandler | Router)
        : pathOrHandler;

    console.log(method, path);

    this.router[method](path, handler);
  }
}
