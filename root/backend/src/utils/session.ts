import mongoose from "mongoose";
import connectMongo from "connect-mongo";
import session from "express-session";
import SessionConfig from "./env/session.config";

const MongoStore = connectMongo(session);
const connection = mongoose.createConnection(
	`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.vuqtk.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`,
	{ useUnifiedTopology: true, useNewUrlParser: true }
);

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
		maxAge: parseInt(SessionConfig.sessionSecret)
	}
});

export default mySession;
