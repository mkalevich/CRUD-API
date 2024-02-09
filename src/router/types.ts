import { IncomingMessage, ServerResponse } from "http";
import { HTTP_METHODS } from "./constants";

export type IRoutes = Record<string, Handlers>;

export type HTTPMethods =
  | HTTP_METHODS.GET
  | HTTP_METHODS.POST
  | HTTP_METHODS.PUT
  | HTTP_METHODS.DELETE;

type Handlers = {
  [K in HTTPMethods]?: (
    request: IncomingMessage,
    response: ServerResponse,
  ) => void;
};

export interface RequestHandlerParams {
  path: string;
  method: HTTPMethods;
  handler: (request: IncomingMessage, response: ServerResponse) => void;
}
