<template>
	<div class="flex flex-col items-center w-1/2 justify-between h-80vh">
		<div class="h-85% justify-center flex">
			<figure class="flex flex-col justify-center h-full" :class="{ 'cursor-pointer': character.images.length > 0 }">
				<img
					:alt="character.name"
					:src="image.src || ''"
					class="rounded max-h-full m-auto"
					@load="image.src ? markValid(image) : null"
					@click="character.images.length > 0 ? openImage(image) : undefined"
				/>
			</figure>
		</div>
		<div class="h-3%">
			<div v-if="character.images.length > 0" class="hover:text-teal cursor-pointer text-sm" @click="toGallery">
				Show all ({{ character.images.length }})
			</div>
		</div>
		<div class="flex flex-row gap-2 justify-center items-center h-7%">
			<MoeButton class="bg-gray-500 w-auto h-10" icon="fas fa-plus" @click="addNewImage"> Add Image </MoeButton>
			<MoeButton class="bg-gray-500 w-auto h-10" icon="fab fa-buffer" @click="addImageMulti"> Add Images </MoeButton>
			<MoeButton v-if="character.images.length > 0" class="bg-red-600 w-auto h-10" icon="fas fa-trash" @click="deleteImage">
				Delete this Image
			</MoeButton>
			<MoeButton v-if="character.images.length > 0" class="bg-red-600 w-auto h-10" icon="fas fa-trash" @click="deleteAllImages">
				Delete all Images
			</MoeButton>
			<MoeButton v-if="character.images.length > 0" class="bg-gray-500 w-auto h-10" icon="far fa-save" @click="exportImages">
				Export all Images
			</MoeButton>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import pkg from "file-saver";
	import { Modal } from "~~/models/enums/Modal";
	import { CharacterImage, newCharacterImage } from "~~/models/interfaces/Character";
	const { saveAs } = pkg;

	const mainStore = useMainStore();
	const characterStore = useCharacterStore();

	const character = characterStore.character;

	const image = ref(getMainImage());

	function getMainImage() {
		return (
			character.images.find((image) => {
				return image.main;
			}) || newCharacterImage()
		);
	}

	function addNewImage() {
		mainStore.modal = Modal.NEWIMAGE;
	}

	function addImageMulti() {
		mainStore.modal = Modal.IMAGEMULTI;
	}

	function markValid(image: CharacterImage) {
		image.valid = true;
	}

	function deleteAllImages() {
		character.images = [];
		image.value = newCharacterImage();
	}

	function deleteImage() {
		const index = character.images.indexOf(image.value);
		characterStore.removeCharacterImage(index);
		image.value = getMainImage();
	}

	function openImage(image: CharacterImage) {
		window.scroll(0, 0);
		characterStore.setActiveImage(image);
		mainStore.modal = Modal.FULLSCREENIMG;
	}

	function exportImages() {
		let imageSources = "";
		character.images.forEach((image) => {
			imageSources += image.src + "\n";
		});
		saveAs(new File([imageSources], character.name + "_images.txt"));
	}

	async function toGallery() {
		await mainStore.toCharacterGallery();
	}

	watch(
		character.images,
		() => {
			if (character.images.length === 1) {
				image.value = getMainImage();
			}
			// calculateThumbsScrolling();
		},
		{ deep: true }
	);
</script>
