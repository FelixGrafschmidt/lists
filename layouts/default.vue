<template>
	<div>{{ store.collection }}</div>
</template>

<script setup lang="ts">
import { useStore } from "~~/store/collection";

const store = useStore()

if (process.client) {
	await store.loadCollection()
}

</script>

<style lang="postcss" scoped></style>
