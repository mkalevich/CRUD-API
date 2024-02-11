import { IncomingMessage, ServerResponse } from "http";
import { v4 as uuidv4 } from "uuid";
import { users } from "../db/users";
import { getUuidFromUrl } from "../helpers";
import {
  HTTP_STATUS_CODES,
  INVALID_USER_ID_MESSAGE,
  USER_DOES_NOT_EXIST_MESSAGE,
} from "../router/constants";
import { buildResponse, serverErrorHandler } from "./helpers";

export const addUser = (req: IncomingMessage, res: ServerResponse) => {
  serverErrorHandler(req, res);

  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    const { username, age, hobbies } = JSON.parse(body);

    const isValidBody = !username || !age || !hobbies;

    if (isValidBody) {
      buildResponse(res, HTTP_STATUS_CODES.BAD_REQUEST, {
        error: "Body does not contain required fields",
      });
    } else {
      const isUserExists = users.find((user) => user.username === username);

      if (isUserExists) {
        return buildResponse(res, HTTP_STATUS_CODES.CONFLICT, {
          error: "User with such name already exists",
        });
      }

      const user = {
        id: uuidv4(),
        username,
        age,
        hobbies,
      };

      users.push(user);

      buildResponse(res, HTTP_STATUS_CODES.CREATED, user);
    }
  });
};

export const getUserById = (req: IncomingMessage, res: ServerResponse) => {
  serverErrorHandler(req, res);

  const userId = req.url?.split("/")[3];
  const userUuid = getUuidFromUrl(userId);

  if (!userUuid) {
    return buildResponse(res, HTTP_STATUS_CODES.BAD_REQUEST, {
      error: INVALID_USER_ID_MESSAGE,
    });
  }

  if (userUuid) {
    const user = users.find((user) => user.id === userId);

    if (!user) {
      buildResponse(res, HTTP_STATUS_CODES.NOT_FOUND, {
        error: USER_DOES_NOT_EXIST_MESSAGE,
      });
    } else {
      buildResponse(res, HTTP_STATUS_CODES.OK, user);
    }
  }
};

export const getAllUsers = (req: IncomingMessage, res: ServerResponse) => {
  serverErrorHandler(req, res);

  buildResponse(res, HTTP_STATUS_CODES.OK, users);
};

export const updateUser = (req: IncomingMessage, res: ServerResponse) => {
  serverErrorHandler(req, res);
  const userId = req.url?.split("/")[3];
  const userUuid = getUuidFromUrl(userId);

  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    const { username, age, hobbies } = JSON.parse(body);

    if (!userUuid) {
      return buildResponse(res, HTTP_STATUS_CODES.BAD_REQUEST, {
        error: INVALID_USER_ID_MESSAGE,
      });
    }

    const isUserExists = users.find((user) => user.id === userId);

    if (!isUserExists) {
      return buildResponse(res, HTTP_STATUS_CODES.NOT_FOUND, {
        error: "User with such id does not exist",
      });
    }

    const updatedUser = {
      username,
      age,
      hobbies,
    };

    users.forEach((user) => {
      if (user.id === userId) {
        Object.assign(user, updatedUser);
      }
    });

    buildResponse(res, HTTP_STATUS_CODES.OK, updatedUser);
  });
};

export const deleteUser = (req: IncomingMessage, res: ServerResponse) => {
  serverErrorHandler(req, res);

  const userId = req.url?.split("/")[3];
  const userUuid = getUuidFromUrl(userId);

  if (!userUuid) {
    return buildResponse(res, HTTP_STATUS_CODES.BAD_REQUEST, {
      error: INVALID_USER_ID_MESSAGE,
    });
  }

  const isUserExists = users.find((user) => user.id === userId);

  if (!isUserExists) {
    return buildResponse(res, HTTP_STATUS_CODES.NOT_FOUND, {
      error: "User with such id does not exist",
    });
  }

  const indexToRemove = users.findIndex((user) => user.id === userId);

  users.splice(indexToRemove, 1);

  buildResponse(res, HTTP_STATUS_CODES.DELETED);
};
