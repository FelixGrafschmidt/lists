import { nanoid } from "nanoid";
import { Sortcriterion } from "../enums/Sortcriterion";
import { Sortorder } from "../enums/Sortorder";
import type { Character } from "../interfaces/Character";

export interface List {
	id: string;
	name: string;
	characters: Array<Character>;
	sortcriterion: Sortcriterion;
	sortorder: Sortorder;
	attributes?: Record<string, string>;
}

export function newList(
	id = nanoid(),
	name = "",
	characters = [],
	sortcriterion = Sortcriterion.CREATED,
	sortorder = Sortorder.DEFAULT,
	attributes = {}
): List {
	return { id, name, characters, sortcriterion, sortorder, attributes };
}
