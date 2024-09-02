<template>
	<form
		class="relative m-auto h-[80vh] w-[40vw] flex flex-col items-center justify-end rounded-2xl bg-gray-800 py-10 text-gray-100"
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
				class="mb-8 block h-8 w-80 border rounded-lg bg-gray-300 text-gray-900 focus:outline-none"
				@blur="updateUrl"
			/>
		</label>
		<p v-if="!valid" class="text-red-600">Invalid image url</p>
		<div class="h-[10%]">
			<MoeButton :class="{ 'cursor-not-allowed': src === '' }" class="mx-auto mt-4 bg-gray-500">Add Image</MoeButton>
		</div>
		<div
			class="absolute right-1 top-1 h-6 w-6 flex cursor-pointer items-center justify-center rounded-2xl bg-red-600 text-gray-900 hover:bg-red-700"
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
