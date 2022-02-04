<template>
	<button class="p-2 rounded-md text-sm font-medium hover:text-teal-400">
		<i v-if="icon !== ''" :class="icon"></i>
		<slot />
	</button>
</template>

<script setup lang="ts">
defineProps({
	icon: { type: String, default: "" }
})
</script>
