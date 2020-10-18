import express, { RouterOptions } from "express";
import { nextTick } from "process";
import auth from "./auth";

const routes = express.Router();

routes.use("/auth", auth);

routes.get("/", (req, res, next) => {
	res.status(200).json({ message: "Connected!" });
	next();
});

export default routes;
