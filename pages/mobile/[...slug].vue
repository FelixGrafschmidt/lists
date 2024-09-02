<template>
	<div class="relative min-h-screen flex flex-col gap-4 pb-4 !h-full">
		<MoeMobileHeader class="sticky top-0" />
		<main class="mx-auto">
			<section v-if="mode === 'collection'">
				<template v-if="collection.lists.length > 0">
					<MoeButton v-for="(l, i) in collection.lists" :key="i" @click="selectList(l)">{{ l.name }}</MoeButton>
				</template>
				<form
					v-else
					class="relative m-auto flex flex-col items-center rounded-2xl bg-gray-800 pb-10 text-gray-100 sm:pt-5"
					@submit.prevent="id !== '' ? loadCollection() : undefined"
					@click.stop
				>
					<label class="mx-12 mt-8">
						<span class="ml-2">Paste collection id below.</span>
						<input
							v-model="id"
							type="text"
							class="mx-2 mb-8 mt-2 block h-8 border rounded-lg bg-gray-300 text-gray-900 focus:outline-none"
						/>
					</label>

					<MoeButton :class="{ 'cursor-not-allowed': id === '' }" class="m-auto bg-gray-500">Load Collection</MoeButton>
				</form>
			</section>
			<section v-else-if="mode === 'list'" class="flex flex-col gap-4">
				<div
					v-for="(c, i) in list.characters"
					:key="i"
					class="flex flex-col cursor-pointer justify-center gap-2"
					@click="selectCharacter(c)"
				>
					<span class="mx-auto text-xl">{{ c.name }}</span>
					<img
						loading="lazy"
						:src="c.images.find((image) => image.main)!.src"
						:alt="character.name"
						class="mx-auto h-auto max-h-128 rounded"
					/>
				</div>
			</section>
			<section v-else class="flex flex-col gap-4">
				<img
					v-for="(image, i) in character.images"
					:key="i"
					loading="lazy"
					:src="image.src"
					:alt="character.name"
					class="mx-auto h-auto max-h-128 rounded"
				/>
			</section>
		</main>
	</div>
</template>

<script setup lang="ts">
	import type { Character } from "~/models/interfaces/Character";
	import type { List } from "~/models/interfaces/List";

	const mainStore = useStore();
	const collectionStore = useCollection();
	const listStore = useList();
	const characterStore = useCharacter();

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

	if (import.meta.server) {
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
