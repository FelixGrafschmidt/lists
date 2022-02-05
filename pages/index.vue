<template>
	<div class="flex flex-col min-h-screen justify-between">
		<MoeHeader class="h-16 fixed border-b border-teal-700" />
		<div class="flex">
			<MoeSidebar class="w-1/6 fixed h-full mt-16 mb-32 border-r border-teal-700" />
			<div
				class="scroll-padding content-height w-5/6 ml-auto px-6 max-h-full mt-16 scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-500 overflow-y-scroll"
			>
				<NuxtNestedPage />
			</div>
		</div>
		<MoeFooter class="h-16 fixed bottom-0 w-full border-t border-teal-700" />
		<MoeModal />
	</div>
</template>

<script setup lang="ts">
import { Modal } from "~~/models/enums/Modal";

const mainStore = useMainStore()
const collectionStore = useCollectionStore()

if (process.server) {
	if (useRoute().name === "index-collection-collection") {
		const id = useRoute().path.split("/")[2]
		if (id.match(/\w{21}/)) {
			useCookie("collectionId").value = id
		}
	}
	await collectionStore.loadCollection()
}

onMounted(() => {
	const lsTutorial = window.localStorage.getItem("tutorial");
	if (lsTutorial) {
		mainStore.tutorial = parseInt(lsTutorial);
	} else {
		mainStore.modal = Modal.TUTORIAL;
	}
})
</script>

<style lang="postcss">
.content-height {
	height: calc(100vh - theme("height.32"));
}
</style>
