<template>
	<div class="flex flex-col items-center w-1/2 justify-between h-[80vh] gap-3">
		<div class="h-[95%] justify-center flex">
			<figure class="flex flex-col justify-center">
				<img
					:alt="character.name"
					:src="image.src || ''"
					class="rounded max-h-full m-auto"
					@load="image.src ? markValid(image) : null"
				/>
			</figure>
		</div>
		<div class="flex gap-4 items-center justify-self-end h-[5%]">
			<MoeButton class="bg-gray-500 w-auto h-10" icon="fas fa-plus" @click="addNewImage"> Add Image </MoeButton>
			<MoeButton class="bg-gray-500 w-auto h-10" icon="fab fa-buffer" @click="addImageMulti"> Add Images </MoeButton>
			<MoeButton class="bg-red-600 w-auto h-10" icon="fas fa-trash" @click="deleteImage"> Delete this Image </MoeButton>
			<MoeButton class="bg-red-600 w-auto h-10" icon="fas fa-trash" @click="deleteAllImages"> Delete all Images </MoeButton>
			<MoeButton class="bg-gray-500 w-auto h-10" icon="far fa-save" @click="exportImages"> Export all Images </MoeButton>
		</div>
		<div>
			<MoeButton @click="toGallery">Show all</MoeButton>
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

	let interval: number;

	onUnmounted(() => {
		window.clearInterval(interval);
	});

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

	// function openImage(image: CharacterImage) {
	// 	window.scroll(0, 0);
	// 	characterStore.setActiveImage(image);
	// 	mainStore.modal = Modal.FULLSCREENIMG;
	// }

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
			console.log("watch");

			if (character.images.length === 1) {
				image.value = getMainImage();
			}
			// calculateThumbsScrolling();
		},
		{ deep: true }
	);
</script>
