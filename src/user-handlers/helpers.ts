import { IncomingMessage, ServerResponse } from "http";
import {
  HTTP_STATUS_CODES,
  INTERNAL_SERVER_ERROR_MESSAGE,
} from "../router/constants.js";

export const buildResponse = (
  res: ServerResponse,
  statusCode: number,
  data?: any,
) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(data ? JSON.stringify(data) : "");
};

export const serverErrorHandler = (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  req.on("error", () => {
    buildResponse(res, HTTP_STATUS_CODES.SERVER_ERROR, {
      error: INTERNAL_SERVER_ERROR_MESSAGE,
    });
  });
};
