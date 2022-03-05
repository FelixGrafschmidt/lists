<template>
	<div class="grid wrapper">
		<MoeHeader class="border-b border-teal-700 header" />
		<MoeSidebar class="border-r border-teal-700 sidebar" />
		<div
			class="p-6 scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-500 overflow-auto content"
		>
			<NuxtNestedPage />
		</div>
		<MoeFooter class="w-full border-t border-teal-700 footer" />
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
	if (listId) {
		if (!listId.match(/\w{21}/)) {
			mainStore.toCollection();
		} else {
			const lists = collectionStore.collection.lists.filter((list) => list.id === listId);
			if (lists.length === 0) {
				mainStore.toCollection();
			}
			listStore.setList(lists[0]);
			if (characterId) {
				if (!characterId.match(/\w{21}/)) {
					mainStore.toList();
				} else {
					const characters = listStore.list.characters.filter((character) => character.id === characterId);
					if (characters.length === 0) {
						mainStore.toList();
					} else {
						characterStore.setCharacter(characters[0]);
					}
				}
			}
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

<style lang="postcss">
.wrapper {
	grid-template-columns: 1fr 5fr;
	grid-template-rows: 3rem 14fr 3rem;
	grid-column-gap: 0px;
	grid-row-gap: 0px;
}

.header {
	grid-area: 1 / 1 / 2 / 3;
}
.footer {
	grid-area: 3 / 1 / 4 / 3;
}
.sidebar {
	grid-area: 2 / 1 / 3 / 2;
}
.content {
	grid-area: 2 / 2 / 3 / 3;
}
</style>
