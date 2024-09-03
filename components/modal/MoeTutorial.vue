<template>
	<div class="relative grid m-auto max-w-4xl w-[80vw] rounded-2xl bg-gray-800 px-10 pb-10 text-gray-100" @click.stop>
		<div class="h-12 self-center pb-10 pt-8 text-center text-3xl">Tutorial</div>
		<div class="w-full flex justify-center">
			<div class="h-2 w-36 flex rounded bg-gray-600">
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
		<div class="justify-betwee flex">
			<MoeButton
				:class="{
					'pointer-events-none cursor-not-allowed bg-gray-500': mainStore.tutorial === 1,
					'bg-gray-700': mainStore.tutorial !== 1,
				}"
				:disabled="mainStore.tutorial === 1"
				icon="fa:angle-left"
				@click="previous"
			/>
			<!-- TODO: Why does this not work anymore??? -->
			<!-- <component :is="step" class="h-72 pt-8 px-8 w-full" /> -->
			<MoeTutorial1 v-if="step === 'MoeTutorial1'" class="h-72 w-full px-8 pt-8" />
			<MoeTutorial2 v-else-if="step === 'MoeTutorial2'" class="h-72 w-full px-8 pt-8" />
			<MoeTutorial3 v-else-if="step === 'MoeTutorial3'" class="h-72 w-full px-8 pt-8" />
			<MoeButton
				:class="{
					'pointer-events-none cursor-not-allowed bg-gray-500': mainStore.tutorial === 3,
					'bg-gray-700': mainStore.tutorial !== 3,
				}"
				:disabled="mainStore.tutorial === 3"
				icon="fa:angle-right"
				@click="next"
			/>
		</div>
		<div class="h-8 flex justify-center">
			<MoeButton v-show="mainStore.tutorial === 3" class="bg-gray-700" @click="newList">Create New List</MoeButton>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { Modal } from "@/models/enums/Modal";

	const step = computed(() => {
		switch (mainStore.tutorial) {
			case 1:
				return "MoeTutorial1";
			case 2:
				return "MoeTutorial2";
			case 3:
				return "MoeTutorial3";
			default:
				return "MoeTutorial1";
		}
	});

	const mainStore = useStore();

	onMounted(() => {
		window.localStorage.setItem("tutorial", mainStore.tutorial.toString());
	});

	function next() {
		mainStore.tutorial++;
		window.localStorage.setItem("tutorial", mainStore.tutorial.toString());
	}

	function previous() {
		mainStore.tutorial--;
		window.localStorage.setItem("tutorial", mainStore.tutorial.toString());
	}

	async function newList() {
		mainStore.modal = Modal.NONE;
		await mainStore.toCollection();
		mainStore.modal = Modal.NEWLIST;
	}
</script>
