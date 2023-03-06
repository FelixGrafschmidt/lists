<template>
	<form
		class="justify-end rounded-2xl bg-gray-800 text-gray-100 flex flex-col relative m-auto py-10 h-[80vh] w-[40vw] items-center"
		@click.stop
		@submit.prevent="src !== '' ? addImage() : undefined"
	>
		<figure v-if="src" class="h-[80%] max-h-[80%]">
			<img :src="src" alt="Invalid image url" class="max-h-full" @load="valid = true" @error="valid = false" />
		</figure>
		<label class="h-[10%]">
			<span>Image URL</span>
			<input
				:value="src"
				type="text"
				class="block rounded-lg border text-gray-900 bg-gray-300 focus:outline-none h-8 mb-8 w-80"
				@blur="updateUrl"
			/>
		</label>
		<p v-if="!valid" class="text-red-600">Invalid image url</p>
		<div class="h-[10%]">
			<MoeButton :class="{ 'cursor-not-allowed': src === '' }" class="mt-4 mx-auto bg-gray-500">Add Image</MoeButton>
		</div>
		<div
			class="items-center justify-center top-1 right-1 flex bg-red-600 hover:bg-red-700 text-gray-900 h-6 w-6 rounded-2xl cursor-pointer absolute"
			@click="mainStore.modal = Modal.NONE"
		>
			<div class="fas fa-times"></div>
		</div>
	</form>
</template>

<script setup lang="ts">
	import { Modal } from "~~/models/enums/Modal";

	const src = ref("");
	const valid = ref(true);

	const mainStore = useMainStore();
	const characterStore = useCharacterStore();

	function updateUrl(event: Event) {
		const value = (event.target as HTMLInputElement).value;
		if (value.startsWith("data:")) {
			valid.value = false;
			src.value = "";
		} else {
			src.value = value;
			valid.value = false;
		}
	}

	function addImage() {
		characterStore.addCharacterImage({ src: src.value, valid: valid.value });
		mainStore.modal = Modal.NONE;
	}
</script>
