<template>
	<form
		class="rounded-2xl bg-gray-800 text-gray-100 flex flex-col relative m-auto pb-10 pt-5 max-h-[80vh] w-[40vw] items-center"
		@click.stop
		@submit.prevent="name !== '' ? saveCharacter() : undefined"
	>
		<div class="py-2">
			<label>
				Name
				<input
					v-model="name"
					type="text"
					class="block px-1 rounded-lg border text-gray-900 bg-gray-300 focus:outline-none h-8 w-full"
				/>
			</label>
		</div>
		<div class="py-2">
			<label>
				Origin
				<input
					v-model="origin"
					type="text"
					class="block px-1 rounded-lg border text-gray-900 bg-gray-300 focus:outline-none h-8 w-full"
				/>
			</label>
		</div>
		<div class="flex m-auto pt-4 gap-2">
			<MoeButton :class="{ 'cursor-not-allowed': name === '' }" class="m-auto bg-green-600 bg-gray-500">Save Character</MoeButton>
			<MoeButton class="m-auto bg-red-600 bg-gray-500" @click.prevent="mainStore.modal = Modal.NONE">Discard Character</MoeButton>
		</div>
		<div
			class="items-center justify-center top-1 right-1 flex bg-red-600 hover:bg-red-700 text-gray-900 h-6 w-6 rounded-2xl cursor-pointer absolute"
			@click="mainStore.modal = Modal.NONE"
		>
			<div class="fas fa-times"></div>
		</div>
	</form>
</template>

<script setup lang="ts">
	import { newCharacter } from "~~/models/interfaces/Character";
	import { Modal } from "~~/models/enums/Modal";

	const name = ref("");
	const origin = ref("");

	const mainStore = useMainStore();
	const collectionStore = useCollectionStore();
	const listStore = useListStore();

	async function saveCharacter() {
		const character = newCharacter(undefined, name.value, origin.value);
		listStore.addCharacter({ character, index: -1 });
		useCharacterStore().setCharacter(character);
		mainStore.loading = true;
		try {
			await collectionStore.saveChanges();
			mainStore.modal = Modal.NONE;
		} catch (error) {
			mainStore.modal = Modal.SAVEERROR;
		} finally {
			mainStore.loading = false;
			mainStore.toCharacter();
		}
	}
</script>
