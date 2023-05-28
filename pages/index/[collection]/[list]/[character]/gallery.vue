<template>
	<div class="flex flex-row relative px-6">
		<MoeButton
			v-tooltip="'Back to Character'"
			class="!p-0 h-8 w-8 top-0 -ml-6 left-0 sticky rounded-none rounded-br-1 border border-teal-700"
			icon="fas fa-arrow-left"
			@click="toCharacter"
		/>

		<MoeCharacterGalleryImage :character="character" :image="activeImage" class="sticky top-0 px-6 w-1/3 pt-6" @delete="deleteImages" />
		<section class="w-2/3 py-6">
			<div class="flex flex-row flex-wrap gap-4">
				<img
					v-for="(image, i) in character.images"
					:key="i"
					:class="{ 'outline-teal outline-solid': image.main }"
					class="max-h-72 rounded cursor-pointer"
					:src="image.src"
					@click="activeImage = image"
				/>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
	import { CharacterImage } from "~/models/interfaces/Character";

	const characterStore = useCharacterStore();

	const character = characterStore.character;

	const activeImage = ref(character.images.find((image) => image.main));

	function deleteImages(images: CharacterImage[]) {
		character.images = character.images.filter((image) => {
			return !images.includes(image);
		});
		activeImage.value = character.images.find((image) => image.main);
	}

	async function toCharacter() {
		await useMainStore().toCharacter();
	}
</script>
