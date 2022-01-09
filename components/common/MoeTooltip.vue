<template>
	<div
		:class="{
			'flex-row': position === 'right',
			'flex-row-reverse': position === 'left',
			'flex-col-reverse': position === 'top',
			'flex-col': position === 'bottom',
		}"
		class="has-tooltip relative flex items-center h-full"
	>
		<slot />
		<span
			:class="extraClassesCombined"
			class="tooltip absolute border border-gray-500 z-30 bg-gray-300 text-gray-800 rounded w-max max-w-[8rem] text-center mx-auto p-1"
		>{{ text }}</span>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	text: { type: String, default: "" },
	position: { type: String, default: "bottom" },
	extraClasses: { type: String, default: "" },
})

const extraClassesCombined = computed(() => {
	switch (props.position) {
		case "bottom":
			return props.extraClasses + " mt-10";
		case "top":
			return props.extraClasses + " mb-10";
		case "right":
			return props.extraClasses + " ml-10";
		case "left":
			return props.extraClasses + " mr-10";
		default:
			return props.extraClasses;
	}
})
</script>


<style lang="postcss" scoped>
.tooltip {
	@apply invisible;
}

.has-tooltip:hover .tooltip {
	@apply visible;
}
</style>
