<template>
	<div class="relative flex flex-row justify-center gap-2 gap-4 p-6" @click="quickImage">
		<MoeButton
			v-tooltip="'Back to Character List'"
			class="absolute left-6 top-6 h-8 w-8 border border-teal-700 rounded-none rounded-br-1 -ml-6 -mt-6 !p-0"
			icon="fa:arrow-left"
			@click="backToCharacterList"
		/>

		<MoeCharacterImages />
		<MoeCharacterAttributes />
	</div>
</template>

<script setup lang="ts">
	const mainStore = useStore();
	const characterStore = useCharacter();

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
