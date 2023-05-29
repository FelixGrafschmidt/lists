<template>
	<div class="flex my-6 justify-center gap-2">
		<MoeButton v-tooltip="'Add New Character'" icon="fas fa-user-plus" class="w-24 bg-gray-500" @click="addNewCharacter" />

		<MoeButton
			v-tooltip="'Add Attributes to all Characters'"
			icon="fas fa-folder-plus"
			class="w-24 bg-gray-500"
			@click="addListAttribute"
		/>
	</div>
</template>

<script setup lang="ts">
	import { Modal } from "~~/models/enums/Modal";

	const mainStore = useMainStore();

	function addNewCharacter() {
		mainStore.modal = Modal.NEW_CHARACTER;
	}

	function addListAttribute() {
		mainStore.modal = Modal.NEWATTRIBUTE;
	}
</script>
