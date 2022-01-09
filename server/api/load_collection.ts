import * as url from "url";
import type { IncomingMessage, ServerResponse } from 'http'
import { createClient } from "redis";
import { nanoid } from "nanoid";
import { List } from "~~/models/interfaces/List"

const client = createClient({ url: "redis://127.0.0.1:6378" });
client.connect()

export default async (req: IncomingMessage, res: ServerResponse) => {
	// eslint-disable-next-line no-array-constructor
	let collection = { id: nanoid(), lists: new Array<List>() };
	const params: url.URLSearchParams = new url.URL(req.url!, "https://localhost").searchParams;

	res.setHeader("Content-Type", "application/json");
	res.statusCode = 404;

	const id: string = params.get("id") || "";
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
		return collection
	}
}
