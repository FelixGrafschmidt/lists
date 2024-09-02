<template>
	<div class="relative grid m-auto rounded-2xl bg-gray-800 pb-10 text-gray-100" @click.stop>
		<div class="mt-12 w-[60vw] px-16">
			Are you sure you eant to unload your collection from your browser? If you have saved the id you can later reload it.
			<br />
			ID: {{ collectionStore.collection.id }}
		</div>

		<div class="m-auto flex pt-4">
			<MoeButton class="mr-8 bg-red-600 hover:bg-red-700" @click="deleteCharacter">Unload Collection</MoeButton>
			<MoeButton class="bg-gray-500" @click="mainStore.modal = Modal.NONE">Cancel</MoeButton>
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
	import { Modal } from "~~/models/enums/Modal";
	import { newCollection } from "~~/models/interfaces/Collection";

	const mainStore = useMainStore();
	const collectionStore = useCollectionStore();

	function deleteCharacter() {
		collectionStore.setCollection(newCollection());
		mainStore.modal = Modal.NONE;
	}
</script>
