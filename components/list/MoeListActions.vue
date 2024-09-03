<template>
	<div class="flex justify-center gap-2">
		<MoeButton v-tooltip="'Open Gallery'" icon="fa:image" class="w-24 bg-gray-500" @click="mainStore.toListGallery" />
		<MoeButton v-tooltip="'Add New Character'" icon="fa:user-plus" class="w-24 bg-gray-500" @click="addNewCharacter" />

		<MoeButton
			v-tooltip="'Add Attributes to all Characters'"
			icon="fa:user-circle"
			class="w-24 bg-gray-500"
			@click="addListAttribute"
		/>
	</div>
</template>

<script setup lang="ts">
	import { Modal } from "@/models/enums/Modal";

	const mainStore = useStore();

	function addNewCharacter() {
		mainStore.modal = Modal.NEW_CHARACTER;
	}

	function addListAttribute() {
		mainStore.modal = Modal.NEWATTRIBUTE;
	}
</script>
