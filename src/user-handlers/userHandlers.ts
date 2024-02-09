import { IncomingMessage, ServerResponse } from "http";
import { users } from "../db/users.js";

export const addUser = (req: IncomingMessage, res: ServerResponse) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    res.writeHead(200, { "Content-Type": "application/json" });

    res.end(body.toString());
  });
};

export const getUserById = (req: IncomingMessage, res: ServerResponse) => {
  const userId = req.url?.split("/")[3];

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify(users.find((user) => user.id === userId)) ?? "No user",
  );
};

export const getAllUsers = (
  request: IncomingMessage,
  response: ServerResponse,
) => {
  response.writeHead(200, { "Content-Type": "application/json" });
  response.end(JSON.stringify(users));
};
