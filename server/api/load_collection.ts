import type { IncomingMessage, ServerResponse } from 'http'
import { createClient } from "redis";
import { nanoid } from "nanoid";
import { List } from "~~/models/interfaces/List"
import { useCookie, setCookie } from 'h3'

const client = createClient({ url: "redis://127.0.0.1:6379" });
client.connect()

export default async (req: IncomingMessage, res: ServerResponse) => {
	// eslint-disable-next-line no-array-constructor
	let collection = { id: nanoid(), lists: new Array<List>() };

	res.setHeader("Content-Type", "application/json");
	res.statusCode = 404;

	const id = useCookie(req, "collectionId");

	if (id) {
		collection = { id, lists: [] };
		try {
			await client.exists(id)
			const response = await client.get(id)
			if (typeof response === "string") {
				collection = JSON.parse(response) as { id: string; lists: Array<List> };
				res.statusCode = 200;
			}
			return collection
		} catch (error) {
			console.error(error);
		}
	} else {
		setCookie(res, "collectionId", collection.id, { path: "/", secure: true, httpOnly: true, sameSite: true, maxAge: 365 * 24 * 60 * 60 })
		return collection
	}
}
