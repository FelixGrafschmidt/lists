<template>
	<div class="flex mt-7 justify-center mb-20 gap-2">
		<MoeButton
			v-tooltip="'Create New List'"
			@click="addNewList"
			icon="fas fa-plus"
			class="w-24 bg-gray-500"
		/>
		<MoeButton
			v-tooltip="'Import List'"
			@click="importFromFile"
			icon="fas fa-file-import"
			class="w-24 bg-gray-500"
		/>
	</div>
</template>

<script setup lang="ts">
import { Modal } from "~/models/enums/Modal";

const mainStore = useMainStore()

function importFromFile(): void {
	mainStore.modal = Modal.IMPORTLIST;
}

function addNewList() {
	mainStore.modal = Modal.NEWLIST;
}

</script>
