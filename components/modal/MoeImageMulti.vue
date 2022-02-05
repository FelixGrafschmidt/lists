<template>
	<form
		class="justify-end rounded-2xl bg-gray-800 text-gray-100 flex flex-col relative m-auto py-10 w-[40vw] items-center"
		@click.stop
		@submit.prevent="src !== '' ? addImages() : undefined"
	>
		<label>
			<span>Insert urls seperated by linebreaks</span>
			<textarea-autosize
				v-model="src"
				max-height="500"
				type="text"
				class="resize-none block rounded-lg border text-gray-900 bg-gray-300 focus:outline-none mb-8 w-80 scrollbar-thin scrollbar-track-rounded scrollbar-thumb-rounded scrollbar-track-gray-800 scrollbar-thumb-gray-500 overflow-y-scroll'"
			/>
		</label>
		<div class="h-[10%]">
			<MoeButton
				:class="{ 'cursor-not-allowed': src === '' }"
				class="mt-4 mx-auto bg-gray-500"
			>Add Images</MoeButton>
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
