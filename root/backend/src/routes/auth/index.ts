import express from "express";
import verifyEmail from "./verifyEmail";

const authRoute = express.Router();

authRoute.use("/verify-email", verifyEmail);

export default authRoute;
