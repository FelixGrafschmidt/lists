<template>
	<div class="relative min-h-screen flex flex-col pb-4 !h-full">
		<MoeMobileHeader />
		<main class="mx-auto">
			<section v-if="mode === 'collection'" class="flex flex-col divide-y">
				<template v-if="collection.lists.length > 0">
					<div
						v-for="(l, i) in collection.lists"
						:key="i"
						class="h-12 w-screen flex flex-row items-center justify-center text-xl"
						@click="selectList(l)"
					>
						{{ l.name }}
					</div>
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
			<section v-else-if="mode === 'list'" class="flex flex-col shadow divide-y divide-gray-700">
				<div v-for="(origin, i) in charactersByOrigin" :key="i" class="flex flex-col">
					<div
						class="sticky top-24 h-12 w-screen flex flex-row items-center justify-start gap-2 bg-gray-8 px-4 text-xl"
						@click="origin.expanded = !origin.expanded"
					>
						<Icon :name="origin.expanded ? 'fa6-solid:caret-down' : 'fa6-solid:caret-right'" class="h-5 w-5" />
						<span>{{ origin.name }}</span>
					</div>
					<div v-if="origin.expanded" class="flex flex-col divide-y">
						<div
							v-for="(c, j) in origin.characters"
							:key="j"
							class="flex flex-col cursor-pointer justify-center gap-2 py-4"
							@click="selectCharacter(c)"
						>
							<span class="mx-auto text-xl">{{ c.name }}</span>
							<img
								loading="lazy"
								crossorigin="anonymous"
								:src="c.images.find((image) => image.main)!.src"
								:alt="character.name"
								class="mx-auto h-auto max-h-128 rounded"
							/>
						</div>
					</div>
				</div>
			</section>
			<section v-else class="flex flex-col gap-4">
				<img
					v-for="(image, i) in character.images"
					:key="i"
					crossorigin="anonymous"
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

	interface Origin {
		name: string;
		characters: Character[];
		expanded: boolean;
	}

	const mainStore = useStore();
	const collectionStore = useCollection();
	const listStore = useList();
	const characterStore = useCharacter();

	const id = ref("");
	const charactersByOrigin: Ref<Origin[]> = ref([]);

	const params = useRoute().params;

	let collectionId = useCookie("collectionId").value as string;
	let listId = "";
	let characterId = "";

	if (params.slug?.length) {
		collectionId = (params.slug as string[]).shift()!;
		[listId, characterId] = params.slug;
	}

	await collectionStore.loadCollection(collectionId || "");

	if (listId && listId.match(/[\w-]{21}/)) {
		const lists = collectionStore.collection.lists.filter((list) => list.id === listId);
		if (lists.length > 0) {
			selectList(lists[0]);
		}
		if (characterId) {
			if (characterId.match(/[\w-]{21}/)) {
				const characters = listStore.list.characters.filter((character) => character.id === characterId);
				if (characters.length > 0) {
					selectCharacter(characters[0]);
				}
			}
		}
	}

	const mode = computed(() => {
		return mainStore.mobileMode;
	});
	const collection = computed(() => {
		return collectionStore.collection;
	});
	const character = computed(() => {
		return characterStore.character;
	});

	function selectList(list: List) {
		listStore.setList(list);
		mainStore.mobileMode = "list";
		const characters = list.characters;
		const origins = characters.map((character) => character.origin);
		const uniqueOrigins = Array.from(new Set(origins));
		charactersByOrigin.value = uniqueOrigins.map((origin, i) => {
			return {
				name: origin,
				expanded: i === 0,
				characters: characters.filter((character) => character.origin === origin),
			};
		});
	}
	function selectCharacter(character: Character) {
		characterStore.setCharacter(character);
		mainStore.mobileMode = "character";
	}

	function loadCollection() {
		collectionStore.loadCollection(id.value);
	}
</script>
