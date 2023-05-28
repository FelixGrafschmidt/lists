import { defineStore } from "pinia";
import { Collection, getHash, newCollection } from "~~/models/interfaces/Collection";
import { List, newList } from "~~/models/interfaces/List";

export const useCollectionStore = defineStore("collection", {
	state: () => ({
		collection: newCollection(""),
		listToDelete: newList(""),
		originalHash: "",
	}),
	actions: {
		async loadCollection() {
			const collection = newCollection();
			try {
				this.collection = await $fetch("/api/load_collection", {
					headers: { Cookie: useRequestHeaders().cookie || "" },
				});

				this.originalHash = getHash(this.collection);
			} catch (error) {
				console.error(error);

				this.collection = collection;
				this.originalHash = getHash(collection);
			}
		},
		async saveChanges() {
			try {
				await $fetch<void>("/api/save_collection", {
					method: "POST",
					body: this.collection,
					headers: { "Content-Type": "application/json" },
				});
				this.originalHash = getHash(this.collection);
			} catch (error) {
				console.error(error);
			}
		},
		setCollection(collection: Collection) {
			this.collection = collection;
			this.originalHash = getHash(collection);
		},
		addListToCollection(list: List) {
			this.collection.lists.push(list);
		},
		renameList({ id, name }: { id: string; name: string }) {
			this.collection.lists.filter((list) => list.id === id)[0].name = name;
		},
		setListToDelete(list: List) {
			this.listToDelete = list;
		},
		deleteList(id: string) {
			this.collection.lists = this.collection.lists.filter((list) => list.id !== id);
		},
		removeListFromCollection(id: string) {
			this.collection.lists = this.collection.lists.filter((list) => list.id !== id);
		},
	},
});
