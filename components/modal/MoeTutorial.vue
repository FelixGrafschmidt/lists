<template>
	<div
		class="w-[80vw] rounded-2xl dark:bg-gray-800 bg-gray-400 dark:text-gray-100 text-gray-900 grid relative m-auto pb-10 max-w-4xl px-10"
		@click.stop
	>
		<div class="text-3xl pt-8 pb-10 self-center text-center h-12">Tutorial</div>
		<div class="flex justify-center w-full">
			<div class="w-36 bg-gray-600 h-2 rounded flex">
				<div
					v-for="index in mainStore.tutorial"
					:key="index"
					:class="{
						'rounded-r': index === 3,
						'rounded-l': index === 1,
					}"
					class="h-2 w-12 bg-teal-400"
				></div>
			</div>
		</div>
		<div class="flex justify-between">
			<MoeButtonDark
				:class="{ 'pointer-events-none cursor-not-allowed !bg-gray-500 dark:bg-gray-500': mainStore.tutorial === 1 }"
				:disabled="mainStore.tutorial === 1"
				icon="fas fa-angle-left"
				@click="previous"
			/>
			<component :is="step" class="h-72 pt-8 px-8 w-full" />
			<MoeButtonDark
				:class="{ 'pointer-events-none cursor-not-allowed !bg-gray-500 dark:bg-gray-500': mainStore.tutorial === 3 }"
				:disabled="mainStore.tutorial === 3"
				icon="fas fa-angle-right"
				@click="next"
			/>
		</div>
		<div class="flex justify-center h-8">
			<MoeButtonDark v-show="mainStore.tutorial === 3" @click="newList">Create New List</MoeButtonDark>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Modal } from "~~/models/enums/Modal";


const step = computed(() => {
	switch (mainStore.tutorial) {
		case 1:
			return "MoeTutorial1"
		case 2:
			return "MoeTutorial2"
		case 3:
			return "MoeTutorial3"
	}

})

const mainStore = useMainStore()

onMounted(() => {
	window.localStorage.setItem("tutorial", mainStore.tutorial.toString());
})



function next() {
	mainStore.tutorial++;
	window.localStorage.setItem("tutorial", mainStore.tutorial.toString());
}

function previous() {
	mainStore.tutorial--;
	window.localStorage.setItem("tutorial", mainStore.tutorial.toString());
}

function newList() {
	mainStore.modal = Modal.NONE
	mainStore.toCollection();
	mainStore.modal = Modal.NEWLIST
}

</script>
