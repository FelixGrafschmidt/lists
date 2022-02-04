<template>
	<nav
		class="dark:bg-gray-800 bg-gray-500 pl-2 min-w-full flex items-center h-16 gap-3"
		role="navigation"
		aria-label="main navigation"
	>
		<div class="w-[50%] gap-3 flex items-center justify-start">
			<NuxtLink v-slot="{ navigate }" custom to="/">
				<h2
					class="text-xl cursor-pointer [font-family: 'Alfa Slab One', cursive; letter-spacing: 1px;] [font-variant-caps:small-caps] dark:text-white"
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
