<template>
	<footer class="flex bg-gray-800 justify-between items-center">
		<div></div>

		<span>© Felix Grafschmidt {{ new Date().getFullYear() }}</span>

		<div
			class="w-[8rem] cursor-pointer relative h-full items-center flex"
			@mouseenter="showInfomenu = true"
			@mouseleave="showInfomenu = false"
		>
			<div class="flex gap-2 items-center mx-auto justify-center">
				<span :class="showInfomenu ? 'fas fa-angle-down' : 'fas fa-angle-up'"></span>
				<span>Info</span>
			</div>
			<MoeInfobox v-show="showInfomenu" class="absolute bottom-[2.98rem]" />
		</div>
	</footer>
</template>

<script setup lang="ts">
	const showInfomenu = ref(false);
</script>
