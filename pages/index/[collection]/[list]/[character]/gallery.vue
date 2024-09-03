<template>
	<div class="relative flex flex-row px-6">
		<MoeButton
			v-tooltip="'Back to Character'"
			class="sticky left-0 top-0 h-8 w-8 border border-teal-700 rounded-none rounded-br-1 -ml-6 !p-0"
			icon="fa:arrow-left"
			@click="toCharacter"
		/>

		<MoeCharacterGalleryImage :character="character" :image="activeImage" class="sticky top-0 w-1/3 px-6 pt-6" @delete="deleteImages" />
		<section class="w-2/3 py-6">
			<div class="flex flex-row flex-wrap gap-4">
				<img
					v-for="(image, i) in character.images"
					:key="i"
					crossorigin="anonymous"
					loading="lazy"
					:class="{ 'outline-teal outline-solid': image.main }"
					class="h-72 cursor-pointer rounded"
					:src="image.src"
					@click="activeImage = image"
				/>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
	import type { CharacterImage } from "~/models/interfaces/Character";

	const characterStore = useCharacter();

	const character = characterStore.character;

	const activeImage = ref(character.images.find((image) => image.main));

	function deleteImages(images: CharacterImage[]) {
		character.images = character.images.filter((image) => {
			return !images.includes(image);
		});
		activeImage.value = character.images.find((image) => image.main);
	}

	async function toCharacter() {
		await useStore().toCharacter();
	}
</script>
