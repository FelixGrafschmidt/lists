<template>
	<div class="h-80vh w-1/2 flex flex-col items-center justify-between">
		<div class="h-85% flex justify-center">
			<figure class="h-full flex flex-col justify-center" :class="{ 'cursor-pointer': character.images.length > 0 }">
				<img
					:alt="character.name"
					:src="image.src || ''"
					class="m-auto max-h-full rounded"
					@load="image.src ? markValid(image) : null"
					@click="character.images.length > 0 ? openImage(image) : undefined"
				/>
			</figure>
		</div>
		<div class="h-3%">
			<div v-if="character.images.length > 0" class="cursor-pointer text-sm hover:text-teal" @click="toGallery">
				Show all ({{ character.images.length }})
			</div>
		</div>
		<div class="h-7% flex flex-row items-center justify-center gap-2">
			<MoeButton class="h-10 w-auto bg-gray-500" icon="fas fa-plus" @click="addNewImage"> Add Image </MoeButton>
			<MoeButton class="h-10 w-auto bg-gray-500" icon="fab fa-buffer" @click="addImageMulti"> Add Images </MoeButton>
			<MoeButton v-if="character.images.length > 0" class="h-10 w-auto bg-red-600" icon="fas fa-trash" @click="deleteImage">
				Delete this Image
			</MoeButton>
			<MoeButton v-if="character.images.length > 0" class="h-10 w-auto bg-red-600" icon="fas fa-trash" @click="deleteAllImages">
				Delete all Images
			</MoeButton>
			<MoeButton v-if="character.images.length > 0" class="h-10 w-auto bg-gray-500" icon="far fa-save" @click="exportImages">
				Export all Images
			</MoeButton>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import pkg from "file-saver";
	import { Modal } from "@/models/enums/Modal";
	import type { CharacterImage } from "@/models/interfaces/Character";
	import { newCharacterImage } from "@/models/interfaces/Character";
	const { saveAs } = pkg;

	const mainStore = useStore();
	const characterStore = useCharacter();

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
