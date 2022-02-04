<template>
	<div>
		<div
			v-for="(list, index) in collection.lists"
			:ref="list.id"
			:key="list.id"
			:class="{
				'hover:bg-gray-500 dark-hover:bg-gray-600': list.id !== listStore.list.id,
				'bg-gray-300 dark:bg-gray-800': index % 2 !== 0,
				'bg-gray-400 dark:bg-gray-700': index % 2 === 0,
				'!bg-teal-500 dark:!bg-teal-500  dark-hover:!bg-teal-400  hover:!bg-teal-400': list.id === listStore.list.id,
			}"
			@click="openList(list)"
			class="flex h-24 items-center rounded cursor-pointer my-1"
		>
			<div class="w-2/5 text-center">{{ list.id }}</div>
			<form class="w-2/5 text-center relative">
				<input
					:value="list.name"
					@click.stop
					@input="updateListname(list.id, $event)"
					type="text"
					class="rounded-lg border text-gray-900 bg-gray-300 focus:outline-none w-full"
				/>
			</form>
			<div class="w-1/6 text-center">
				{{
					list.characters.length !== 1 ? `${list.characters.length} entries` : 'one Entry'
				}}
			</div>
			<div class="w-1/6 text-center flex gap-2 justify-center">
				<!-- <MoeButton :text="'Share'" class="w-16" color="dark:bg-gray-600 bg-gray-400 m-1" /> -->
				<MoeButtonDark
					v-tooltip="'Export'"
					@click.stop.native="exportList(list)"
					class="w-18 px-1"
					icon="fas fa-file-export"
				/>
				<MoeButtonDark
					v-tooltip="'Delete'"
					@click.stop.native="deleteList(list)"
					class="w-18 px-1 !bg-red-400 dark:!bg-red-600 dark-hover:!bg-red-700 hover:!bg-red-500 !text-color-unset"
					icon="fas fa-trash"
				/>
				<MoeButtonDark
					v-tooltip="'Copy'"
					@click.stop.native="copyList(list)"
					class="w-18 px-1"
					icon="fas fa-copy"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { saveAs } from "file-saver";
import { Modal } from "~/models/enums/Modal";
import { List } from "~/models/interfaces/List";

const mainStore = useMainStore()
const collectionStore = useCollectionStore()
const listStore = useListStore()

const collection = computed(() => collectionStore.collection)

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
	navigator.clipboard.writeText(JSON.stringify(list));
}

</script>
