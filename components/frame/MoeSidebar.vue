<template>
	<aside class="bg-gray-700 px-4 py-4" @mouseenter="captureScroll" @mouseleave="releaseScroll">
		<h3 class="max-w-[15rem] truncate whitespace-nowrap text-lg">
			<template v-if="list.id">
				<span class="cursor-pointer" @click="navigateToList(list)">{{ list.name }}</span>
			</template>
			<template v-else>
				<span>No list selected</span>
			</template>
		</h3>
		<div
			:class="{
				'scrollbar scrollbar-rounded scrollbar-w-2 scrollbar-radius-2 scrollbar-track-radius-4 scrollbar-thumb-radius-4 scrollbar-track-color-gray-500 scrollbar-thumb-color-gray-9 overflow-y-scroll':
					showScrollbars,
			}"
			class="max-h-[35vh] min-h-[35vh] overflow-hidden rounded"
		>
			<div
				v-for="characteritem of list.characters"
				:key="characteritem.id"
				:class="{ 'bg-teal-500 hover:bg-teal-400': character.id && characteritem.id === character.id }"
				class="cursor-pointer rounded py-1 pl-6 hover:bg-gray-800"
				role="link"
				@click="navigateToCharacter(characteritem)"
			>
				{{ characteritem.name }}
			</div>
		</div>
		<h3 class="flex flex-row items-baseline gap-2 pt-4 text-lg">
			<span class="cursor-pointer" @click="toCollection">Lists</span>
			<MoeButton icon="fas fa-plus" @click="addList">Add</MoeButton>
		</h3>
		<div
			:class="{
				'scrollbar scrollbar-rounded scrollbar-w-2 scrollbar-radius-2 scrollbar-track-radius-4 scrollbar-thumb-radius-4 scrollbar-track-color-gray-500 scrollbar-thumb-color-gray-9 overflow-y-scroll':
					showScrollbars,
			}"
			class="max-h-[35vh] min-h-[35vh] overflow-hidden rounded"
		>
			<div
				v-for="listitem of collection.lists"
				:key="listitem.id"
				:class="{ 'bg-teal-500 hover:bg-teal-400': listitem.id === list.id }"
				class="cursor-pointer rounded py-1 pl-6 hover:bg-gray-800"
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
	import { Modal } from "~/models/enums/Modal";
	import type { Character } from "~~/models/interfaces/Character";
	import type { List } from "~~/models/interfaces/List";

	const showScrollbars = ref(false);

	const mainStore = useMainStore();
	const collectionStore = useCollectionStore();
	const listStore = useListStore();
	const characterStore = useCharacterStore();

	const collection = computed(() => collectionStore.collection);
	const { list } = storeToRefs(listStore);
	const character = computed(() => characterStore.character);

	async function navigateToList(list: List) {
		listStore.setList(list);
		await mainStore.toList();
	}

	async function navigateToCharacter(character: Character) {
		characterStore.setCharacter(character);
		await mainStore.toCharacter();
	}

	async function toCollection() {
		await mainStore.toCollection();
	}

	function captureScroll() {
		showScrollbars.value = true;
	}

	function releaseScroll() {
		showScrollbars.value = false;
	}

	function addList() {
		mainStore.modal = Modal.NEWLIST;
	}
</script>
