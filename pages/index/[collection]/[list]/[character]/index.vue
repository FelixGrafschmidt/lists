<template>
	<div class="flex flex-row gap-4 p-6" @click="quickImage">
		<MoeButton
			v-tooltip="'Back to Character List'"
			class="h-8 w-8 -mt-6 -ml-6 rounded-none rounded-br-1 !p-0 border border-teal-700"
			icon="fas fa-arrow-left"
			@click="backToCharacterList"
		/>

		<MoeCharacterImages />
		<MoeCharacterAttributes @discard="discardCharacter" />
	</div>
</template>

<script setup lang="ts">
	import { Modal } from "~/models/enums/Modal";
	const mainStore = useMainStore();
	const listStore = useListStore();
	const characterStore = useCharacterStore();
	const character = characterStore.character;

	const discarded = ref(false);

	const quickImages = ref(false);

	onBeforeRouteUpdate(() => {
		const characters = listStore.list.characters;
		if (!discarded && !characters.find((listCharacter) => listCharacter.id === character.id)) {
			mainStore.modal = Modal.UNSAVED_CHANGES;
			return false;
		}
	});

	onBeforeRouteLeave(() => {
		const characters = listStore.list.characters;
		if (!discarded && !characters.find((listCharacter) => listCharacter.id === character.id)) {
			mainStore.modal = Modal.UNSAVED_CHANGES;
			return false;
		}
	});

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

	async function discardCharacter() {
		characterStore.resetCharacter();
		discarded.value = true;
		await backToCharacterList();
	}
</script>
