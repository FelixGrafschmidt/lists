<template></template>

<script setup lang="ts">
import { Modal } from "~~/models/enums/Modal";

const mainStore = useMainStore()
const collectionStore = useCollectionStore()

if (process.server) {
	if (!collectionStore.collection.id) {
		mainStore.modal = Modal.LOADCOLLECTION
	} else {
		mainStore.toCollection()
	}
}

</script>
