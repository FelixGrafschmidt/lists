import type { IncomingMessage, ServerResponse } from 'http'
import { createClient } from "redis";
import { Collection } from "~~/models/interfaces/Collection";

const client = createClient({ url: "redis://127.0.0.1:6378" });
client.connect()

export default async (req: IncomingMessage, res: ServerResponse) => {
	let body = ""

	req.on('data', (chunk) => {
		body += chunk;
	});
	if (body) {
		const id: string = (JSON.parse(body) as Collection).id;

		if (id) {
			try {
				await client.set(id, JSON.stringify(body));
			} catch (error) {
				res.statusCode = 401
				console.error(error);
			}
		}
	}
	res.end()
}
