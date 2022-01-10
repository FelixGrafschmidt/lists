<template>
	<div
		class="rounded-2xl dark:bg-gray-800 bg-gray-400 dark:text-gray-100 text-gray-900 grid relative m-auto pb-10"
		@click.stop
	>
		<div
			class="mt-12 px-16"
		>Are you sure you want to delete your list {{ list.name }} with {{ list.characters.length }} characters?</div>
		<div class="flex m-auto pt-4">
			<MoeButtonDark
				class="mr-8 !bg-red-400 dark:!bg-red-600 dark-hover:!bg-red-700 hover:!bg-red-500 !text-color-unset"
				@click="deleteList(list.id)"
			>Delete</MoeButtonDark>
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
import { useCollectionStore } from "~~/store/collection";
import { useMainStore } from "~~/store/main";
import { Modal } from "~~/models/enums/Modal";


const mainStore = useMainStore()
const collectionStore = useCollectionStore()

const list = collectionStore.listToDelete

function deleteList(id: string) {
	collectionStore.deleteList(id)
	mainStore.modal = Modal.NONE
}

</script>
