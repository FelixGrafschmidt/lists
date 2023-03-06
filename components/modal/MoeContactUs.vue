<template>
	<div class="rounded-2xl bg-gray-800 text-gray-100 grid relative m-auto pb-10" @click.stop>
		<div class="text-3xl pt-8 self-center text-center">Contact us</div>
		<div class="mt-12 px-16">
			Feel free to
			<a class="hover:text-blue-300 text-blue-500" target="_blank" href="https://github.com/Ithambar/character_viewer/issues/new"
				>raise an issue</a
			>
			on our Github page or
			<a class="hover:text-blue-300 text-blue-500" target="_blank" href="https://github.com/Ithambar/character_viewer/issues"
				>add more info</a
			>
			to an existing issue.
			<br />You can also
			<a
				class="hover:text-blue-300 text-blue-500"
				target="_blank"
				href="mailto:ithambar.lethenain@gmail.com?subject=Issue%20on%20character%20manager%20webpage"
				>send us an eMail</a
			>
		</div>
		<div
			class="items-center justify-center top-1 right-1 flex bg-red-600 hover:bg-red-700 text-gray-100 h-6 w-6 rounded-2xl cursor-pointer absolute"
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
