<template>
	<div class="w-[50%] flex gap-3 items-center justify-end mr-4">
		<span>{{ collection.id }}</span>
		<div v-if="copied">
			<MoeButtonDark @click="copyID">Copied!</MoeButtonDark>
		</div>
		<MoeButtonDark v-else v-tooltip="'Copy ID'" icon="fas fa-copy" class="h-10 w-10" @click="copyID" />
		<MoeButtonDark
			v-tooltip="'Load Collection'"
			icon="fas fa-folder-open"
			class="h-10 w-10"
			@click="loadCollection"
		/>
		<MoeButtonDark
			v-tooltip="'Export Collection'"
			icon="fas fa-download"
			class="h-10 w-10"
			@click="exportCollection"
		/>
		<MoeButtonDark
			v-tooltip="'Unload Collection'"
			icon="fas fa-times"
			class="dark-hover:!bg-red-700 hover:!bg-red-500 !text-color-unset h-10 w-10"
			@click="unloadCollection"
		/>
	</div>
</template>

<script setup lang="ts">
import { saveAs } from "file-saver"
import { Modal } from "~~/models/enums/Modal";
let copied = false

const collectionStore = useCollectionStore()
const mainStore = useMainStore()

const collection = collectionStore.collection

function loadCollection() {
	mainStore.modal = Modal.LOADCOLLECTION
}
function copyID() {
	copied = true;
	window.setTimeout(() => {
		copied = false;
	}, 1000 * 2);
	navigator.clipboard.writeText(collection.id);
}

function exportCollection() {
	saveAs(new File([JSON.stringify(collection)], collection.id + ".json"));
}

function unloadCollection() {
	mainStore.modal = Modal.UNLOADCOLLECTION
}
</script>
