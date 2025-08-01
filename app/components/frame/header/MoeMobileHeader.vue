<template>
	<header class="sticky top-0 z-1 h-24 bg-gray-900">
		<div v-if="mobileMode === 'character'" class="h-full w-screen flex flex-col divide-y divide-gray-500">
			<div class="h-1/2 w-screen flex flex-row items-center justify-center text-xl">{{ character.name }}</div>
			<div class="m-auto h-1/2 w-screen flex flex-row items-center justify-center" @click="mainStore.setMobileMode('list')">Back</div>
		</div>
		<div v-else-if="mobileMode === 'list'" class="h-full w-screen flex flex-col divide-y divide-gray-500">
			<div class="h-1/2 w-screen flex flex-row items-center justify-center text-xl">{{ list.name }}</div>
			<div class="m-auto h-1/2 w-screen flex flex-row items-center justify-center" @click="mainStore.setMobileMode('collection')">
				Back
			</div>
		</div>
		<div v-else-if="collection.lists.length > 0" class="h-full flex flex-col items-center justify-center text-xl">
			{{ collection.id }}
		</div>
	</header>
</template>

<script setup lang="ts">
	const mainStore = useStore();
	const collectionStore = useCollection();
	const listStore = useList();
	const characterStore = useCharacter();

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
