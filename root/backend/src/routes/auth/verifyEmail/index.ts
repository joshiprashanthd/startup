import express from "express";
import verifyEmail from "./verifyEmail";
import findUser from "./findUser";
import findToken from "./findToken";

const route = express.Router();

route.param("userId", findUser);
route.param("token", findToken);
route.use("/:userId-:token", verifyEmail);

export default route;
