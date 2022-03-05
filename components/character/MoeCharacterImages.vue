<template>
	<div class="flex flex-col items-center w-1/2 justify-between h-[80vh]">
		<div class="h-[75%] min-h-[75%] justify-center flex cursor-pointer">
			<figure @click="openImage(image)" class="flex flex-col justify-center">
				<img
					:alt="character.name"
					:src="image.src || ''"
					@load="markValid(image)"
					class="rounded max-h-full m-auto"
				/>
			</figure>
		</div>
		<div class="flex relative h-[15%]">
			<button
				v-show="thumbsScrolling"
				@mouseenter="scrollThumbsLeft = true"
				@mouseleave="scrollThumbsLeft = false"
				class="focus:outline-none absolute left-[-2.5rem] top-[5%] bg-teal-600 px-2 rounded-full fas fa-angle-left h-full"
			></button>
			<div
				ref="thumbs"
				class="max-h-[6rem] min-h-[6rem] w-full flex gap-1 items-center overflow-x-scroll scrollbar-thin scrollbar-thumb-rounded scrollbar-track-rounded scrollbar-track-gray-800 scrollbar-thumb-gray-500 max-w-[30vw]"
			>
				<figure
					v-for="(img, i) in character.images"
					:key="i"
					:class="{
						'border-red-500 border-4': !img.valid,
					}"
					@click="image = img"
					class="cursor-pointer max-h-full min-w-[4rem] max-w-[4rem]"
				>
					<img
						:class="{
							'border-teal-300 border-4': img.main,
							'border-green-700 border-4': img === image && img.valid,
						}"
						:src="img.src"
						:alt="i.toString()"
						@load="markValid(img)"
						@error="markInvalid(img)"
						class="rounded overflow-hidden max-h-[6rem] mx-auto"
					/>
				</figure>
			</div>
			<button
				v-show="thumbsScrolling"
				@mouseenter="scrollThumbsRight = true"
				@mouseleave="scrollThumbsRight = false"
				class="focus:outline-none absolute right-[-2.5rem] top-[5%] h-full bg-teal-600 rounded-full px-2 fas fa-angle-right"
			></button>
		</div>
		<div class="flex gap-4 items-center justify-self-end h-[5%]">
			<MoeButton
				class="bg-gray-500 w-10 h-10"
				@click="designateMainImage"
				icon="fas fa-star"
				v-tooltip="'Designate as Main Image'"
			/>
			<MoeButton
				v-tooltip="'Remove this Image'"
				@click="deleteImage"
				class="bg-red-600 w-10 h-10"
				icon="fas fa-trash"
			/>
			<MoeButton
				class="bg-gray-500 w-10 h-10"
				@click.stop="addNewImage"
				icon="fas fa-plus"
				v-tooltip="'Add Image'"
			/>
			<MoeButton
				class="bg-gray-500 w-10 h-10"
				@click.stop="addImageMulti"
				icon="fab fa-buffer"
				v-tooltip="'Add Images'"
			/>
			<MoeButton
				class="bg-gray-500 w-10 h-10"
				@click.stop="exportImages"
				icon="far fa-save"
				v-tooltip="'Export all Images'"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { Modal } from "~~/models/enums/Modal";
import { CharacterImage, newCharacterImage } from "~~/models/interfaces/Character";
import { saveAs } from "file-saver";

const mainStore = useMainStore()
const characterStore = useCharacterStore()

const scrollThumbsLeft = ref(false);
const scrollThumbsRight = ref(false);
let thumbsScrolling = ref(false);

const thumbs = ref()

let image: CharacterImage = { src: "", main: false, valid: true };

const character = characterStore.character

let interval: number

onMounted(() => {
	image = getMainImage();

	interval = window.setInterval(() => {
		const thumbsInternal = thumbs.value as Element;
		if (scrollThumbsLeft) {
			thumbsInternal.scrollLeft -= 10;
		}
		if (scrollThumbsRight) {
			thumbsInternal.scrollLeft += 10;
		}
	}, 10);
	calculateThumbsScrolling();
})

onUnmounted(() => {
	window.clearInterval(interval)
})

function getMainImage() {
	return (
		character.images.find((image) => {
			return image.main;
		}) || newCharacterImage()
	);
}

function addNewImage() {
	mainStore.modal = Modal.NEWIMAGE;
	if (character.images.length === 1) {
		character.images[0].main = true
	}
	image = getMainImage();
}

function addImageMulti() {
	mainStore.modal = Modal.IMAGEMULTI;
}

function designateMainImage() {
	const index = character.images.indexOf(image);
	characterStore.designateMainImage(index);
}

function markInvalid(image: CharacterImage) {
	image.valid = false;
}

function markValid(image: CharacterImage) {
	image.valid = true;
}

function deleteImage() {
	const index = character.images.indexOf(image);
	characterStore.removeCharacterImage(index);
	image = getMainImage();
}

function calculateThumbsScrolling() {
	const thumbsInternal = thumbs.value as Element;
	let childrenWidth = 0;
	for (const child of Array.from(thumbsInternal.children)) {
		childrenWidth += child.clientWidth;
	}
	thumbsScrolling.value = childrenWidth > thumbsInternal.clientWidth;
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

		// @Watch("character.images.length", { deep: true })
		// onLengthChanged(_val: Number, _oldVal: Number) {
		// 	if (!this.image) {
		// 		this.image = this.getMainImage();
		// 	}
		// 	this.calculateThumbsScrolling();
		// }

</script>
