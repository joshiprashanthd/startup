import express from "express";
import verifyEmail from "./verifyEmail";

const route = express.Router();

route.use("/:token", verifyEmail);

export default route;
