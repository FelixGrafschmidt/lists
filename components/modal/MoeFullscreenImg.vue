<template>
	<div class="relative h-screen max-h-screen w-screen" @click.stop>
		<client-only>
			<VueEasyLightbox
				:loop="true"
				:visible="true"
				:imgs="imagesRaw"
				:index="index"
				class="max-h-screen"
				@hide="mainStore.modal = Modal.NONE"
			/>
		</client-only>
		<div
			class="absolute bottom-0 h-1/3 w-screen flex flex-col-reverse"
			@mouseenter="showThumbs = true"
			@mouseleave="showThumbs = false"
		>
			<div
				v-show="showThumbs"
				class="h-1/2 max-h-[6rem] min-h-[6rem] flex gap-1 overflow-x-scroll bg-gray-700 bg-opacity-50 px-8 scrollbar-thumb-color-gray-9 scrollbar-track-color-gray-500 scrollbar-radius-2 scrollbar-thumb-radius-4 scrollbar-track-radius-4 scrollbar-w-2 scrollbar scrollbar-rounded"
			>
				<figure
					v-for="(image, i) in images"
					:key="image.src"
					class="h-full max-w-[4rem] min-w-[4rem] flex flex-col cursor-pointer justify-center"
					@click="index = i"
				>
					<img :src="image.src" :alt="i.toString()" class="max-h-[6rem] object-contain" />
				</figure>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { Modal } from "~~/models/enums/Modal";

	const showThumbs = ref(false);
	const index = ref(0);

	const mainStore = useMainStore();
	const characterStore = useCharacterStore();

	const imagesRaw = characterStore.character.images.map((img) => img.src);
	const images = characterStore.character.images;
	const activeImage = characterStore.activeImage;

	onMounted(() => {
		index.value = characterStore.character.images.indexOf(activeImage);
	});
</script>

<style lang="postcss" scoped>
	:deep(.vel-toolbar) {
		position: absolute;
		top: 0;
		height: fit-content;
	}
</style>
