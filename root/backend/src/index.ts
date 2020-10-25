import connectDatabase from "./connectDb";
import startServer from "./startServer";

(async () => {
	await connectDatabase();
	await startServer();
})();
