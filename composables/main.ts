import { defineStore } from "pinia";
import { Modal } from "~~/models/enums/Modal";

export const useMainStore = defineStore('main', {
	state: () => ({
		loading: false,
		modal: Modal.NONE,
		mobileMode: "collection",
		scrollID: "",
		tutorial: 1,
	}),
	actions: {
		toCollection() {
			const collectionId = useCollectionStore().collection.id
			useRouter().push(`/collection/${collectionId}`);
		},

		toList() {
			const listId = useListStore().list.id
			useRouter().push(`/list/${listId}`);
		},

		toCharacter() {
			const characterId = useCharacterStore().character.id
			useRouter().push(`/character/${characterId}`);
		},

		// toGallery() {
		// 	const listId = useListStore().list.id
		// 	useRouter().push(`/${listId}/gallery`);
		// },

		// toGalleryCharacter() {
		// 	const listId = useListStore().list.id
		// 	const characterId = useCharacterStore().character.id
		// 	useRouter().push(`/${listId}/gallery/${characterId}`);
		// },
	}
})
