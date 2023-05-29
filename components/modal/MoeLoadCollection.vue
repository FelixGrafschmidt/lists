<template>
	<form
		class="rounded-2xl bg-gray-800 text-gray-100 0 flex flex-col relative m-auto pb-10 sm:pt-5 items-center sm:max-h-[80vh] sm:w-[40vw]"
		@submit.prevent="id !== '' ? loadCollection() : undefined"
		@click.stop
	>
		<label class="mx-12 mt-8">
			<span class="ml-2">Paste collection id below.</span>
			<input
				v-model="id"
				type="text"
				class="block rounded-lg border text-gray-900 bg-gray-300 focus:outline-none h-8 mb-8 mt-2 mx-2 sm:w-80"
			/>
		</label>

		<MoeButton :class="{ 'cursor-not-allowed': id === '' }" class="m-auto bg-gray-500">Load Collection</MoeButton>
		<div
			class="items-center justify-center top-1 right-1 flex bg-red-600 hover:bg-red-700 text-gray-900h-6 w-6 rounded-2xl cursor-pointer absolute"
			@click="mainStore.modal = Modal.NONE"
		>
			<div class="fas fa-times"></div>
		</div>
	</form>
</template>

<script setup lang="ts">
	import { Modal } from "~~/models/enums/Modal";

	const id = ref("");

	const mainStore = useMainStore();
	const collectionStore = useCollectionStore();

	function loadCollection() {
		collectionStore.loadCollection(id.value);
		mainStore.modal = Modal.NONE;
	}
</script>
