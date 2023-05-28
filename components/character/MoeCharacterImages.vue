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
			<MoeButton v-tooltip="'Designate as Main Image'" class="bg-gray-500 w-10 h-10" icon="fas fa-star" @click="designateMainImage" />
			<MoeButton v-tooltip="'Remove this Image'" class="bg-red-600 w-10 h-10" icon="fas fa-trash" @click="deleteImage" />
			<MoeButton v-tooltip="'Delete all Images'" class="bg-red-600 w-10 h-10" icon="fas fa-trash" @click.stop="deleteAllImages" />
			<MoeButton v-tooltip="'Add Image'" class="bg-gray-500 w-10 h-10" icon="fas fa-plus" @click.stop="addNewImage" />
			<MoeButton v-tooltip="'Add Images'" class="bg-gray-500 w-10 h-10" icon="fab fa-buffer" @click.stop="addImageMulti" />
			<MoeButton v-tooltip="'Export all Images'" class="bg-gray-500 w-10 h-10" icon="far fa-save" @click.stop="exportImages" />
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { saveAs } from "file-saver";
	import { Modal } from "~~/models/enums/Modal";
	import { CharacterImage, newCharacterImage } from "~~/models/interfaces/Character";

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

	function designateMainImage() {
		const index = character.images.indexOf(image.value);
		characterStore.designateMainImage(index);
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
