<template>
	<div
		class="flex flex-col rounded-2xl dark:bg-gray-800 bg-gray-400 dark:text-gray-100 text-gray-900 relative m-auto pb-10 pt-5 max-h-[80vh] w-[60vw]"
		@click.stop
	>
		<div class="flex justify-evenly max-h-[85%] min-h-[85%]">
			<div>
				<span>Select all Characters to apply these attributes to</span>
				<div
					class="flex flex-col scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-gray-500 dark:scrollbar-track-gray-700 dark:scrollbar-thumb-gray-500 scrollbar-track-rounded scrollbar-thumb-rounded overflow-y-scroll max-h-[90%] min-h-[90%] px-4 mt-4"
				>
					<label
						v-for="character in characters"
						:id="character.id"
						ref="characterLabel"
						:key="character.id"
						class="flex flex-row items-center py-1"
					>
						<input
							type="checkbox"
							checked
							class="rounded text-teal-500 !focus:outline-none !shadow-none !ring-offset-0 !ring-0"
						/>
						<span class="ml-1 select-none">{{ character.name }}</span>
					</label>
				</div>
			</div>
			<form class="flex flex-col" @submit.prevent>
				<div
					class="scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-gray-500 dark:scrollbar-track-gray-700 dark:scrollbar-thumb-gray-500 scrollbar-track-rounded scrollbar-thumb-rounded overflow-y-scroll px-2"
				>
					<div v-for="(attribute, i) in attributes" :key="i">
						<span
							v-tooltip="'Remove Attribute'"
							class="items-center justify-center top-6 right-0 flex dark:bg-red-600 bg-red-400 dark-hover:bg-red-700 hover:bg-red-500 dark:text-gray-900 text-gray-100 h-8 w-8 rounded-lg cursor-pointer absolute fas fa-times"
							@click="removeAttribute(i)"
						></span>
						<label>
							<span>New Attribute</span>
							<input
								v-model="attributes[i]"
								v-autofocus
								type="text"
								class="block rounded-lg border text-gray-900 bg-gray-300 focus:outline-none mb-8 w-80 h-8"
							/>
						</label>
					</div>
					<div class="flex justify-center">
						<MoeButtonDark
							v-tooltip="'New Attribute'"
							icon="fas fa-plus"
							class="py-2 w-48"
							@click.prevent="attributes.push('')"
						/>
					</div>
				</div>
			</form>
		</div>

		<MoeButtonDark
			:class="{ 'cursor-not-allowed': attributes.length === 0 }"
			class="m-auto"
			@click.prevent="attributes.length !== 0 ? addAttributes() : undefined"
		>Add all Attributes</MoeButtonDark>
		<div
			class="items-center justify-center top-1 right-1 flex dark:bg-red-600 bg-red-400 dark-hover:bg-red-700 hover:bg-red-500 dark:text-gray-900 text-gray-100 h-6 w-6 rounded-2xl cursor-pointer absolute"
			@click="mainStore.modal = Modal.NONE"
		>
			<div class="fas fa-times"></div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Modal } from "~~/models/enums/Modal";
import { useListStore } from "~~/store/list";
import { useMainStore } from "~~/store/main";

// eslint-disable-next-line no-array-constructor
const attributes = ref(new Array<string>())
// eslint-disable-next-line no-array-constructor
const selectedCharacters = ref(new Array<string>())
const characterLabels = ref()

const mainStore = useMainStore()
const listStore = useListStore()

const characters = listStore.list.characters

function addAttributes() {
	const elements = characterLabels.value as Element[];
	elements.forEach((element) => {
		if ((element.firstElementChild as HTMLInputElement).checked) {
			selectedCharacters.value.push(element.id);
		}
	});

	listStore.addAttributesToCharacters({ attributes: attributes.value, characters: selectedCharacters.value });
	mainStore.modal = Modal.NONE
}

function removeAttribute(index: number) {
	attributes.value.splice(index, 1);
}
</script>
