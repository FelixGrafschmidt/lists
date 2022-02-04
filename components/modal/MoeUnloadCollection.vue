<template>
	<div
		class="rounded-2xl dark:bg-gray-800 bg-gray-400 dark:text-gray-100 text-gray-900 grid relative m-auto pb-10"
		@click.stop
	>
		<div class="mt-12 px-16 w-[60vw]">
			Are you sure you eant to unload your collection from your browser? If you have saved the id you can later reload it.
			<br />
			ID: {{ collectionStore.collection.id }}
		</div>

		<div class="flex m-auto pt-4">
			<MoeButtonDark
				class="mr-8 !bg-red-400 dark:!bg-red-600 dark-hover:!bg-red-700 hover:!bg-red-500 !text-color-unset"
				@click="deleteCharacter"
			>Unload Collection</MoeButtonDark>
			<MoeButtonDark @click="mainStore.modal = Modal.NONE">Cancel</MoeButtonDark>
		</div>
		<div
			class="items-center justify-center top-1 right-1 flex dark:bg-red-600 bg-red-400 dark-hover:bg-red-700 hover:bg-red-500 dark:text-gray-900 text-gray-100 h-6 w-6 rounded-2xl cursor-pointer absolute"
			@click="mainStore.modal = Modal.NONE"
		>
			<div class="fas fa-times"></div>
		</div>
	</div>
</template>


<script setup lang="ts">
import { Modal } from "~~/models/enums/Modal";
import { newCollection } from "~~/models/interfaces/Collection";


const mainStore = useMainStore()
const collectionStore = useCollectionStore()

function deleteCharacter() {
	collectionStore.setCollection(newCollection());
	mainStore.modal = Modal.NONE
}

</script>
