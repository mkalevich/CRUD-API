import { emitter } from "../emitter";
import { getRequestMask } from "../helpers";
import { HTTP_METHODS } from "./constants";
import { IRoutes, RequestHandlerParams } from "./types";
import { IncomingMessage, ServerResponse } from "http";

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

    emitter.on(
      getRequestMask(path, method),
      (req: IncomingMessage, res: ServerResponse) => handler(req, res),
    );
  }

  get(
    path: string,
    handler: (request: IncomingMessage, response: ServerResponse) => void,
  ) {
    this.requestHandler({ path, method: HTTP_METHODS.GET, handler });
  }

  post(
    path: string,
    handler: (request: IncomingMessage, response: ServerResponse) => void,
  ) {
    this.requestHandler({ path, method: HTTP_METHODS.POST, handler });
  }

  put(
    path: string,
    handler: (request: IncomingMessage, response: ServerResponse) => void,
  ) {
    this.requestHandler({ path, method: HTTP_METHODS.PUT, handler });
  }

  delete(
    path: string,
    handler: (request: IncomingMessage, response: ServerResponse) => void,
  ) {
    this.requestHandler({ path, method: HTTP_METHODS.DELETE, handler });
  }
}
