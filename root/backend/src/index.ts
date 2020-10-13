import { ApolloServer } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";

//local
import { TypeDefs, Resolvers } from "./Types";

mongoose
	.connect(
		`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.vuqtk.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
		{ useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }
	)
	.then(() => {
		console.log("[DATABASE] CONNECTED TO DATABASE");
	});

const app = express();

app.disable("x-powered-by");

const server = new ApolloServer({
	typeDefs: TypeDefs,
	resolvers: Resolvers
});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => {
	console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
});
