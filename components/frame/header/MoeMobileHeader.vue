<template>
	<header class="sticky top-0 bg-gray-900 py-2">
		<div v-if="mobileMode === 'character'" class="flex flex-col gap-4">
			<div class="m-auto text-xl">{{ character.name }}</div>
			<MoeButton class="m-auto w-60 h-12" @click="mainStore.setMobileMode('list')"> Back </MoeButton>
		</div>
		<div v-else-if="mobileMode === 'list'" class="flex flex-col gap-4">
			<div class="m-auto text-xl">{{ list.name }}</div>
			<MoeButton class="m-auto w-60 h-12" @click="mainStore.setMobileMode('collection')"> Back </MoeButton>
		</div>
		<div v-else-if="collection.lists.length > 0" class="flex flex-col gap-4">
			<span class="m-auto">{{ collection.id }}</span>
		</div>
	</header>
</template>

<script setup lang="ts">
	const mainStore = useMainStore();
	const collectionStore = useCollectionStore();
	const listStore = useListStore();
	const characterStore = useCharacterStore();

	const collection = computed(() => {
		return collectionStore.collection;
	});

	const list = computed(() => {
		return listStore.list;
	});

	const character = computed(() => {
		return characterStore.character;
	});

	const mobileMode = computed(() => {
		return mainStore.mobileMode;
	});
</script>
