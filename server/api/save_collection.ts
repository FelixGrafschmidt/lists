import { kv } from "@vercel/kv";
import type { Collection } from "~~/models/interfaces/Collection";

export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	const id: string = (body as Collection).id;

	setCookie(event, "collectionId", id, { path: "/", secure: true, httpOnly: true, sameSite: true, maxAge: 365 * 24 * 60 * 60 });

	if (id) {
		try {
			await kv.set(id, body);
			event.node.res.statusCode = 204;
			return true;
		} catch (error) {
			event.node.res.statusCode = 401;
			console.error(error);
			return false;
		}
	}
});
