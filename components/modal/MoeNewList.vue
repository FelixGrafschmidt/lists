<template>
	<form
		class="rounded-2xl bg-gray-800 text-gray-100 flex flex-col relative m-auto pb-10 pt-5 max-h-[80vh] w-[40vw] items-center"
		@click.stop
		@submit.prevent="name !== '' ? addList() : undefined"
	>
		<label class="mx-12">
			<span>Type a name for your new list.</span>
			<input v-model="name" type="text" class="block rounded-lg border text-gray-900 bg-gray-300 focus:outline-none mb-8 w-80" />
		</label>
		<MoeButton :class="{ 'cursor-not-allowed': name === '' }" class="m-auto bg-gray-500">Add List</MoeButton>
		<div
			class="items-center justify-center top-1 right-1 flex bg-red-600 hover:bg-red-700 text-gray-900 h-6 w-6 rounded-2xl cursor-pointer absolute"
			@click="mainStore.modal = Modal.NONE"
		>
			<div class="fas fa-times"></div>
		</div>
	</form>
</template>

<script setup lang="ts">
	import { List, newList } from "~~/models/interfaces/List";
	import { Modal } from "~~/models/enums/Modal";

	const name = ref("");

	const mainStore = useMainStore();
	const collectionStore = useCollectionStore();
	const listStore = useListStore();

	function openList(list: List) {
		listStore.setList(list);
		mainStore.toList();
	}

	function addList() {
		collectionStore.addListToCollection(newList(undefined, name.value));
		if (collectionStore.collection.lists.length === 1) {
			openList(collectionStore.collection.lists[0]);
		} else {
			mainStore.modal = Modal.NONE;
		}
	}
</script>
