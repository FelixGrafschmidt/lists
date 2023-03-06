import { createClient } from "redis";
import { nanoid } from "nanoid";
import { List } from "~~/models/interfaces/List";

const port = parseInt(process.env.REDIS_PORT || "6378");
const client = createClient({ url: `redis://127.0.0.1:${port}`, database: 0 });
client.connect();

export default defineEventHandler(async (event) => {
	let collection = { id: nanoid(), lists: new Array<List>() };

	setHeader(event, "Content-Type", "application/json");
	event.node.res.statusCode = 404;

	const cookies = parseCookies(event);
	const id = cookies.collectionId;

	if (id) {
		collection = { id, lists: [] };
		try {
			await client.exists(id);
			const response = await client.get(id);
			if (typeof response === "string") {
				collection = JSON.parse(response) as { id: string; lists: Array<List> };
				event.node.res.statusCode = 200;
			}
			return collection;
		} catch (error) {
			console.error(error);
		}
	} else {
		setCookie(event, "collectionId", collection.id, {
			path: "/",
			secure: true,
			httpOnly: true,
			sameSite: true,
			maxAge: 365 * 24 * 60 * 60,
		});
		return collection;
	}
});
