<template>
	<aside class="bg-gray-700 py-4 px-4" @mouseenter="captureScroll" @mouseleave="releaseScroll">
		<h3 class="text-lg max-w-[15rem] whitespace-nowrap truncate">
			<template v-if="list.id">
				<span class="cursor-pointer" @click="navigateToList(list)">{{ list.name }}</span>
			</template>
			<template v-else>
				<span>No list selected</span>
			</template>
		</h3>
		<div
			:class="{
				'scrollbar-thin scrollbar-track-rounded scrollbar-thumb-rounded scrollbar-track-gray-800 scrollbar-thumb-gray-500 overflow-y-scroll':
					showScrollbars,
			}"
			class="rounded max-h-[40%] min-h-[40%] overflow-hidden"
		>
			<div
				v-for="characteritem of list.characters"
				:key="characteritem.id"
				:class="{ 'hover:bg-teal-400 hover:bg-teal-400': character.id && characteritem.id === character.id }"
				class="hover:bg-gray-800 rounded pl-6 py-1 cursor-pointer"
				role="link"
				@click="navigateToCharacter(characteritem)"
			>
				{{ characteritem.name }}
			</div>
		</div>
		<h3 class="text-lg caps-small cursor-pointer pt-2" @click="toCollection">Lists</h3>
		<div
			:class="{
				'scrollbar-thin scrollbar-track-rounded scrollbar-thumb-rounded  scrollbar-track-gray-800 scrollbar-thumb-gray-500 overflow-y-scroll':
					showScrollbars,
			}"
			class="rounded max-h-[40%] min-h-[40%] overflow-hidden"
		>
			<div
				v-for="listitem of collection.lists"
				:key="listitem.id"
				:class="{ 'bg-teal-500 hover:bg-teal-400': listitem.id === list.id }"
				class="hover:bg-gray-800 rounded pl-6 py-1 cursor-pointer"
				role="link"
				@click="navigateToList(listitem)"
			>
				{{ listitem.name }}
			</div>
		</div>
	</aside>
</template>

<script setup lang="ts">
	import { storeToRefs } from "pinia";
	import { Character } from "~~/models/interfaces/Character";
	import { List } from "~~/models/interfaces/List";

	const showScrollbars = ref(false);

	const mainStore = useMainStore();
	const collectionStore = useCollectionStore();
	const listStore = useListStore();
	const characterStore = useCharacterStore();

	const collection = collectionStore.collection;
	const { list } = storeToRefs(listStore);
	const character = characterStore.character;

	function navigateToList(list: List) {
		listStore.setList(list);
		mainStore.toList();
	}

	function navigateToCharacter(character: Character) {
		characterStore.setCharacter(character);
		mainStore.toCharacter();
	}

	function toCollection() {
		mainStore.toCollection();
	}

	function captureScroll() {
		showScrollbars.value = true;
	}

	function releaseScroll() {
		showScrollbars.value = false;
	}
</script>
