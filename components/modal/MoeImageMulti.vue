<template>
	<form
		class="justify-end rounded-2xl dark:bg-gray-800 bg-gray-400 dark:text-gray-100 text-gray-900 flex flex-col relative m-auto py-10 w-[40vw] items-center"
		@click.stop
		@submit.prevent="src !== '' ? addImages() : undefined"
	>
		<label>
			<span>Insert urls seperated by linebreaks</span>
			<textarea-autosize
				v-model="src"
				v-autofocus
				max-height="500"
				type="text"
				class="resize-none block rounded-lg border text-gray-900 bg-gray-300 focus:outline-none mb-8 w-80 scrollbar-thin scrollbar-track-rounded scrollbar-thumb-rounded scrollbar-track-gray-300 scrollbar-thumb-gray-500 dark:scrollbar-track-gray-800 dark:scrollbar-thumb-gray-500 overflow-y-scroll'"
			/>
		</label>
		<div class="h-[10%]">
			<MoeButtonDark :class="{ 'cursor-not-allowed': src === '' }" class="mt-4 mx-auto">Add Images</MoeButtonDark>
		</div>
		<div
			class="items-center justify-center top-1 right-1 flex dark:bg-red-600 bg-red-400 dark-hover:bg-red-700 hover:bg-red-500 dark:text-gray-900 text-gray-100 h-6 w-6 rounded-2xl cursor-pointer absolute"
			@click="mainStore.modal = Modal.NONE"
		>
			<div class="fas fa-times"></div>
		</div>
	</form>
</template>


<script setup lang="ts">import { Modal } from "~~/models/enums/Modal";
import { useCharacterStore } from "~~/store/character";
import { useMainStore } from "~~/store/main";


const src = ref("")

const mainStore = useMainStore()
const characterStore = useCharacterStore()

function addImages() {
	src.value.split("\n").forEach((url) => {
		if (characterStore.character.images.filter((img) => img.src === url).length > 0) {
			return;
		}
		characterStore.addCharacterImage({ src: url, valid: true });
	});
	mainStore.modal = Modal.NONE
}

</script>
