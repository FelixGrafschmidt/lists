<template>
	<NuxtPage class="bg-gray-900 text-gray-100 h-screen" />
</template>

<script setup lang="ts">
// import '@unocss/reset/tailwind.css'
</script>

<style lang="postcss">
@import url("https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Lato&display=swap");

:root {
	font-family: "Lato", sans-serif;
}

.content-height {
	height: calc(100vh - theme("height.32"));
}
</style>
