import { IncomingMessage, ServerResponse } from "http";

export type IRoutes = Record<string, Handlers>;

export type HTTPMethods = "GET" | "POST" | "PUT" | "DELETE";

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
