<template>
	<div class="flex flex-col">
		<MoeCollectionHeader />
		<MoeCollectionLists />
		<MoeCollectionActions />
	</div>
</template>

<script setup lang="ts">
import { Modal } from "~~/models/enums/Modal";

const mainStore = useMainStore()
const collectionStore = useCollectionStore()

if (!collectionStore.collection.id) {
	const path = useNuxtApp().ssrContext!.url.split("/");

	const collectionid = path[1];
	if (!collectionid.match(/\w+/)) {
		useRouter().push("/")
	}
	await collectionStore.loadCollection();
	if (collectionStore.collection.lists.length === 0) {
		mainStore.modal = Modal.NEWLIST;
	}
}

</script>
