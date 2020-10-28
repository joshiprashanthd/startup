import express from "express";
import verifyEmail from "./verifyEmail";
import findUser from "./findUser";
import findToken from "./findToken";

const route = express.Router();

route.param("tokenId", findToken);
route.use("/:tokenId", verifyEmail);

export default route;
