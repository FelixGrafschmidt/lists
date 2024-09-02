import { nanoid } from "nanoid";
import { defineStore } from "pinia";
import { Sortcriterion } from "@/models/enums/Sortcriterion";
import { Sortorder } from "@/models/enums/Sortorder";
import type { Character } from "@/models/interfaces/Character";
import type { List } from "@/models/interfaces/List";
import { newList } from "@/models/interfaces/List";

export const useList = defineStore("list", () => {
	const list = ref(newList(""));
	function setList(l: List) {
		l.characters.forEach((character) => {
			if (!character.created) {
				character.created = new Date();
			}

			if (!character.attributeArray) {
				character.attributeArray = [];
			}
		});
		if (!l.sortorder || typeof l.sortorder === "number") {
			l.sortorder = Sortorder.DEFAULT;
		}
		if (!l.sortcriterion) {
			l.sortcriterion = Sortcriterion.CREATED;
		}
		list.value = l;
	}
	function addCharacter({ character, index = -1 }: { character: Character; index: number }) {
		if (index !== -1) {
			list.value.characters[index] = character;
		} else {
			list.value.characters.push(character);
		}
	}
	function deleteCharacter(character: Character) {
		const characters = list.value.characters.filter((characterInList) => {
			return character.id !== characterInList.id;
		});
		list.value.characters = characters;
	}
	function sortListByName() {
		switch (list.value.sortorder) {
			case Sortorder.ASC:
				list.value.sortcriterion = Sortcriterion.NAME;
				list.value.characters.sort((a, b) => {
					if (a.name === b.name) {
						return a.created > b.created ? -1 : 1;
					}
					return a.name > b.name ? -1 : 1;
				});
				list.value.sortorder = Sortorder.DESC;
				break;
			case Sortorder.DESC:
				list.value.sortcriterion = Sortcriterion.CREATED;
				list.value.characters.sort((a, b) => {
					return a.created > b.created ? 1 : -1;
				});
				list.value.sortorder = Sortorder.DEFAULT;
				break;
			case Sortorder.DEFAULT:
				list.value.sortcriterion = Sortcriterion.NAME;
				list.value.characters.sort((a, b) => {
					if (a.name === b.name) {
						return a.created > b.created ? -1 : 1;
					}
					return a.name > b.name ? 1 : -1;
				});
				list.value.sortorder = Sortorder.ASC;
				break;
		}
	}
	function sortListByOrigin() {
		switch (list.value.sortorder) {
			case Sortorder.ASC:
				list.value.sortcriterion = Sortcriterion.ORIGIN;
				list.value.characters.sort((a, b) => {
					if (a.origin === b.origin) {
						return a.created > b.created ? -1 : 1;
					}
					return a.origin > b.origin ? -1 : 1;
				});
				list.value.sortorder = Sortorder.DESC;
				break;
			case Sortorder.DESC:
				list.value.sortcriterion = Sortcriterion.CREATED;
				list.value.characters.sort((a, b) => {
					return a.created > b.created ? 1 : -1;
				});
				list.value.sortorder = Sortorder.DEFAULT;
				break;
			case Sortorder.DEFAULT:
				list.value.sortcriterion = Sortcriterion.ORIGIN;
				list.value.characters.sort((a, b) => {
					if (a.origin === b.origin) {
						return a.created > b.created ? -1 : 1;
					}
					return a.origin > b.origin ? 1 : -1;
				});
				list.value.sortorder = Sortorder.ASC;
				break;
		}
	}

	function sortListByImages() {
		switch (list.value.sortorder) {
			case Sortorder.ASC:
				list.value.sortcriterion = Sortcriterion.IMAGES;
				list.value.characters.sort((a, b) => {
					if (a.images.length === b.images.length) {
						return a.created > b.created ? -1 : 1;
					}
					return a.images.length > b.images.length ? -1 : 1;
				});
				list.value.sortorder = Sortorder.DESC;
				break;
			case Sortorder.DESC:
				list.value.sortcriterion = Sortcriterion.CREATED;
				list.value.characters.sort((a, b) => {
					return a.created > b.created ? 1 : -1;
				});
				list.value.sortorder = Sortorder.DEFAULT;
				break;
			case Sortorder.DEFAULT:
				list.value.sortcriterion = Sortcriterion.IMAGES;
				list.value.characters.sort((a, b) => {
					if (a.images.length === b.images.length) {
						return a.created > b.created ? -1 : 1;
					}
					return a.images.length > b.images.length ? 1 : -1;
				});
				list.value.sortorder = Sortorder.ASC;
				break;
		}
	}

	function resetListSorting() {
		list.value.characters.sort((a, b) => {
			return a.created > b.created ? 1 : -1;
		});
	}

	function addAttributesToCharacters({ attributes, characters }: { attributes: Array<string>; characters: Array<string> }) {
		list.value.characters.forEach((character) => {
			if (characters.includes(character.id)) {
				attributes.forEach((attr) => {
					if (character.attributeArray.filter((a) => a.name === attr).length < 1) {
						character.attributeArray.push({ id: nanoid(), name: attr, value: "" });
					}
				});
			}
		});
	}

	return {
		list,
		setList,
		addCharacter,
		deleteCharacter,
		sortListByName,
		sortListByOrigin,
		sortListByImages,
		resetListSorting,
		addAttributesToCharacters,
	};
});
