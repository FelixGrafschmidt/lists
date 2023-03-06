<template>
	<form
		class="rounded-2xl bg-gray-800 text-gray-100 flex flex-col relative m-auto pb-10 pt-5 max-h-[80vh] w-[40vw] items-center"
		@click.stop
		@submit.prevent="json !== '' ? importList() : undefined"
	>
		<label class="mx-12">
			<span>Paste the content of your exported list below.</span>
			<textarea
				type="text"
				class="block rounded-lg border text-gray-900 bg-gray-300 focus:outline-none mb-8 w-80"
				@input="parseJSONInput"
			/>
		</label>
		<p v-if="json !== '' && !valid" class="text-red-600">Invalid file</p>
		<MoeButton :class="{ 'cursor-not-allowed': json === '' || valid === undefined }" class="m-auto bg-gray-500">Import List</MoeButton>
		<div
			class="items-center justify-center top-1 right-1 flex bg-red-600 hover:bg-red-700 text-gray-900 h-6 w-6 rounded-2xl cursor-pointer absolute"
			@click="mainStore.modal = Modal.NONE"
		>
			<div class="fas fa-times"></div>
		</div>
	</form>
</template>

<script setup lang="ts">
	import { nanoid } from "nanoid";
	import { newList } from "~/models/interfaces/List";
	import { Modal } from "~~/models/enums/Modal";

	const json = ref("");
	const valid: Ref<undefined | boolean> = ref(undefined);

	let list = newList();

	const mainStore = useMainStore();
	const collectionStore = useCollectionStore();

	function importList() {
		list.characters.forEach((character) => {
			if (!character.images) {
				character.images = [];
			}
		});
		if (list.characters.length > 500) {
			window.alert("Too many characters!");
			return;
		}
		if (!list.id.match(/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/)) {
			list.id = nanoid();
		}
		const oldList = collectionStore.collection.lists.filter((listInStore) => list.id === listInStore.id)[0];
		if (oldList) {
			if (
				!window.confirm(
					`A list with this id already exists. It contains ${oldList.characters.length} characters. Do you want to override this list?`
				)
			) {
				return;
			} else {
				collectionStore.removeListFromCollection(list.id);
			}
		}
		collectionStore.addListToCollection(list);
		mainStore.modal = Modal.NONE;
	}

	function parseJSONInput(event: Event) {
		try {
			json.value = (event.target as HTMLInputElement).value;
			list = JSON.parse(json.value);
			list.characters.forEach((character) => {
				if (!character.id) {
					character.id = nanoid();
				}
				if (!character.created) {
					character.created = new Date();
				}
			});
			valid.value = true;
		} catch (error) {
			console.error(error);

			valid.value = false;
		}
	}
</script>
