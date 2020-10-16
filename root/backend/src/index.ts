import { ApolloServer } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";

//local
import { TypeDefs, Resolvers } from "./Types";
import session from "./utils/session";
import MongoConfig from "./utils/env/mongo.config";

mongoose
	.connect(
		`mongodb+srv://${MongoConfig.mongoUserName}:${MongoConfig.mongoUserPassword}@cluster0.vuqtk.mongodb.net/${MongoConfig.mongoDatabaseName}?retryWrites=true&w=majority`,
		{ useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }
	)
	.then(() => {
		console.log("[DATABASE] CONNECTED TO DATABASE");
	});

const app = express();

app.disable("x-powered-by");
app.use(session);
const server = new ApolloServer({
	typeDefs: TypeDefs,
	resolvers: Resolvers,
	playground: {
		settings: {
			"request.credentials": "include"
		}
	},
	context: async ({ req, res }) => {
		return {
			req,
			res
		};
	}
});

server.applyMiddleware({ app, cors: false });

app.listen({ port: 4000 }, () => {
	console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
});
