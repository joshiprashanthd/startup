import * as dotenv from "dotenv";
dotenv.config();

export default {
	nodeEnvironment: process.env.NODE_ENV ?? "development"
};
