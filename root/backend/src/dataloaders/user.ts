import Dataloader from "dataloader";
import mongoose from "mongoose";
import { groupBy, map } from "ramda";

//local
import { IUserDocument, IUserModel } from "../entities/user/model";

async function batchUsers(ids: string[]): Promise<IUserDocument[]> {
	const User = mongoose.model<IUserDocument, IUserModel>("User");
	const users = await User.find({ _id: { $in: ids } });
	const groupedUsers = groupBy(user => user.id, users);
	return map(id => groupedUsers[id][0], ids);
}

export default () => new Dataloader<string, IUserDocument>(batchUsers);
