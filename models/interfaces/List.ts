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
}

export function newList(
	id = nanoid(),
	name = "",
	characters = [],
	sortcriterion = Sortcriterion.CREATED,
	sortorder = Sortorder.DEFAULT
): List {
	return { id, name, characters, sortcriterion, sortorder };
}
