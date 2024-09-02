<template>
	<button
		class="flex flex-row items-center justify-center gap-1 rounded-md p-2 text-sm font-medium hover:text-teal-400"
		@click="$emit('click', $event)"
	>
		<i v-if="icon !== ''" :class="icon"></i>
		<slot />
	</button>
</template>

<script setup lang="ts">
	defineProps({
		icon: { type: String, default: "" },
	});
	defineEmits<{
		(e: "click", event: MouseEvent): void;
	}>();
</script>
