import { nanoid } from "nanoid";
import { defineStore } from "pinia";
import { Sortcriterion } from "~~/models/enums/Sortcriterion";
import { Sortorder } from "~~/models/enums/Sortorder";
import { Character } from "~~/models/interfaces/Character";
import { List, newList } from "~~/models/interfaces/List";

export const useListStore = defineStore("list", {
	state: () => ({
		list: newList(""),
	}),
	actions: {
		setList(list: List) {
			list.characters.forEach((character) => {
				if (!character.created) {
					character.created = new Date();
				}

				if (!character.attributeArray) {
					character.attributeArray = [];
				}
			});
			if (!list.sortorder || typeof list.sortorder === "number") {
				list.sortorder = Sortorder.DEFAULT;
			}
			if (!list.sortcriterion) {
				list.sortcriterion = Sortcriterion.CREATED;
			}
			this.list = list;
		},

		addCharacter({ character, index = -1 }: { character: Character; index: number }) {
			if (index !== -1) {
				this.list.characters[index] = character;
			} else {
				this.list.characters.push(character);
			}
		},

		deleteCharacter(character: Character) {
			const characters = this.list.characters.filter((characterInList) => {
				return character.id !== characterInList.id;
			});
			this.list.characters = characters;
		},

		sortListByName() {
			switch (this.list.sortorder) {
				case Sortorder.ASC:
					this.list.sortcriterion = Sortcriterion.NAME;
					this.list.characters.sort((a, b) => {
						if (a.name === b.name) {
							return a.created > b.created ? -1 : 1;
						}
						return a.name > b.name ? -1 : 1;
					});
					this.list.sortorder = Sortorder.DESC;
					break;
				case Sortorder.DESC:
					this.list.sortcriterion = Sortcriterion.CREATED;
					this.list.characters.sort((a, b) => {
						return a.created > b.created ? 1 : -1;
					});
					this.list.sortorder = Sortorder.DEFAULT;
					break;
				case Sortorder.DEFAULT:
					this.list.sortcriterion = Sortcriterion.NAME;
					this.list.characters.sort((a, b) => {
						if (a.name === b.name) {
							return a.created > b.created ? -1 : 1;
						}
						return a.name > b.name ? 1 : -1;
					});
					this.list.sortorder = Sortorder.ASC;
					break;
			}
		},

		sortListByOrigin() {
			switch (this.list.sortorder) {
				case Sortorder.ASC:
					this.list.sortcriterion = Sortcriterion.ORIGIN;
					this.list.characters.sort((a, b) => {
						if (a.origin === b.origin) {
							return a.created > b.created ? -1 : 1;
						}
						return a.origin > b.origin ? -1 : 1;
					});
					this.list.sortorder = Sortorder.DESC;
					break;
				case Sortorder.DESC:
					this.list.sortcriterion = Sortcriterion.CREATED;
					this.list.characters.sort((a, b) => {
						return a.created > b.created ? 1 : -1;
					});
					this.list.sortorder = Sortorder.DEFAULT;
					break;
				case Sortorder.DEFAULT:
					this.list.sortcriterion = Sortcriterion.ORIGIN;
					this.list.characters.sort((a, b) => {
						if (a.origin === b.origin) {
							return a.created > b.created ? -1 : 1;
						}
						return a.origin > b.origin ? 1 : -1;
					});
					this.list.sortorder = Sortorder.ASC;
					break;
			}
		},

		sortListByImages() {
			switch (this.list.sortorder) {
				case Sortorder.ASC:
					this.list.sortcriterion = Sortcriterion.IMAGES;
					this.list.characters.sort((a, b) => {
						if (a.images.length === b.images.length) {
							return a.created > b.created ? -1 : 1;
						}
						return a.images.length > b.images.length ? -1 : 1;
					});
					this.list.sortorder = Sortorder.DESC;
					break;
				case Sortorder.DESC:
					this.list.sortcriterion = Sortcriterion.CREATED;
					this.list.characters.sort((a, b) => {
						return a.created > b.created ? 1 : -1;
					});
					this.list.sortorder = Sortorder.DEFAULT;
					break;
				case Sortorder.DEFAULT:
					this.list.sortcriterion = Sortcriterion.IMAGES;
					this.list.characters.sort((a, b) => {
						if (a.images.length === b.images.length) {
							return a.created > b.created ? -1 : 1;
						}
						return a.images.length > b.images.length ? 1 : -1;
					});
					this.list.sortorder = Sortorder.ASC;
					break;
			}
		},

		resetListSorting() {
			this.list.characters.sort((a, b) => {
				return a.created > b.created ? 1 : -1;
			});
		},

		addAttributesToCharacters({ attributes, characters }: { attributes: Array<string>; characters: Array<string> }) {
			this.list.characters.forEach((character) => {
				if (characters.includes(character.id)) {
					attributes.forEach((attr) => {
						if (character.attributeArray.filter((a) => a.name === attr).length < 1) {
							character.attributeArray.push({ id: nanoid(), name: attr, value: "" });
						}
					});
				}
			});
		},
	},
});
