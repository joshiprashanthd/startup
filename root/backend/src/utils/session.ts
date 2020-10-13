import mongoose from "mongoose";
import connectMongo from "connect-mongo";
import session from "express-session";

const MongoStore = connectMongo(session);
const connection = mongoose.createConnection(
	`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.vuqtk.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
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
	name: process.env.SESSION_NAME,
	secret: process.env.SESSION_SECRET,
	rolling: true,
	resave: true,
	saveUninitialized: false,
	cookie: {
		maxAge: parseInt(process.env.SESSION_LIFETIME)
	}
});

export default mySession;
