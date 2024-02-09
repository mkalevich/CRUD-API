import { IRoutes, RequestHandlerParams } from "./types";
import { getRequestMask } from "../helpers.js";
import { emitter } from "../emitter.js";

export class Router {
  private readonly routes: IRoutes;
  emitter: any;

  constructor() {
    this.routes = {};
  }

  requestHandler({ path, method, handler }: RequestHandlerParams) {
    const existsId = path.split("/")[3];
    console.log("existsId", existsId);

    if (!this.routes[path]) {
      this.routes[path] = {};
    }

    const routePath = this.routes[path];

    if (routePath[method]) {
      throw new Error("This method already exists");
    }

    routePath[method] = handler;

    emitter.on(getRequestMask(method, !!existsId), (req: any, res: any) =>
      handler(req, res),
    );
  }

  get(path: string, handler: any) {
    this.requestHandler({ path, method: "GET", handler });
  }

  post(path: string, handler: any) {
    this.requestHandler({ path, method: "POST", handler });
  }
}
