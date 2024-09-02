<template>
	<div class="mr-px w-[8rem] flex flex-col items-center justify-around border-l border-r border-teal-700 bg-gray-800">
		<NuxtLink class="w-full cursor-pointer border-t border-teal-700 py-2 text-center" role="link" to="/imprint"> Imprint </NuxtLink>
		<NuxtLink to="/faq" class="w-full cursor-pointer border-t border-teal-700 py-2 text-center" role="link"> FAQ </NuxtLink>
		<div class="w-full cursor-pointer border-t border-teal-700 py-2 text-center" role="link" @click="mainStore.modal = Modal.CONTACTUS">
			Contact us
		</div>
		<div class="w-full cursor-pointer border-t border-teal-700 py-2 text-center" role="link" @click="openTutorial">Tutorial</div>
	</div>
</template>

<script setup lang="ts">
	import { Modal } from "@/models/enums/Modal";

	const mainStore = useStore();

	function openTutorial() {
		mainStore.tutorial = 1;
		mainStore.modal = Modal.TUTORIAL;
	}
</script>
