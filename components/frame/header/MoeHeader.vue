<template>
	<nav class="min-h-16 w-screen flex items-center justify-between gap-3 bg-gray-800 pl-2" role="navigation" aria-label="main navigation">
		<div class="flex items-center justify-start gap-3">
			<NuxtLink class="title w-72 cursor-pointer text-xl" role="link" to="/"> Character List Manager </NuxtLink>
			<MoeSaveArea />
		</div>
		<MoeCollectionArea class="justify-self-end" />
	</nav>
</template>

<style scoped>
	.title {
		font-family: "Alfa Slab One", cursive;
		letter-spacing: 1px;
		font-variant-caps: small-caps;
	}
</style>
