import { emitter } from "../emitter.js";
import { getRequestMask } from "../helpers.js";
import { HTTP_METHODS } from "./constants";
import { IRoutes, RequestHandlerParams } from "./types";

export class Router {
  private readonly routes: IRoutes;

  constructor() {
    this.routes = {};
  }

  requestHandler({ path, method, handler }: RequestHandlerParams) {
    if (!this.routes[path]) {
      this.routes[path] = {};
    }

    const routePath = this.routes[path];

    if (routePath[method]) {
      throw new Error("This method already exists");
    }

    routePath[method] = handler;

    console.log("inside", getRequestMask(path, method));

    emitter.on(getRequestMask(path, method), (req: any, res: any) =>
      handler(req, res),
    );
  }

  get(path: string, handler: any) {
    this.requestHandler({ path, method: HTTP_METHODS.GET, handler });
  }

  post(path: string, handler: any) {
    this.requestHandler({ path, method: HTTP_METHODS.POST, handler });
  }

  put(path: string, handler: any) {
    this.requestHandler({ path, method: HTTP_METHODS.PUT, handler });
  }

  delete(path: string, handler: any) {
    this.requestHandler({ path, method: HTTP_METHODS.DELETE, handler });
  }
}
