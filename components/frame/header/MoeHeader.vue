<template>
	<nav
		class="dark:bg-gray-800 bg-gray-500 pl-2 min-w-full flex items-center h-16 gap-3"
		role="navigation"
		aria-label="main navigation"
	>
		<MoeButtonDark :icon="modeIcon" class="max-w-[5%]" @click="changeMode" />
		<div class="w-[50%] gap-3 flex items-center justify-start">
			<NuxtLink v-slot="{ navigate }" custom to="/">
				<h2
					class="text-xl cursor-pointer title caps-small dark:text-white"
					role="link"
					@click="navigate"
				>Character List Manager</h2>
			</NuxtLink>
			<ClientOnly>
				<MoeSaveArea />
			</ClientOnly>
		</div>
		<ClientOnly>
			<MoeCollectionArea />
		</ClientOnly>
	</nav>
</template>

<script setup lang="ts">
let colorMode = "dark"

const modeIcon = computed(() => {
	if (colorMode === "light") {
		return 'fas fa-moon'
	} else {
		return 'fas fa-sun'
	}
})
function changeMode() {
	colorMode = colorMode === "light" ? "dark" : "light";
}
</script>

<style lang="postcss" scoped>
.title {
	font-family: "Alfa Slab One", cursive;
	letter-spacing: 1px;
}
.caps-small {
	font-variant-caps: small-caps;
}
</style>
