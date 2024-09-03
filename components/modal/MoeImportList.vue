<template>
	<form
		class="relative m-auto max-h-[80vh] w-[40vw] flex flex-col items-center rounded-2xl bg-gray-800 pb-10 pt-5 text-gray-100"
		@click.stop
		@submit.prevent="json !== '' ? importList() : undefined"
	>
		<label class="mx-12">
			<span>Paste the content of your exported list below.</span>
			<textarea
				type="text"
				class="mb-8 block w-80 border rounded-lg bg-gray-300 text-gray-900 focus:outline-none"
				@input="parseJSONInput"
			/>
		</label>
		<p v-if="json !== '' && !valid" class="text-red-600">Invalid file</p>
		<MoeButton :class="{ 'cursor-not-allowed': json === '' || valid === undefined }" class="m-auto bg-gray-500">Import List</MoeButton>
		<div
			class="absolute right-1 top-1 h-6 w-6 flex cursor-pointer items-center justify-center rounded-2xl bg-red-600 text-gray-900 hover:bg-red-700"
			@click="mainStore.modal = Modal.NONE"
		>
			<Icon name="fa:times-circle" class="h-4 w-4" />
		</div>
	</form>
</template>

<script setup lang="ts">
	import { nanoid } from "nanoid";
	import { newList } from "~/models/interfaces/List";
	import { Modal } from "@/models/enums/Modal";

	const json = ref("");
	const valid: Ref<undefined | boolean> = ref(undefined);

	let list = newList();

	const mainStore = useStore();
	const collectionStore = useCollection();

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
