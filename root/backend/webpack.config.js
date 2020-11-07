const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
	mode: "development",
	externals: [nodeExternals()],
	target: "node",
	entry: {
		app: path.join(__dirname, "src", "index.ts")
	},
	resolve: {
		extensions: [".ts", ".js"]
	},
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		compress: true
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
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "dist")
	}
};
