<template>
	<div class="border-teal-700 border-l border-r flex items-center flex-col mr-px justify-around w-[8rem] bg-gray-800">
		<NuxtLink class="border-t border-teal-700 cursor-pointer w-full text-center py-2" role="link" to="/imprint"> Imprint </NuxtLink>
		<NuxtLink to="/faq" class="cursor-pointer w-full border-t border-teal-700 text-center py-2" role="link"> FAQ </NuxtLink>
		<div class="cursor-pointer border-t border-teal-700 w-full text-center py-2" role="link" @click="mainStore.modal = Modal.CONTACTUS">
			Contact us
		</div>
		<div class="cursor-pointer border-t border-teal-700 w-full text-center py-2" role="link" @click="openTutorial">Tutorial</div>
	</div>
</template>

<script setup lang="ts">
	import { Modal } from "~~/models/enums/Modal";

	const mainStore = useMainStore();

	function openTutorial() {
		mainStore.tutorial = 1;
		mainStore.modal = Modal.TUTORIAL;
	}
</script>
