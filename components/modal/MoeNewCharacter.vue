<template>
	<form
		class="relative m-auto max-h-[80vh] w-[40vw] flex flex-col items-center rounded-2xl bg-gray-800 pb-10 pt-5 text-gray-100"
		@click.stop
		@submit.prevent="name !== '' ? saveCharacter() : undefined"
	>
		<div class="py-2">
			<label>
				Name
				<input
					v-model="name"
					type="text"
					class="block h-8 w-full border rounded-lg bg-gray-300 px-1 text-gray-900 focus:outline-none"
				/>
			</label>
		</div>
		<div class="py-2">
			<label>
				Origin
				<input
					v-model="origin"
					type="text"
					class="block h-8 w-full border rounded-lg bg-gray-300 px-1 text-gray-900 focus:outline-none"
				/>
			</label>
		</div>
		<div class="m-auto flex gap-2 pt-4">
			<MoeButton :class="{ 'cursor-not-allowed': name === '' }" class="m-auto bg-gray-500 bg-green-600">Save Character</MoeButton>
			<MoeButton class="m-auto bg-gray-500 bg-red-600" @click.prevent="mainStore.modal = Modal.NONE">Discard Character</MoeButton>
		</div>
		<div
			class="absolute right-1 top-1 h-6 w-6 flex cursor-pointer items-center justify-center rounded-2xl bg-red-600 text-gray-900 hover:bg-red-700"
			@click="mainStore.modal = Modal.NONE"
		>
			<Icon name="fa:times-circle" class="h-4 w-4" />
		</div>
	</form>
</template>

<script setup lang="ts">
	import { newCharacter } from "@/models/interfaces/Character";
	import { Modal } from "@/models/enums/Modal";

	const name = ref("");
	const origin = ref("");

	const mainStore = useStore();
	const characterStore = useCharacter();
	const collectionStore = useCollection();
	const listStore = useList();

	async function saveCharacter() {
		const character = newCharacter(undefined, name.value, origin.value);
		listStore.addCharacter({ character, index: -1 });
		characterStore.setCharacter(character);
		mainStore.loading = true;
		try {
			await collectionStore.saveChanges();
			mainStore.modal = Modal.NONE;
		} catch (error) {
			console.error(error);
			mainStore.modal = Modal.SAVEERROR;
		} finally {
			mainStore.loading = false;
			mainStore.toCharacter();
		}
	}
</script>
