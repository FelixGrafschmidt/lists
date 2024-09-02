<template>
	<div class="max-h-screen min-h-screen flex flex-col justify-between">
		<MoeHeader class="border-b border-teal-700" />
		<div class="max-h-[calc(100vh-128px)] flex grow flex-row">
			<MoeSidebar class="w-1/5 border-r border-teal-700" />
			<div
				class="grow overflow-y-auto scrollbar-thumb-color-gray-9 scrollbar-track-color-gray-500 scrollbar-radius-2 scrollbar-thumb-radius-4 scrollbar-track-radius-4 scrollbar-w-2 scrollbar scrollbar-rounded"
			>
				<NuxtPage />
			</div>
		</div>
		<MoeFooter class="w-full border-t border-teal-700" />
		<MoeModal />
	</div>
</template>

<script setup lang="ts">
	import { Modal } from "@/models/enums/Modal";
	import { newList } from "@/models/interfaces/List";

	const mainStore = useStore();
	const collectionStore = useCollection();
	const listStore = useList();
	const characterStore = useCharacter();

	if (useDevice().isMobile) {
		await navigateTo("/mobile" + useRoute().path);
	}

	if (import.meta.server) {
		const params = useRoute().params;
		let { collection: collectionId, list: listId, character: characterId } = params;

		collectionId = (collectionId || useCookie("collectionId").value) as string;
		listId = listId as string;
		characterId = characterId as string;

		try {
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
		} catch (error) {
			console.error(error);
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
