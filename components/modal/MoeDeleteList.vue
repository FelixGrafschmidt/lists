<template>
	<div class="relative grid m-auto rounded-2xl bg-gray-800 pb-10 text-gray-100" @click.stop>
		<div class="mt-12 px-16">
			Are you sure you want to delete your list {{ list.name }} with {{ list.characters.length }} characters?
		</div>
		<div class="m-auto flex pt-4">
			<MoeButton class="mr-8 bg-red-600 hover:bg-red-700" @click="deleteList(list.id)">Delete</MoeButton>
			<MoeButton class="bg-gray-500" @click="mainStore.modal = Modal.NONE">Cancel</MoeButton>
		</div>
		<div
			class="absolute right-1 top-1 h-6 w-6 flex cursor-pointer items-center justify-center rounded-2xl bg-red-600 text-gray-900 hover:bg-red-700"
			@click="mainStore.modal = Modal.NONE"
		>
			<div class="fas fa-times"></div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { Modal } from "@/models/enums/Modal";

	const mainStore = useStore();
	const collectionStore = useCollection();

	const list = collectionStore.listToDelete;

	function deleteList(id: string) {
		collectionStore.deleteList(id);
		mainStore.modal = Modal.NONE;
	}
</script>
