<template>
	<div class="flex relative flex-row justify-center gap-4 p-6 gap-2" @click="quickImage">
		<MoeButton
			v-tooltip="'Back to Character List'"
			class="absolute top-6 left-6 h-8 w-8 -mt-6 -ml-6 rounded-none rounded-br-1 !p-0 border border-teal-700"
			icon="fas fa-arrow-left"
			@click="backToCharacterList"
		/>

		<MoeCharacterImages />
		<MoeCharacterAttributes />
	</div>
</template>

<script setup lang="ts">
	const mainStore = useMainStore();
	const characterStore = useCharacterStore();

	const quickImages = ref(false);

	// onBeforeRouteUpdate(() => {
	// 	const characters = listStore.list.characters;
	// 	characterStore.unsavedCharacter = character;
	// 	if (!discarded.value && !characters.find((listCharacter) => listCharacter.id === character.id)) {
	// 		mainStore.modal = Modal.UNSAVED_CHANGES;
	// 	}
	// 	return true;
	// });

	// onBeforeRouteLeave(() => {
	// 	const characters = listStore.list.characters;
	// 	characterStore.unsavedCharacter = character;
	// 	if (!discarded.value && !characters.find((listCharacter) => listCharacter.id === character.id)) {
	// 		mainStore.modal = Modal.UNSAVED_CHANGES;
	// 	}
	// 	return true;
	// });

	async function quickImage(event: MouseEvent) {
		if (event.ctrlKey) {
			quickImages.value = !quickImages.value;
			return;
		}
		if (quickImages.value) {
			characterStore.addCharacterImage({ src: await navigator.clipboard.readText(), valid: true });
		}
	}

	async function backToCharacterList() {
		characterStore.resetCharacter();
		await mainStore.toList();
	}
</script>
