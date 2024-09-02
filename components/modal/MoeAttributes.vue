<template>
	<div class="relative m-auto max-h-[80vh] w-[60vw] flex flex-col rounded-2xl bg-gray-800 pb-10 pt-5 text-gray-100" @click.stop>
		<div class="max-h-[85%] min-h-[85%] flex justify-evenly">
			<div>
				<span>Select all Characters to apply these attributes to</span>
				<div
					class="mt-4 max-h-[90%] min-h-[90%] flex flex-col overflow-y-scroll px-4 scrollbar-thumb-color-gray-9 scrollbar-track-color-gray-500 scrollbar-radius-2 scrollbar-thumb-radius-4 scrollbar-track-radius-4 scrollbar-w-2 scrollbar scrollbar-rounded"
				>
					<label
						v-for="character in characters"
						:id="character.id"
						ref="characterLabel"
						:key="character.id"
						class="flex flex-row items-center py-1"
					>
						<input type="checkbox" checked class="rounded text-teal-500 shadow-none ring-0 ring-offset-0 focus:outline-none" />
						<span class="ml-1 select-none">{{ character.name }}</span>
					</label>
				</div>
			</div>
			<form class="flex flex-col" @submit.prevent>
				<div
					class="overflow-y-scroll px-2 scrollbar-thumb-color-gray-9 scrollbar-track-color-gray-500 scrollbar-radius-2 scrollbar-thumb-radius-4 scrollbar-track-radius-4 scrollbar-w-2 scrollbar scrollbar-rounded"
				>
					<div v-for="(attribute, i) in attributes" :key="i">
						<span
							v-tooltip="'Remove Attribute'"
							class="fas fa-times absolute right-0 top-6 h-8 w-8 flex cursor-pointer items-center justify-center rounded-lg bg-red-600 text-gray-900 hover:bg-red-700"
							@click="removeAttribute(i)"
						></span>
						<label>
							<span>New Attribute</span>
							<input
								v-model="attributes[i]"
								type="text"
								class="mb-8 block h-8 w-80 border rounded-lg bg-gray-300 text-gray-900 focus:outline-none"
							/>
						</label>
					</div>
					<div class="flex justify-center">
						<MoeButton
							v-tooltip="'New Attribute'"
							icon="fas fa-plus"
							class="w-48 bg-gray-500 py-2"
							@click.prevent="attributes.push('')"
						/>
					</div>
				</div>
			</form>
		</div>

		<MoeButton
			:class="{ 'cursor-not-allowed': attributes.length === 0 }"
			class="m-auto bg-gray-500"
			@click.prevent="attributes.length !== 0 ? addAttributes() : undefined"
			>Add all Attributes</MoeButton
		>
		<div
			class="absolute right-1 top-1 h-6 w-6 flex cursor-pointer items-center justify-center rounded-2xl bg-red-600 text-gray-900 hover:bg-red-700"
			@click="mainStore.modal = Modal.NONE"
		>
			<div class="fas fa-times"></div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { Modal } from "~~/models/enums/Modal";

	const attributes = ref(new Array<string>());

	const selectedCharacters = ref(new Array<string>());
	const characterLabels = ref();

	const mainStore = useMainStore();
	const listStore = useListStore();

	const characters = listStore.list.characters;

	function addAttributes() {
		const elements = characterLabels.value as Element[];
		elements.forEach((element) => {
			if ((element.firstElementChild as HTMLInputElement).checked) {
				selectedCharacters.value.push(element.id);
			}
		});

		listStore.addAttributesToCharacters({ attributes: attributes.value, characters: selectedCharacters.value });
		mainStore.modal = Modal.NONE;
	}

	function removeAttribute(index: number) {
		attributes.value.splice(index, 1);
	}
</script>
