<template>
	<div class="wrapper grid">
		<MoeHeader class="header border-b border-teal-700" />
		<MoeSidebar class="sidebar border-r border-teal-700" />
		<div
			class="content overflow-auto scrollbar-thumb-color-gray-9 scrollbar-track-color-gray-500 scrollbar-radius-2 scrollbar-thumb-radius-4 scrollbar-track-radius-4 scrollbar-w-2 scrollbar scrollbar-rounded"
		>
			<NuxtPage />
		</div>
		<MoeFooter class="footer w-full border-t border-teal-700" />
		<MoeModal />
	</div>
</template>

<script setup lang="ts">
	import { Modal } from "~~/models/enums/Modal";
	import { newList } from "~~/models/interfaces/List";

	const mainStore = useMainStore();
	const collectionStore = useCollectionStore();
	const listStore = useListStore();
	const characterStore = useCharacterStore();

	if (useDevice().isMobile) {
		await navigateTo("/mobile" + useRoute().path);
	}

	if (import.meta.server) {
		const params = useRoute().params;
		let { collection: collectionId, list: listId, character: characterId } = params;

		collectionId = (collectionId || useCookie("collectionId").value) as string;
		listId = listId as string;
		characterId = characterId as string;

		await collectionStore.loadCollection(collectionId);
		if (listId) {
			if (!listId.match(/[\w-]{21}/)) {
				collectionStore.addListToCollection(newList());
				await mainStore.toCollection();
			} else {
				const lists = collectionStore.collection.lists.filter((list) => list.id === listId);
				if (lists.length === 0) {
					await mainStore.toCollection();
				}
				listStore.setList(lists[0]);
				if (characterId) {
					if (!characterId.match(/[\w-]{21}/)) {
						await mainStore.toList();
					} else {
						const characters = listStore.list.characters.filter((character) => character.id === characterId);
						if (characters.length === 0) {
							await mainStore.toList();
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
	});
</script>

<style>
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
