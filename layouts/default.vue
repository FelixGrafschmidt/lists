<template>
	<div class="flex flex-col min-h-screen justify-between">
		<FrameHeaderMoeHeader class="h-16 fixed z-10 border-b border-teal-700" />
		<div class="flex">
			<!-- <MoeSidebar class="w-1/6 fixed h-full mt-16 mb-32 border-r border-teal-700" /> -->
			<div
				v-if="store.ready"
				class="scroll-padding content-height w-5/6 ml-auto px-6 max-h-full mt-16 scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-gray-500 dark:scrollbar-track-gray-800 dark:scrollbar-thumb-gray-500 overflow-y-scroll"
			>
				<slot />
			</div>
		</div>

		<!-- <MoeFooter class="h-16 fixed bottom-0 z-10 w-full border-t border-teal-700" />
		<MoeModal />-->
	</div>
</template>

<script setup lang="ts">
import { useCollectionStore } from "~~/store/collection";

const store = useCollectionStore()

if (process.client) {
	await store.loadCollection()
}

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
