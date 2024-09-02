<template>
	<form
		class="relative m-auto w-[40vw] flex flex-col items-center justify-end rounded-2xl bg-gray-800 py-10 text-gray-100"
		@click.stop
		@submit.prevent="src !== '' ? addImages() : undefined"
	>
		<label>
			<span>Insert urls seperated by linebreaks</span>
			<textarea
				v-model="src"
				max-height="500"
				type="text"
				class="overflow-y-scroll' mb-8 block w-80 resize-none border rounded-lg bg-gray-300 text-gray-900 scrollbar-thumb-color-gray-9 scrollbar-track-color-gray-500 scrollbar-radius-2 scrollbar-thumb-radius-4 scrollbar-track-radius-4 scrollbar-w-2 focus:outline-none scrollbar scrollbar-rounded"
			/>
		</label>
		<div class="h-[10%]">
			<MoeButton :class="{ 'cursor-not-allowed': src === '' }" class="mx-auto mt-4 bg-gray-500">Add Images</MoeButton>
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
	import { Modal } from "@/models/enums/Modal";

	const src = ref("");

	const mainStore = useStore();
	const characterStore = useCharacter();

	function addImages() {
		src.value.split("\n").forEach((url) => {
			if (characterStore.character.images.filter((img) => img.src === url).length > 0) {
				return;
			}
			characterStore.addCharacterImage({ src: url, valid: true });
		});
		mainStore.modal = Modal.NONE;
	}
</script>
