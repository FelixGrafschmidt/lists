<template>
	<div class="pb-4 flex flex-col gap-4 min-h-screen relative !h-full">
		<MoeMobileHeader class="sticky top-0" />
		<main class="mx-auto">
			<section v-if="mode === 'collection'" class="">
				<MoeButton v-for="(l, i) in collection.lists" :key="i" @click="selectList(l)">{{ l.name }}</MoeButton>
			</section>
			<section v-else-if="mode === 'list'" class="flex flex-col gap-4">
				<div
					v-for="(c, i) in list.characters"
					:key="i"
					class="flex flex-col justify-center gap-2 cursor-pointer"
					@click="selectCharacter(c)"
				>
					<span class="mx-auto text-xl">{{ c.name }}</span>
					<img :src="c.images.find((image) => image.main)!.src" :alt="character.name" class="max-h-128 mx-auto rounded" />
				</div>
			</section>
			<section v-else class="flex flex-col gap-4">
				<img
					v-for="(image, i) in character.images"
					:key="i"
					:src="image.src"
					:alt="character.name"
					class="max-h-128 mx-auto rounded"
				/>
			</section>
		</main>
	</div>
</template>

<script setup lang="ts">
	import { Character } from "~/models/interfaces/Character";
	import { List } from "~/models/interfaces/List";

	const mainStore = useMainStore();
	const collectionStore = useCollectionStore();
	const listStore = useListStore();
	const characterStore = useCharacterStore();

	const mode = computed(() => {
		return mainStore.mobileMode;
	});
	const collection = computed(() => {
		return collectionStore.collection;
	});
	const list = computed(() => {
		return listStore.list;
	});
	const character = computed(() => {
		return characterStore.character;
	});

	if (process.server) {
		await collectionStore.loadCollection();
	}

	function selectList(list: List) {
		listStore.setList(list);
		mainStore.mobileMode = "list";
	}
	function selectCharacter(character: Character) {
		characterStore.setCharacter(character);
		mainStore.mobileMode = "character";
	}
</script>
