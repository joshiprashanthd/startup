import Dataloader from "dataloader";
import mongoose from "mongoose";
import { groupBy, map } from "ramda";

//local
import { IUserDocument } from "../entities/user/model";

async function batchUsers(ids: string[]): Promise<IUserDocument[]> {
	const User = mongoose.model("User");
	const users = await User.find({ _id: { $in: ids } });
	const groupedUsers = groupBy(user => user.id, users);
	return map(id => groupedUsers[id], ids);
}

export default () => new Dataloader<string, IUserDocument>(batchUsers);
