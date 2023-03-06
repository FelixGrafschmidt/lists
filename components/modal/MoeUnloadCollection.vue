<template>
	<div class="rounded-2xl bg-gray-800 text-gray-100 grid relative m-auto pb-10" @click.stop>
		<div class="mt-12 px-16 w-[60vw]">
			Are you sure you eant to unload your collection from your browser? If you have saved the id you can later reload it.
			<br />
			ID: {{ collectionStore.collection.id }}
		</div>

		<div class="flex m-auto pt-4">
			<MoeButton class="mr-8 bg-red-600 hover:bg-red-700" @click="deleteCharacter">Unload Collection</MoeButton>
			<MoeButton class="bg-gray-500" @click="mainStore.modal = Modal.NONE">Cancel</MoeButton>
		</div>
		<div
			class="items-center justify-center top-1 right-1 flex bg-red-600 hover:bg-red-700 text-gray-900 h-6 w-6 rounded-2xl cursor-pointer absolute"
			@click="mainStore.modal = Modal.NONE"
		>
			<div class="fas fa-times"></div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { Modal } from "~~/models/enums/Modal";
	import { newCollection } from "~~/models/interfaces/Collection";

	const mainStore = useMainStore();
	const collectionStore = useCollectionStore();

	function deleteCharacter() {
		collectionStore.setCollection(newCollection());
		mainStore.modal = Modal.NONE;
	}
</script>
