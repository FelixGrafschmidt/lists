<template>
	<footer class="min-h-16 flex items-center justify-between bg-gray-800">
		<div></div>

		<span>© Felix Grafschmidt {{ new Date().getFullYear() }}</span>

		<div
			class="relative h-full w-[8rem] flex cursor-pointer items-center"
			@mouseenter="showInfomenu = true"
			@mouseleave="showInfomenu = false"
		>
			<div class="mx-auto flex items-center justify-center gap-2">
				<span :class="showInfomenu ? 'fa:angle-down' : 'fa:angle-up'"></span>
				<span>Info</span>
			</div>
			<MoeInfobox v-show="showInfomenu" class="absolute bottom-16" />
		</div>
	</footer>
</template>

<script setup lang="ts">
	const showInfomenu = ref(false);
</script>
