import * as dotenv from "dotenv";
dotenv.config();

export default {
	mongoUserName: process.env.MONGO_USER ?? "",
	mongoUserPassword: process.env.MONGO_PASSWORD ?? "",
	mongoDatabaseName: process.env.MONGO_DATABASE ?? ""
};
