<template>
	<footer class="flex bg-gray-800 h-12 justify-center items-center relative">
		<!-- <div
			class="absolute left-0 flex flex-col-reverse gap-4 bottom-2 w-[8rem] mr-1 cursor-pointer"
			@mouseenter="showLangSwitcher = true"
			@mouseleave="showLangSwitcher = false"
		>
			<div class="flex gap-2 items-center h-10 mx-auto justify-center">
				<span :class="showLangSwitcher ? 'fas fa-angle-down' : 'fas fa-angle-up'"></span>
				<span>{{ $i18n.locale.toUpperCase() }}</span>
			</div>
			<MoeLangSwitcher v-show="showLangSwitcher" />
		</div>-->

		<div class>© Felix Grafschmidt {{ new Date().getFullYear() }}</div>

		<div
			class="absolute right-0 flex flex-col-reverse gap-4 bottom-2 w-[8rem] mr-1 cursor-pointer"
			@mouseenter="showInfomenu = true"
			@mouseleave="showInfomenu = false"
		>
			<div class="flex gap-2 items-center h-10 mx-auto justify-center">
				<span :class="showInfomenu ? 'fas fa-angle-down' : 'fas fa-angle-up'"></span>
				<span>Info</span>
			</div>
			<MoeInfobox v-show="showInfomenu" />
		</div>
	</footer>
</template>

<script setup lang="ts">

const showInfomenu = ref(false)
// const showLangSwitcher = ref(false)

</script>
