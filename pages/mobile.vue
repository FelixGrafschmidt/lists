<template>
	<div class="pb-4">
		<MoeMobileHeader />
		<MoeMobileContent />
	</div>
</template>

<script setup lang="ts">
const collectionStore = useCollectionStore()

if (process.server) {
	await collectionStore.loadCollection()
}
</script>
