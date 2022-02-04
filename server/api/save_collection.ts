import type { IncomingMessage, ServerResponse } from 'http'
import { createClient } from "redis";
import { Collection } from "~~/models/interfaces/Collection";
import { useBody, setCookie } from 'h3'

const client = createClient({ url: "redis://127.0.0.1:6378" });
client.connect()

export default async (req: IncomingMessage, res: ServerResponse) => {
	let body = await useBody(req)

	const id: string = (body as Collection).id;

	setCookie(res, "collectionId", id, { path: "/", secure: true, httpOnly: true, sameSite: true })

	if (id) {
		try {
			await client.set(id, JSON.stringify(body));
			res.statusCode = 204
		} catch (error) {
			res.statusCode = 401
			console.error(error);
		}
	}
	res.end()
}
