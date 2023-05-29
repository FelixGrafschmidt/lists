<template>
	<div class="pb-4 flex flex-col gap-4 min-h-screen relative !h-full">
		<MoeMobileHeader class="sticky top-0" />
		<main class="mx-auto">
			<section v-if="mode === 'collection'">
				<template v-if="collection.lists.length > 0">
					<MoeButton v-for="(l, i) in collection.lists" :key="i" @click="selectList(l)">{{ l.name }}</MoeButton>
				</template>
				<form
					v-else
					class="rounded-2xl bg-gray-800 text-gray-100 flex flex-col relative m-auto pb-10 sm:pt-5 items-center"
					@submit.prevent="id !== '' ? loadCollection() : undefined"
					@click.stop
				>
					<label class="mx-12 mt-8">
						<span class="ml-2">Paste collection id below.</span>
						<input
							v-model="id"
							type="text"
							class="block rounded-lg border text-gray-900 bg-gray-300 focus:outline-none h-8 mb-8 mt-2 mx-2"
						/>
					</label>

					<MoeButton :class="{ 'cursor-not-allowed': id === '' }" class="m-auto bg-gray-500">Load Collection</MoeButton>
				</form>
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

	const id = ref("");

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
		await collectionStore.loadCollection("");
	}

	function selectList(list: List) {
		listStore.setList(list);
		mainStore.mobileMode = "list";
	}
	function selectCharacter(character: Character) {
		characterStore.setCharacter(character);
		mainStore.mobileMode = "character";
	}
	function loadCollection() {
		collectionStore.loadCollection(id.value);
	}
</script>
