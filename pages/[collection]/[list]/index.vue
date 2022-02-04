<template>
	<div class="flex flex-col-reverse">
		<MoeListActions />
		<MoeListCharacters />
		<MoeListHeader />
	</div>
</template>


<script setup lang="ts">

const mainStore = useMainStore()
const collectionStore = useCollectionStore()
const listStore = useListStore()


if (process.server) {
	const path = useNuxtApp().ssrContext!.url.split("/");
	const listid = path[2];
	const lists = collectionStore.collection.lists.filter((list) => list.id === listid);
	if (lists.length === 0) {
		mainStore.toCollection();
	}
	listStore.setList(lists[0]);
}

</script>
