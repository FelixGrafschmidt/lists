<template>
	<div class="dark:bg-gray-900 dark:text-gray-100 min-h-screen">
		<NuxtPage />
	</div>
</template>

<script setup lang="ts">
if (process.client) {
	if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
		document.documentElement.classList.add('dark')
	}
	else {
		document.documentElement.classList.add('light')
	}
}
</script>
