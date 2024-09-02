import { defineStore } from "pinia";
import { Modal } from "@/models/enums/Modal";

export const useStore = defineStore("main", () => {
	const loading = ref(false);
	const modal = ref(Modal.NONE);
	const mobileMode = ref("collection");
	const scrollID = ref("");
	const tutorial = ref(1);
	async function toCollection() {
		const collectionId = useCollection().collection.id;
		await navigateTo(`/${collectionId}`);
	}

	async function toList() {
		const collectionId = useCollection().collection.id;
		const listId = useList().list.id;
		await navigateTo(`/${collectionId}/${listId}`);
	}

	async function toCharacter() {
		const collectionId = useCollection().collection.id;
		const listId = useList().list.id;
		const characterId = useCharacter().character.id;
		await navigateTo(`/${collectionId}/${listId}/${characterId}`);
	}

	async function toCharacterGallery() {
		const collectionId = useCollection().collection.id;
		const listId = useList().list.id;
		const characterId = useCharacter().character.id;
		await navigateTo(`/${collectionId}/${listId}/${characterId}/gallery`);
	}
	async function toListGallery() {
		const collectionId = useCollection().collection.id;
		const listId = useList().list.id;
		await navigateTo(`/${collectionId}/${listId}/gallery`);
	}

	function setMobileMode(mode: "collection" | "list" | "character") {
		mobileMode.value = mode;
	}

	return {
		loading,
		modal,
		mobileMode,
		scrollID,
		tutorial,
		toCollection,
		toList,
		toCharacter,
		toCharacterGallery,
		toListGallery,
		setMobileMode,
	};
});
