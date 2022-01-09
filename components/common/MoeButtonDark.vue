<template>
	<button
		class="px-3 py-2 rounded-md text-sm font-medium focus:outline-none bg-gray-600 dark:bg-gray-900 hover:bg-gray-700 dark-hover:bg-gray-700 hover:text-teal-500"
	>
		<i v-if="icon !== ''" :class="icon"></i>
		<slot />
	</button>
</template>

<script setup lang="ts">
defineProps({
	icon: { type: String, default: "" }
})
</script>
