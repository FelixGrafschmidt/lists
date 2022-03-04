<template>
	<div class>
		<h1 class="text-2xl pb-2">Imprint</h1>
		<p class="text-lg">Felix Grafschmidt</p>
	</div>
</template>

<script setup lang="ts">

const collectionStore = useCollectionStore()

if (process.server) {
	await collectionStore.loadCollection()
}
</script>
