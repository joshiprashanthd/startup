import Dataloader from "dataloader";
import { groupBy, map } from "ramda";

//
import { IUserDocument, User } from "../entities/user/model";

async function batchUsers(ids: string[]): Promise<IUserDocument[]> {
	const users = await User.find({ _id: { $in: ids } });
	const groupedUsers = groupBy(user => user.id, users);
	return map(id => groupedUsers[id], ids);
}

export default () => new Dataloader<string, IUserDocument>(batchUsers);
