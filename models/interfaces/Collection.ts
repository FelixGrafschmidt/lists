import { nanoid } from "nanoid"
import hash from "object-hash";
import { List } from "./List";

export interface Collection {
	id: string;
	lists: Array<List>;
}

export function newCollection(id = nanoid(), lists = []): Collection {
	return { id, lists };
}

export function getHash(collection: Collection) {
	return hash(collection);
}
