import mongoose from "mongoose";

//local
import { TokenConfig } from "../../../config";
import { ITokenDocument, ITokenModel } from "./types";

const Schema = mongoose.Schema;

const Token = new Schema({
	userId: { type: String, required: true },
	token: { type: String, required: true },
	createdAt: {
		type: Date,
		default: Date.now,
		expires: parseInt(TokenConfig.tokenExpiry)
	}
});

export default mongoose.model<ITokenDocument, ITokenModel>("Token", Token);
