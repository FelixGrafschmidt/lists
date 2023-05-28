import { kv } from "@vercel/kv";
import { nanoid } from "nanoid";
import { List } from "~~/models/interfaces/List";

export default defineEventHandler(async (event) => {
	let collection = { id: nanoid(), lists: new Array<List>() };

	setHeader(event, "Content-Type", "application/json");
	event.node.res.statusCode = 404;

	const cookies = parseCookies(event);

	const id = cookies.collectionId;

	if (id) {
		collection = { id, lists: [] };
		try {
			if ((await kv.exists(id)) > 0) {
				collection = (await kv.get(id))!;
			}
			event.node.res.statusCode = 200;
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
