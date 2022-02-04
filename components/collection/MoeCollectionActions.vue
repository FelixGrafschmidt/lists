<template>
	<div class="flex mt-7 justify-center mb-20 gap-2">
		<MoeButtonDark
			v-tooltip="'Create New List'"
			@click.native="addNewList"
			icon="fas fa-plus"
			class="w-24"
		/>
		<MoeButtonDark
			v-tooltip="'Import List'"
			@click.native="importFromFile"
			icon="fas fa-file-import"
			class="w-24"
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
