<template>
	<div class="w-[50%] flex gap-3 items-center justify-end mr-4">
		<span>{{ collection.id }}</span>
		<div v-if="copied">
			<MoeButtonDark @click="copyID">Copied!</MoeButtonDark>
		</div>
		<MoeTooltip v-else text="Copy ID">
			<MoeButtonDark icon="fas fa-copy" class="h-10 w-10" @click="copyID" />
		</MoeTooltip>
		<MoeTooltip text="Load Collection">
			<MoeButtonDark icon="fas fa-folder-open" class="h-10 w-10" @click="loadCollection" />
		</MoeTooltip>
		<MoeTooltip text="Export Collection">
			<MoeButtonDark icon="fas fa-download" class="h-10 w-10" @click="exportCollection" />
		</MoeTooltip>
		<MoeTooltip text="Unload Collection" extra-classes="mr-16" class>
			<MoeButtonDark
				icon="fas fa-times"
				class="dark-hover:!bg-red-700 hover:!bg-red-500 !text-color-unset h-10 w-10"
				@click="unloadCollection"
			/>
		</MoeTooltip>
	</div>
</template>

<script setup lang="ts">
import { saveAs } from "file-saver"
import { Modal } from "~~/models/enums/Modal";
import { useCollectionStore } from "~~/store/collection";
import { useMainStore } from "~~/store/main";
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
