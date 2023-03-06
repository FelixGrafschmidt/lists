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
		toCollection() {
			const collectionId = useCollectionStore().collection.id;
			useRouter().push(`/${collectionId}`);
		},

		toList() {
			const collectionId = useCollectionStore().collection.id;
			const listId = useListStore().list.id;
			useRouter().push(`/${collectionId}/${listId}`);
		},

		toCharacter() {
			const collectionId = useCollectionStore().collection.id;
			const listId = useListStore().list.id;
			const characterId = useCharacterStore().character.id;
			useRouter().push(`/${collectionId}/${listId}/${characterId}`);
		},
	},
});
