import mongoose from "mongoose";
import connectMongo from "connect-mongo";
import session from "express-session";
import { SessionConfig } from "./config";
import { MongoConfig } from "./config";

const MongoStore = connectMongo(session);
const connection = mongoose.createConnection(
	`mongodb+srv://${MongoConfig.mongoUserName}:${MongoConfig.mongoUserPassword}@cluster0.vuqtk.mongodb.net/${MongoConfig.mongoDatabaseName}?retryWrites=true&w=majority`,
	{ useUnifiedTopology: true, useNewUrlParser: true }
);

connection.on("error", function (err) {
	console.log("[MONGOSTORE] Error connecting to MongoStore");
});

const store = new MongoStore({
	mongooseConnection: connection,
	collection: "sessions"
});

(store as any).on("error", function (error) {
	console.log("[SERVER]  Error connecting to the mongodb store");
});

const mySession = session({
	store,
	name: SessionConfig.sessionName,
	secret: SessionConfig.sessionSecret,
	rolling: true,
	resave: true,
	saveUninitialized: false,
	cookie: {
		maxAge: parseInt(SessionConfig.sessionLifetime)
	}
});

export default mySession;
