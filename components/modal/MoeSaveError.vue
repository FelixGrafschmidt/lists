<template>
	<div class="relative m-auto flex rounded-2xl bg-gray-800 pb-10 text-gray-100" @click.stop>
		<MoeSVG :name="'error'" alt="error" class="ml-10 mt-10 h-16 w-16" />
		<div class="mx-12">
			<div class="mt-16 flex flex-col text-xl">
				<span>An error has occurred while saving your changes.</span>
				<span>Your changes have NOT been saved!</span>
			</div>
			<div class="mt-8">
				<MoeButton class="bg-gray-500" @click="saveChanges">Try again</MoeButton>
				<MoeButton class="bg-gray-500" @click="exportData">Export your data</MoeButton>
				<MoeButton class="bg-gray-500" @click="contactUs">Contact us</MoeButton>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import pkg from "file-saver";
	import { Modal } from "~~/models/enums/Modal";
	const { saveAs } = pkg;

	const mainStore = useMainStore();
	const collectionStore = useCollectionStore();

	function contactUs() {
		mainStore.modal = Modal.CONTACTUS;
	}

	function saveChanges(): Promise<void> {
		mainStore.loading = true;
		return collectionStore
			.saveChanges()
			.then(() => {
				mainStore.modal = Modal.NONE;
			})
			.catch(() => {
				mainStore.modal = Modal.SAVEERROR;
			})
			.finally(() => {
				mainStore.loading = false;
			});
	}

	function exportData() {
		saveAs(new File([JSON.stringify(collectionStore.collection)], collectionStore.collection.id + ".json"));
	}
</script>
