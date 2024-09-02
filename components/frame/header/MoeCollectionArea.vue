<template>
	<div class="mr-4 w-[50%] flex items-center justify-end gap-3">
		<span>{{ collection.id }}</span>
		<MoeButton v-tooltip="'Copy ID'" icon="fas fa-copy" class="h-10 w-10 bg-gray-500" @click="copyID" />
		<MoeButton v-tooltip="'Load Collection'" icon="fas fa-folder-open" class="h-10 w-10 bg-gray-500" @click="loadCollection" />
		<MoeButton v-tooltip="'Export Collection'" icon="fas fa-download" class="h-10 w-10 bg-gray-500" @click="exportCollection" />
		<MoeButton
			v-tooltip="'Unload Collection'"
			icon="fas fa-times"
			class="h-10 w-10 bg-gray-500 hover:bg-red-700"
			@click="unloadCollection"
		/>
	</div>
</template>

<script setup lang="ts">
	import pkg from "file-saver";
	import { Modal } from "~~/models/enums/Modal";
	const { saveAs } = pkg;

	const collectionStore = useCollectionStore();
	const mainStore = useMainStore();

	const collection = computed(() => collectionStore.collection);

	function loadCollection() {
		mainStore.modal = Modal.LOADCOLLECTION;
	}
	function copyID() {
		useClipboard({ source: collection.value.id }).copy();
	}

	function exportCollection() {
		saveAs(new File([JSON.stringify(collection)], collection.value.id + ".json"));
	}

	function unloadCollection() {
		mainStore.modal = Modal.UNLOADCOLLECTION;
	}
</script>
