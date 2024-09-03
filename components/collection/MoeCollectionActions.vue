<template>
	<div class="mb-20 mt-7 flex justify-center gap-2">
		<MoeButton v-tooltip="'Create New List'" icon="fa:plus" class="w-24 bg-gray-500" @click="addNewList" />
		<MoeButton v-tooltip="'Import List'" icon="fa:file" class="w-24 bg-gray-500" @click="importFromFile" />
	</div>
</template>

<script setup lang="ts">
	import { Modal } from "~/models/enums/Modal";

	const mainStore = useStore();

	function importFromFile(): void {
		mainStore.modal = Modal.IMPORTLIST;
	}

	function addNewList() {
		mainStore.modal = Modal.NEWLIST;
	}
</script>
