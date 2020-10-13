import express from "express";
import mongoose from "mongoose";

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
