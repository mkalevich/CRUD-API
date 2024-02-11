export const PATH = {
  API_USERS: "/api/users",
  USER_BY_ID: "/api/users/:id",
};

export const enum HTTP_METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export const enum HTTP_STATUS_CODES {
  OK = 200,
  CREATED = 201,
  DELETED = 204,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  CONFLICT = 409,
  SERVER_ERROR = 500,
}

export const USER_DOES_NOT_EXIST_MESSAGE =
  "User with this userId does not exist";

export const INVALID_USER_ID_MESSAGE = "The userId is invalid";

export const INTERNAL_SERVER_ERROR_MESSAGE =
  "An internal server error occurred";
