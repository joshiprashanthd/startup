import mongoose from "mongoose";

//local
import { MongoConfig } from "./config";

export default async function () {
	let errorOccurred = false;
	try {
		await mongoose.connect(
			`mongodb+srv://${MongoConfig.mongoUserName}:${MongoConfig.mongoUserPassword}@cluster0.vuqtk.mongodb.net/${MongoConfig.mongoDatabaseName}?retryWrites=true&w=majority`,
			{
				useUnifiedTopology: true,
				useNewUrlParser: true,
				useFindAndModify: false
			}
		);
	} catch (err) {
		errorOccurred = true;
	} finally {
		if (errorOccurred) console.log("[MONGOOSE] error connecting to MongoDB");
		else console.log("[SERVER] connected to database");
	}
}
