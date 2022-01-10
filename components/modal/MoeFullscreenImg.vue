<template>
	<div class="h-screen max-h-screen relative w-screen" @click.stop>
		<client-only>
			<vue-easy-lightbox
				:loop="true"
				:visible="true"
				:imgs="imagesRaw"
				:index="index"
				class="max-h-screen !z-0"
				@hide="mainStore.modal = Modal.NONE"
			/>
		</client-only>
		<div
			class="w-screen absolute bottom-0 h-1/3 flex flex-col-reverse"
			@mouseenter="showThumbs = true"
			@mouseleave="showThumbs = false"
		>
			<div
				v-show="showThumbs"
				class="flex overflow-x-scroll px-8 gap-1 h-1/2 max-h-[6rem] min-h-[6rem] scrollbar-thin scrollbar-thumb-rounded scrollbar-track-rounded scrollbar-track-gray-300 scrollbar-thumb-gray-500 dark:scrollbar-track-gray-800 dark:scrollbar-thumb-gray-500 bg-gray-700 bg-opacity-50"
			>
				<figure
					v-for="(image, i) in images"
					:key="image.src"
					class="min-w-[4rem] max-w-[4rem] h-full cursor-pointer flex flex-col justify-center"
					@click="index = i"
				>
					<img :src="image.src" :alt="i.toString()" class="object-contain max-h-[6rem]" />
				</figure>
			</div>
		</div>
	</div>
</template>



<script setup lang="ts">
import { Modal } from "~~/models/enums/Modal";
import { useCharacterStore } from "~~/store/character";
import { useMainStore } from "~~/store/main";

const showThumbs = ref(false)
const index = ref(0)

const mainStore = useMainStore()
const characterStore = useCharacterStore()

const imagesRaw = characterStore.character.images.map((img) => img.src)
const images = characterStore.character.images;
const activeImage = characterStore.activeImage;


onMounted(() => {
	index.value = characterStore.character.images.indexOf(activeImage);
})

</script>

<style lang="postcss" scoped>
::v-deep .vel-toolbar {
	position: absolute;
	top: 0;
	height: fit-content;
}
</style>
