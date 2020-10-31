import { ApolloServer } from "apollo-server-express";
import express from "express";

//local
import { TypeDefs, Resolvers } from "./entities";
import SchemaDirectives from "./entities/customDirectives";
import session from "./session";
import dataloaders from "./dataloaders";
import routes from "./routes";
import { IContext } from "./types";

export default async function () {
	const app = express();

	app.disable("x-powered-by");
	app.use("/", routes);
	app.use(session);

	const server = new ApolloServer({
		typeDefs: TypeDefs,
		resolvers: Resolvers,
		schemaDirectives: SchemaDirectives,
		playground: {
			settings: {
				"request.credentials": "include"
			}
		},
		context: async ({ req, res }): Promise<IContext> => {
			return {
				req,
				res,
				dataloaders
			};
		}
	});

	server.applyMiddleware({
		app,
		cors: {
			credentials: true,
			origin: "*"
		}
	});

	app.listen({ port: 4000 }, () => {
		console.log(`[SERVER] ready at http://localhost:4000${server.graphqlPath}`);
	});
}
