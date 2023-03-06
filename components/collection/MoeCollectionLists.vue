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
				'bg-teal-500  hover:bg-teal-400': list.id === listStore.list.id,
			}"
			class="flex h-24 items-center rounded cursor-pointer my-1"
			@click="openList(list)"
		>
			<div class="w-2/5 text-center">{{ list.id }}</div>
			<form class="w-2/5 text-center relative">
				<input
					:value="list.name"
					type="text"
					class="rounded-lg border text-gray-900 bg-gray-300 focus:outline-none w-full p-2"
					@click.stop
					@input="updateListname(list.id, $event)"
				/>
			</form>
			<div class="w-1/6 text-center">
				{{ list.characters.length !== 1 ? `${list.characters.length} entries` : "one Entry" }}
			</div>
			<div class="w-1/6 text-center flex gap-2 justify-center">
				<!-- <MoeButton :text="'Share'" class="w-16" color="bg-gray-600 m-1" /> -->
				<MoeButton v-tooltip="'Export'" class="w-10 bg-gray-500" icon="fas fa-file-export" @click.stop="exportList(list)" />
				<MoeButton v-tooltip="'Delete'" class="w-10 bg-red-600" icon="fas fa-trash" @click.stop="deleteList(list)" />
				<MoeButton v-tooltip="'Copy'" class="w-10 bg-gray-500" icon="fas fa-copy" @click.stop="copyList(list)" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { saveAs } from "file-saver";
	import { Modal } from "~/models/enums/Modal";
	import { List } from "~/models/interfaces/List";

	const mainStore = useMainStore();
	const collectionStore = useCollectionStore();
	const listStore = useListStore();

	const collection = computed(() => collectionStore.collection);

	function deleteList(list: List) {
		mainStore.modal = Modal.DELETELIST;
		collectionStore.setListToDelete(list);
	}

	function exportList(list: List) {
		saveAs(new File([JSON.stringify(list)], list.name + ".json"));
	}

	function openList(list: List) {
		listStore.setList(list);
		mainStore.toList();
	}

	function updateListname(id: string, event: Event) {
		const name = (event.target as HTMLInputElement).value;
		collectionStore.renameList({ name, id });
	}

	function copyList(list: List) {
		useClipboard({ source: JSON.stringify(list) }).copy();
	}
</script>
