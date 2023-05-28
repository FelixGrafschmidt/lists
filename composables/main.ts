import { defineStore } from "pinia";
import { Modal } from "~~/models/enums/Modal";

export const useMainStore = defineStore("main", {
	state: () => ({
		loading: false,
		modal: Modal.NONE,
		mobileMode: "collection",
		scrollID: "",
		tutorial: 1,
	}),
	actions: {
		async toCollection() {
			const collectionId = useCollectionStore().collection.id;
			await navigateTo(`/${collectionId}`);
		},

		async toList() {
			const collectionId = useCollectionStore().collection.id;
			const listId = useListStore().list.id;
			await navigateTo(`/${collectionId}/${listId}`);
		},

		async toCharacter() {
			const collectionId = useCollectionStore().collection.id;
			const listId = useListStore().list.id;
			const characterId = useCharacterStore().character.id;
			await navigateTo(`/${collectionId}/${listId}/${characterId}`);
		},

		async toCharacterGallery() {
			const collectionId = useCollectionStore().collection.id;
			const listId = useListStore().list.id;
			const characterId = useCharacterStore().character.id;
			await navigateTo(`/${collectionId}/${listId}/${characterId}/gallery`);
		},

		setMobileMode(mode: "collection" | "list" | "character") {
			this.mobileMode = mode;
		},
	},
});
