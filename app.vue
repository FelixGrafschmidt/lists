<template>
	<div class="dark:bg-gray-900 dark:text-gray-100 min-h-screen" :class="isDark ? 'dark' : 'light'">
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>

<script setup lang="ts">
import '@unocss/reset/tailwind.css'
const isDark = useDark()
</script>
