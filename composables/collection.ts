import { defineStore } from "pinia";
import type { Collection } from "@/models/interfaces/Collection";
import { getHash, newCollection } from "@/models/interfaces/Collection";
import type { List } from "@/models/interfaces/List";
import { newList } from "@/models/interfaces/List";

export const useCollection = defineStore("collection", () => {
	const collection = ref(newCollection(""));
	const listToDelete = ref(newList(""));
	const originalHash = ref("");

	async function loadCollection(id: string) {
		try {
			collection.value = await $fetch("/api/load_collection", {
				headers: { Cookie: useCookie("collectionId").value || "" },
				query: { id },
			});
		} catch (error) {
			console.error(error);
			collection.value = newCollection();
		} finally {
			originalHash.value = getHash(collection.value);
		}
	}

	async function saveChanges() {
		try {
			await $fetch("/api/save_collection", {
				method: "POST",
				body: collection.value,
				headers: { "Content-Type": "application/json" },
			});
			originalHash.value = getHash(collection.value);
		} catch (error) {
			console.error(error);
		}
	}
	function setCollection(c: Collection) {
		collection.value = c;
		originalHash.value = getHash(collection.value);
	}
	function addListToCollection(list: List) {
		collection.value.lists.push(list);
	}
	function renameList({ id, name }: { id: string; name: string }) {
		collection.value.lists.filter((list) => list.id === id)[0].name = name;
	}
	function setListToDelete(list: List) {
		listToDelete.value = list;
	}
	function deleteList(id: string) {
		collection.value.lists = collection.value.lists.filter((list) => list.id !== id);
	}
	function removeListFromCollection(id: string) {
		collection.value.lists = collection.value.lists.filter((list) => list.id !== id);
	}

	return {
		collection,
		listToDelete,
		originalHash,
		loadCollection,
		saveChanges,
		setCollection,
		addListToCollection,
		renameList,
		setListToDelete,
		deleteList,
		removeListFromCollection,
	};
});
