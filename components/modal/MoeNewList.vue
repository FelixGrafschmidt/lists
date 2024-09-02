<template>
	<form
		class="relative m-auto max-h-[80vh] w-[40vw] flex flex-col items-center rounded-2xl bg-gray-800 pb-10 pt-5 text-gray-100"
		@click.stop
		@submit.prevent="name !== '' ? addList() : undefined"
	>
		<label class="mx-12">
			<span>Type a name for your new list.</span>
			<input v-model="name" type="text" class="mb-8 block w-80 border rounded-lg bg-gray-300 px-2 text-gray-900 focus:outline-none" />
		</label>
		<MoeButton :class="{ 'cursor-not-allowed': name === '' }" class="m-auto bg-gray-500">Add List</MoeButton>
		<div
			class="absolute right-1 top-1 h-6 w-6 flex cursor-pointer items-center justify-center rounded-2xl bg-red-600 text-gray-900 hover:bg-red-700"
			@click="mainStore.modal = Modal.NONE"
		>
			<div class="fas fa-times"></div>
		</div>
	</form>
</template>

<script setup lang="ts">
	import type { List } from "@/models/interfaces/List";
	import { newList } from "@/models/interfaces/List";
	import { Modal } from "@/models/enums/Modal";

	const name = ref("");

	const mainStore = useStore();
	const collectionStore = useCollection();
	const listStore = useList();

	async function openList(list: List) {
		listStore.setList(list);
		await mainStore.toList();
	}

	function addList() {
		collectionStore.addListToCollection(newList(undefined, name.value));
		if (collectionStore.collection.lists.length >= 1) {
			openList(collectionStore.collection.lists.at(-1)!);
		}
		mainStore.modal = Modal.NONE;
	}
</script>
