<template>
	<div class="relative grid m-auto rounded-2xl bg-gray-800 pb-10 text-gray-100" @click.stop>
		<div class="self-center pt-8 text-center text-3xl">Contact us</div>
		<div class="mt-12 px-16">
			Feel free to
			<a class="text-blue-500 hover:text-blue-300" target="_blank" href="https://github.com/Ithambar/character_viewer/issues/new"
				>raise an issue</a
			>
			on our Github page or
			<a class="text-blue-500 hover:text-blue-300" target="_blank" href="https://github.com/Ithambar/character_viewer/issues"
				>add more info</a
			>
			to an existing issue.
			<br />You can also
			<a
				class="text-blue-500 hover:text-blue-300"
				target="_blank"
				href="mailto:ithambar.lethenain@gmail.com?subject=Issue%20on%20character%20manager%20webpage"
				>send us an eMail</a
			>
		</div>
		<div
			class="absolute right-1 top-1 h-6 w-6 flex cursor-pointer items-center justify-center rounded-2xl bg-red-600 text-gray-100 hover:bg-red-700"
			@click="mainStore.modal = Modal.NONE"
		>
			<div class="fas fa-times"></div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { Modal } from "~~/models/enums/Modal";

	const mainStore = useMainStore();
</script>
