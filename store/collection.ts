import { defineStore } from "pinia";
import { Collection, getHash, newCollection } from "~~/models/interfaces/Collection";
import { newList } from "~~/models/interfaces/List";

export const useStore = defineStore('collection', {
	state: () => ({
		collection: newCollection(""),
		listToDelete: newList(""),
		originalHash: "",
		ready: false
	}),
	actions: {
		async saveCollection() {
			await $fetch("/api/save_collection", { method: "POST", body: this.collection })
		},
		async loadCollection() {
			let collectionId = window.localStorage.getItem("collectionId");
			const collection = newCollection();
			if (collectionId) {
				collection.id = collectionId;
				try {
					const response = await $fetch<Collection>("/api/load_collection", { params: { id: collectionId } })
					collectionId = response.id;

					this.collection = response;
					this.originalHash = getHash(response);
				} catch (error) {
					console.error(error);

					this.collection = collection;
					this.originalHash = getHash(collection);
				} finally {
					localStorage.setItem("collectionId", collectionId!);
					this.ready = true;
				}

			} else {
				this.collection = collection;
				this.originalHash = getHash(collection);
				localStorage.setItem("collectionId", collection.id);
				this.ready = true;
			}
		}
	}
})
