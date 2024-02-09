import { config } from "dotenv";
import { Router } from "./router/Router.js";
import { Server } from "./server/Server.js";
import {
  addUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "./user-handlers/userHandlers.js";
import { PATH } from "./router/constants.js";

config();

const PORT = process.env.PORT;

const server = new Server();

server.listen(PORT);

const router = new Router();

// server.addRouter(router);

router.get(PATH.API_USERS, getAllUsers);

router.get(PATH.USER_BY_ID, getUserById);

router.post(PATH.API_USERS, addUser);

router.put(PATH.USER_BY_ID, updateUser);

router.delete(PATH.USER_BY_ID, deleteUser);
