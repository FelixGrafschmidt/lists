<template>
	<nav class="bg-gray-800 pl-2 w-screen flex items-center justify-between gap-3" role="navigation" aria-label="main navigation">
		<div class="gap-3 flex items-center justify-start">
			<NuxtLink class="text-xl w-72 cursor-pointer title" role="link" to="/"> Character List Manager </NuxtLink>
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
