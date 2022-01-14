<template>
	<div
		class="border-teal-700 border-l border-r flex items-center flex-col mr-px justify-around z-10 w-[8rem] dark:bg-gray-800 bg-gray-500"
	>
		<NuxtLink v-slot="{ navigate }" custom to="/imprint">
			<h2
				class="border-t border-teal-700 cursor-pointer w-full text-center py-2"
				role="link"
				@click="navigate"
			>Imprint</h2>
		</NuxtLink>
		<NuxtLink v-slot="{ navigate }" custom to="/faq">
			<h2
				class="cursor-pointer w-full border-t border-teal-700 text-center py-2"
				role="link"
				@click="navigate"
			>FAQ</h2>
		</NuxtLink>
		<div
			class="cursor-pointer border-t border-teal-700 w-full text-center py-2"
			role="link"
			@click="mainStore.modal = Modal.CONTACTUS"
		>Contact us</div>
		<div
			class="cursor-pointer border-t border-teal-700 w-full text-center py-2"
			role="link"
			@click="openTutorial"
		>Tutorial</div>
	</div>
</template>


<script setup lang="ts">
import { Modal } from "~~/models/enums/Modal";
import { useMainStore } from "~~/store/main";


const mainStore = useMainStore()


function openTutorial() {
	mainStore.tutorial = 1
	mainStore.modal = Modal.TUTORIAL
}
</script>
