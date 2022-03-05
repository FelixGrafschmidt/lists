<template>
	<div class="flex flex-col h-full">
		<MoeHeader class="h-12 fixed border-b border-teal-700" />
		<div class="flex flex-row mt-12 h-full">
			<MoeSidebar class="w-1/6 h-full fixed mb-32 border-r border-teal-700" />
			<div
				class="scroll-padding h-full w-5/6 ml-auto px-6 pt-4 scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-500 overflow-auto"
			>
				<NuxtNestedPage class />
			</div>
		</div>
		<MoeFooter class="h-12 fixed bottom-0 w-full border-t border-teal-700" />
		<MoeModal />
	</div>
</template>

<script setup lang="ts">
import { Modal } from "~~/models/enums/Modal";

const mainStore = useMainStore()
const collectionStore = useCollectionStore()
const listStore = useListStore()
const characterStore = useCharacterStore()

if (process.server) {
	const [_, collectionId, listId, characterId] = useRoute().fullPath.split("/")
	if (collectionId && collectionId.match(/\w{21}/)) {
		useCookie("collectionId").value = collectionId
	}
	await collectionStore.loadCollection()
	if (listId && listId.match(/\w{21}/)) {
		const lists = collectionStore.collection.lists.filter((list) => list.id === listId);
		if (lists.length === 0) {
			mainStore.toCollection();
		}
		listStore.setList(lists[0]);
		if (characterId && characterId.match(/\w{21}/)) {
			const characters = listStore.list.characters.filter((character) => character.id === characterId);
			if (characters.length === 0) {
				mainStore.toList();
			}
			characterStore.setCharacter(characters[0]);
		}
	}
}

onMounted(() => {
	const lsTutorial = window.localStorage.getItem("tutorial");
	if (lsTutorial) {
		mainStore.tutorial = parseInt(lsTutorial);
	} else {
		mainStore.modal = Modal.TUTORIAL;
	}
})
</script>
