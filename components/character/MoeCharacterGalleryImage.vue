<template>
	<div v-if="image" class="h-[80vh] w-1/2 flex flex-col items-center justify-between gap-3">
		<div class="h-90% flex justify-center">
			<figure class="h-full flex flex-col justify-center">
				<img :alt="character.name" :src="image.src || ''" crossorigin="anonymous" class="m-auto max-h-full rounded" />
			</figure>
		</div>
		<div class="h-10% flex items-center justify-self-end gap-4">
			<MoeButton v-tooltip="'Designate as Main Image'" class="h-10 w-10 bg-gray-500" icon="fas fa-star" @click="designateMainImage" />
			<MoeButton v-tooltip="'Remove this Image'" class="h-10 w-10 bg-red-600" icon="fas fa-trash" @click="deleteImage" />
			<MoeButton v-tooltip="'Delete all Images'" class="h-10 w-10 bg-red-600" icon="fas fa-trash" @click="deleteAllImages" />
			<MoeButton v-tooltip="'Add Image'" class="h-10 w-10 bg-gray-500" icon="fas fa-plus" @click="addNewImage" />
			<MoeButton v-tooltip="'Add Images'" class="h-10 w-10 bg-gray-500" icon="fab fa-buffer" @click="addImageMulti" />
			<MoeButton v-tooltip="'Export all Images'" class="h-10 w-10 bg-gray-500" icon="far fa-save" @click="exportImages" />
		</div>
	</div>
</template>

<script lang="ts" setup>
	import pkg from "file-saver";
	import { Modal } from "~/models/enums/Modal";
	import type { Character, CharacterImage } from "~/models/interfaces/Character";
	const mainStore = useStore();
	const characterStore = useCharacter();
	const { saveAs } = pkg;

	const props = defineProps<{
		character: Character;
		image?: CharacterImage;
	}>();

	const emit = defineEmits<{
		(e: "delete", images: CharacterImage[]): void;
	}>();

	function designateMainImage() {
		const index = props.character.images.indexOf(props.image!);
		characterStore.designateMainImage(index);
	}
	function addNewImage() {
		mainStore.modal = Modal.NEWIMAGE;
	}

	function addImageMulti() {
		mainStore.modal = Modal.IMAGEMULTI;
	}

	function deleteAllImages() {
		emit("delete", props.character.images);
	}

	function deleteImage() {
		emit("delete", [props.image!]);
	}

	function exportImages() {
		let imageSources = "";
		props.character.images.forEach((image) => {
			imageSources += image.src + "\n";
		});
		saveAs(new File([imageSources], props.character.name + "_images.txt"));
	}
</script>
