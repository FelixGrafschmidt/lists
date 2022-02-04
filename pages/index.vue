<template>
	<div class="mt-4">
		<h2 class="text-xl font-bold">To get started select a menu item on the left</h2>
	</div>
</template>

<script setup lang="ts">import { Modal } from "~~/models/enums/Modal";

const mainStore = useMainStore()

onMounted(() => {
	const lsTutorial = window.localStorage.getItem("tutorial");
	if (lsTutorial) {
		mainStore.tutorial = parseInt(lsTutorial);
	} else {
		mainStore.modal = Modal.TUTORIAL;
	}
})
</script>
