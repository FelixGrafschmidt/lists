<template>
	<div class="relative flex flex-col">
		<MoeCollectionHeader />
		<MoeCollectionLists />
		<MoeCollectionActions />
	</div>
</template>

<script setup lang="ts">
	import { Modal } from "@/models/enums/Modal";

	const mainStore = useStore();
	const collectionStore = useCollection();

	if (collectionStore.collection.lists.length === 0) {
		mainStore.modal = Modal.NEWLIST;
	}
</script>
