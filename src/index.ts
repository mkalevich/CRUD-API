import { config } from "dotenv";
import { Router } from "./router/Router.js";
import { Server } from "./server/Server.js";
import {
  addUser,
  getAllUsers,
  getUserById,
} from "./user-handlers/userHandlers.js";
import { PATH } from "./router/constants.js";

config();

const PORT = process.env.PORT;

const server = new Server();

server.listen(PORT);

const route = new Router();

route.get(PATH.API_USERS, getAllUsers);

route.get(PATH.USER_BY_ID, getUserById);

route.post(PATH.API_USERS, addUser);
