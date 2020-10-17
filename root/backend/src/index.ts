import { ApolloServer } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";

//local
import { TypeDefs, Resolvers } from "./entities";
import session from "./utils/session";
import { MongoConfig } from "./utils/config";
import dataloaders from "./dataloaders";

mongoose
	.connect(
		`mongodb+srv://${MongoConfig.mongoUserName}:${MongoConfig.mongoUserPassword}@cluster0.vuqtk.mongodb.net/${MongoConfig.mongoDatabaseName}?retryWrites=true&w=majority`,
		{ useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }
	)
	.then(() => {
		console.log("[MONGOOSE] CONNECTED TO DATABASE");
	})
	.catch(reason => {
		console.log(
			`[MONGOOSE] Error connecting to database. \nREASON : ${reason}`
		);
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
			res,
			dataloaders
		};
	}
});

server.applyMiddleware({ app, cors: false });

app.listen({ port: 4000 }, () => {
	console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
});
