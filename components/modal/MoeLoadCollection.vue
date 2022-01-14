<template>
	<form
		class="rounded-2xl dark:bg-gray-800 bg-gray-400 dark:text-gray-100 text-gray-900 flex flex-col relative m-auto pb-10 sm:pt-5 items-center sm:max-h-[80vh] sm:w-[40vw]"
		@submit.prevent="id !== '' ? loadCollection() : undefined"
		@click.stop
	>
		<label class="mx-12 mt-8">
			<span class="ml-2">Paste collection id below.</span>
			<input
				v-model="id"
				v-autofocus
				type="text"
				class="block rounded-lg border text-gray-900 bg-gray-300 focus:outline-none h-8 mb-8 mt-2 mx-2 sm:w-80"
			/>
		</label>

		<MoeButtonDark :class="{ 'cursor-not-allowed': id === '' }" class="m-auto">Load Collection</MoeButtonDark>
		<div
			class="items-center justify-center top-1 right-1 flex dark:bg-red-600 bg-red-400 dark-hover:bg-red-700 hover:bg-red-500 dark:text-gray-900 text-gray-100 h-6 w-6 rounded-2xl cursor-pointer absolute"
			@click="mainStore.modal = Modal.NONE"
		>
			<div class="fas fa-times"></div>
		</div>
	</form>
</template>


<script setup lang="ts">import { Modal } from "~~/models/enums/Modal";
import { useCollectionStore } from "~~/store/collection";
import { useMainStore } from "~~/store/main";


const id = ref("")

const mainStore = useMainStore()
const collectionStore = useCollectionStore()

function loadCollection() {
	window.localStorage.setItem("collectionId", id.value);
	collectionStore.loadCollection();
	mainStore.modal = Modal.NONE
}

</script>
