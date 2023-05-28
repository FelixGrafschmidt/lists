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
	import { newCharacter } from "~~/models/interfaces/Character";

	const mainStore = useMainStore();
	const characterStore = useCharacterStore();

	async function addNewCharacter() {
		characterStore.setCharacter(newCharacter());
		await mainStore.toCharacter();
	}

	function addListAttribute() {
		mainStore.modal = Modal.NEWATTRIBUTE;
	}
</script>
