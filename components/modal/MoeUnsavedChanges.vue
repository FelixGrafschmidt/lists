<template>
	<div class="relative grid m-auto rounded-2xl bg-gray-800 pb-10 text-gray-100" @click.stop>
		<div class="mt-12 px-16">You will lose your changes on {{ character.name }}. Are you sure?</div>
		<div class="m-auto flex pt-4">
			<MoeButton class="mr-8 bg-green-600" @click="saveChanges">Save Changes</MoeButton>
			<MoeButton class="bg-red-600" @click="mainStore.modal = Modal.NONE">Discard Changes</MoeButton>
		</div>
		<div
			class="absolute right-1 top-1 h-6 w-6 flex cursor-pointer items-center justify-center rounded-2xl bg-red-600 text-gray-900 hover:bg-red-700"
			@click="mainStore.modal = Modal.NONE"
		>
			<div class="fas fa-times"></div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { Modal } from "@/models/enums/Modal";

	const mainStore = useStore();
	const collectionStore = useCollection();
	const listStore = useList();
	const characterStore = useCharacter();

	const character = characterStore.unsavedCharacter;

	async function saveChanges() {
		mainStore.loading = true;
		try {
			await collectionStore.saveChanges();
			mainStore.modal = Modal.NONE;
		} catch (error) {
			console.error(error);
			mainStore.modal = Modal.SAVEERROR;
		} finally {
			mainStore.loading = false;
		}
		listStore.addCharacter({ character, index: -1 });
		mainStore.modal = Modal.NONE;
	}
</script>
