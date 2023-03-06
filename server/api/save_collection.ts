import { createClient } from "redis";
import { Collection } from "~~/models/interfaces/Collection";

const port = parseInt(process.env.REDIS_PORT || "6378");
const client = createClient({ url: `redis://127.0.0.1:${port}`, database: 0 });
client.connect();

export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	const id: string = (body as Collection).id;

	setCookie(event, "collectionId", id, { path: "/", secure: true, httpOnly: true, sameSite: true, maxAge: 365 * 24 * 60 * 60 });

	if (id) {
		try {
			await client.set(id, JSON.stringify(body));
			event.node.res.statusCode = 204;
			return true;
		} catch (error) {
			event.node.res.statusCode = 401;
			console.error(error);
			return false;
		}
	}
});
