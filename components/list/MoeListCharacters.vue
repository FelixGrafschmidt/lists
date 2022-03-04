<template>
	<div class="rounded">
		<div
			v-for="(character, index) in characters"
			:ref="character.id"
			:key="index"
			:class="{
				'bg-gray-300  dark:bg-gray-800': index % 2 === 0,
			}"
			@click="selectCharacter(character)"
			class="flex h-24 hover:bg-gray-700 items-center rounded cursor-pointer my-1"
		>
			<div class="w-[35%] text-center">{{ character.name }}</div>
			<form class="w-[35%] text-center relative">{{ character.origin }}</form>
			<form class="w-[10%] text-center relative">{{ character.images.length }}</form>
			<form class="w-[10%] text-center relative">{{ character.attributeArray.length }}</form>
			<div class="w-[10%] text-center">
				<img
					:src="getMainImage(character).src"
					:alt="character.name"
					class="max-h-24 max-w-24 rounded m-auto"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Character } from "~~/models/interfaces/Character";

const listStore = useListStore()
const characterStore = useCharacterStore()
const mainStore = useMainStore()

const characters = computed(() => listStore.list.characters)

function selectCharacter(character: Character) {
	characterStore.setCharacter(character);
	mainStore.toCharacter();
}

function getMainImage(character: Character) {
	return (
		character.images.filter((image) => {
			return image.main;
		})[0] || ""
	);
}

</script>
