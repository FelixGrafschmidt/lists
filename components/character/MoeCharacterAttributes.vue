<template>
	<form class="w-1/2 flex flex-col h-[80vh] justify-between" @submit.prevent="isNewCharacter ? saveNewCharacter() : saveChanges()">
		<div
			class="max-h-[85%] min-h-[85%] pr-8 scrollbar-thin scrollbar-track-rounded scrollbar-thumb-rounded scrollbar-track-gray-800 scrollbar-thumb-gray-500 overflow-auto pl-1"
		>
			<div class="py-2">
				<label>
					Name
					<input
						:value="character.name"
						type="text"
						class="block px-1 rounded-lg border text-gray-900 bg-gray-300 focus:outline-none h-8 w-full"
						@input="changeName"
					/>
				</label>
			</div>
			<div class="py-2">
				<label>
					Origin
					<input
						:value="character.origin"
						type="text"
						class="block px-1 rounded-lg border text-gray-900 bg-gray-300 focus:outline-none h-8 w-full"
						@input="changeOrigin"
					/>
				</label>
			</div>
			<div v-for="(attribute, i) in character.attributeArray" :key="i" class="py-2 relative">
				<span
					v-tooltip="'Remove Attribute'"
					class="items-center justify-center top-9 right-0 flex bg-red-600 hover:bg-red-700 text-gray-900 h-8 w-8 rounded-lg cursor-pointer absolute fas fa-times"
					@click="removeAttribute(attribute)"
				></span>
				<label>
					<input
						v-model="attribute.name"
						type="text"
						class="h-6 p-1 block border border-teal-500 rounded text-gray-100 bg-gray-900 focus:outline-none w-32 mb-1 pl-0"
					/>
					<input
						v-model="attribute.value"
						type="text"
						class="block px-1 rounded-lg border text-gray-900 bg-gray-300 focus:outline-none h-8 w-full"
					/>
				</label>
			</div>
			<div class="flex justify-center mt-8">
				<MoeButton
					v-tooltip="'Add Attribute'"
					icon="fas fa-plus"
					class="py-2 w-48 bg-gray-500 h-10"
					@click.prevent="addAttribute"
				/>
			</div>
		</div>
		<div class="flex justify-center gap-8 max-h-[10%] min-h-[10%]">
			<MoeButton v-tooltip="'Save Character'" icon="fas fa-save" class="py-2 w-24 h-12 bg-green-600 text-color-unset" />
			<MoeButton
				v-tooltip="'Delete Character'"
				icon="fas fa-trash"
				class="py-2 w-24 h-12 bg-red-600 text-color-unset"
				@click="isNewCharacter ? discardCharacter() : deleteCharacter()"
			/>
			<div v-if="copied">
				<MoeButton
					v-tooltip="'Delete Character'"
					icon="fas fa-trash"
					class="py-2 w-24 h-12 bg-gray-500"
					@click.prevent="copyCharacter"
					>Copied!</MoeButton
				>
			</div>
			<MoeButton
				v-else
				v-tooltip="'Copy Character'"
				icon="fas fa-copy"
				class="py-2 w-24 h-12 bg-gray-500"
				@click.prevent="copyCharacter"
			/>
			<MoeButton
				v-tooltip="'Export Character'"
				icon="fas fa-file-export"
				class="py-2 w-24 h-12 bg-gray-500"
				@click.prevent="exportCharacter"
			/>
		</div>
	</form>
</template>

<script setup lang="ts">
	import pkg from "file-saver";
	import { Modal } from "~/models/enums/Modal";
	import { CharacterAttribute } from "~~/models/interfaces/Character";
	const { saveAs } = pkg;

	const mainStore = useMainStore();
	const listStore = useListStore();
	const characterStore = useCharacterStore();

	const copied = ref(false);
	const character = characterStore.character;
	const characters = listStore.list.characters;
	const isNewCharacter = computed(() => {
		return !(characters.filter((listCharacter) => listCharacter.id === character.id).length > 0);
	});

	async function saveNewCharacter() {
		listStore.addCharacter({ character, index: -1 });
		await backToCharacterList();
	}

	async function saveChanges() {
		await backToCharacterList();
	}

	async function discardCharacter() {
		characterStore.resetCharacter();
		await backToCharacterList();
	}

	function deleteCharacter() {
		mainStore.modal = Modal.DELETECHARACTER;
	}

	function changeName(event: Event) {
		const name = (event.target as HTMLInputElement).value;
		characterStore.changeCharacterName(name);
	}

	function changeOrigin(event: Event) {
		const origin = (event.target as HTMLInputElement).value;
		characterStore.changeCharacterOrigin(origin);
	}

	function copyCharacter() {
		copied.value = true;
		window.setTimeout(() => {
			copied.value = false;
		}, 1000 * 2);
		navigator.clipboard.writeText(JSON.stringify(character));
	}

	function exportCharacter() {
		saveAs(new File([JSON.stringify(character)], character.name + ".json"));
	}

	function backToCharacterList() {
		characterStore.resetCharacter();
		mainStore.toList();
	}

	function addAttribute() {
		characterStore.addAttribute();
	}

	function removeAttribute(attribute: CharacterAttribute) {
		characterStore.removeAttribute(attribute);
	}
</script>
