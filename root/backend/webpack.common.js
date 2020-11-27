const path = require("path");
const nodeExternals = require("webpack-node-externals");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
	externals: [nodeExternals()],
	target: "node",
	entry: {
		app: path.join(__dirname, "src", "index.ts")
	},
	resolve: {
		extensions: [".ts", ".js"]
	},
	module: {
		rules: [
			{
				test: /\.ts?$/,
				use: "ts-loader",
				exclude: "/node_modules/"
			}
		]
	},
	plugins: [new CleanWebpackPlugin()],
	output: {
		filename: "[name].bundle.js",
		path: path.resolve(__dirname, "dist")
	}
};
