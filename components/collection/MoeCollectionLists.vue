<template>
	<div>
		<div
			v-for="(list, index) in collection.lists"
			:ref="list.id"
			:key="list.id"
			:class="{
				'hover:bg-gray-600': list.id !== listStore.list.id,
				'bg-gray-800': index % 2 !== 0,
				'bg-gray-700': index % 2 === 0,
				'bg-teal-700  hover:bg-teal-600': list.id === listStore.list.id,
			}"
			class="my-1 h-24 flex cursor-pointer items-center rounded"
			@click="openList(list)"
		>
			<div class="w-2/5 text-center">{{ list.id }}</div>
			<form class="relative w-2/5 text-center">
				<input
					:value="list.name"
					type="text"
					class="w-full border rounded-lg bg-gray-300 p-2 text-gray-900 focus:outline-none"
					@click.stop
					@input="updateListname(list.id, $event)"
				/>
			</form>
			<div class="w-1/6 text-center">
				{{ list.characters.length !== 1 ? `${list.characters.length} entries` : "one Entry" }}
			</div>
			<div class="w-1/6 flex justify-center gap-2 text-center">
				<!-- <MoeButton :text="'Share'" class="w-16" color="bg-gray-600 m-1" /> -->
				<MoeButton v-tooltip="'Export'" class="w-10 bg-gray-500" icon="fa:floppy-o" @click.stop="exportList(list)" />
				<MoeButton v-tooltip="'Delete'" class="w-10 bg-red-600" icon="fa:trash" @click.stop="deleteList(list)" />
				<MoeButton v-tooltip="'Copy'" class="w-10 bg-gray-500" icon="fa:copy" @click.stop="copyList(list)" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import pkg from "file-saver";
	import { Modal } from "~/models/enums/Modal";
	import type { List } from "~/models/interfaces/List";
	const { saveAs } = pkg;

	const mainStore = useStore();
	const collectionStore = useCollection();
	const listStore = useList();

	const collection = computed(() => collectionStore.collection);

	function deleteList(list: List) {
		mainStore.modal = Modal.DELETELIST;
		collectionStore.setListToDelete(list);
	}

	function exportList(list: List) {
		saveAs(new File([JSON.stringify(list)], list.name + ".json"));
	}

	async function openList(list: List) {
		listStore.setList(list);
		await mainStore.toList();
	}

	function updateListname(id: string, event: Event) {
		const name = (event.target as HTMLInputElement).value;
		collectionStore.renameList({ name, id });
	}

	function copyList(list: List) {
		useClipboard({ source: JSON.stringify(list) }).copy();
	}
</script>
