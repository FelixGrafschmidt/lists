<template>
	<form
		class="0 relative m-auto flex flex-col items-center rounded-2xl bg-gray-800 pb-10 text-gray-100 sm:max-h-[80vh] sm:w-[40vw] sm:pt-5"
		@submit.prevent="id !== '' ? loadCollection() : undefined"
		@click.stop
	>
		<label class="mx-12 mt-8">
			<span class="ml-2">Paste collection id below.</span>
			<input
				v-model="id"
				type="text"
				class="mx-2 mb-8 mt-2 block h-8 border rounded-lg bg-gray-300 text-gray-900 sm:w-80 focus:outline-none"
			/>
		</label>

		<MoeButton :class="{ 'cursor-not-allowed': id === '' }" class="m-auto bg-gray-500">Load Collection</MoeButton>
		<div
			class="text-gray-900h-6 absolute right-1 top-1 w-6 flex cursor-pointer items-center justify-center rounded-2xl bg-red-600 hover:bg-red-700"
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
