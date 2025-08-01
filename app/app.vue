<template>
	<NuxtPage class="h-screen" />
</template>

<script setup lang="ts"></script>

<style lang="postcss">
	@import "@unocss/reset/tailwind.css";
	@import url("https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Lato&display=swap");

	:root {
		font-family: "Lato", sans-serif;
	}
	html {
		scrollbar-gutter: unset;
		@apply bg-gray-7 text-gray-3;
	}
	body {
		@apply scrollbar scrollbar-rounded scrollbar-w-2 scrollbar-radius-2 scrollbar-track-radius-4 scrollbar-thumb-radius-4 scrollbar-track-color-gray-5 scrollbar-thumb-color-gray-9 overflow-y-overlay;
	}
</style>
