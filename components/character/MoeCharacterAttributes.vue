<template>
	<form class="h-80vh w-1/2 flex flex-col justify-between" @submit.prevent="saveChanges">
		<div
			class="h-85% flex flex-col items-center overflow-auto px-8 scrollbar-thumb-color-gray-9 scrollbar-track-color-gray-500 scrollbar-radius-2 scrollbar-thumb-radius-4 scrollbar-track-radius-4 scrollbar-w-2 scrollbar scrollbar-rounded"
		>
			<div class="w-full pb-2">
				<label>
					Name
					<input
						:value="character.name"
						type="text"
						class="block h-8 w-full border rounded-lg bg-gray-300 px-1 text-gray-900 focus:outline-none"
						@input="changeName"
					/>
				</label>
			</div>
			<div class="w-full py-2">
				<label>
					Origin
					<input
						:value="character.origin"
						type="text"
						class="block h-8 w-full border rounded-lg bg-gray-300 px-1 text-gray-900 focus:outline-none"
						@input="changeOrigin"
					/>
				</label>
			</div>
			<div v-for="(attribute, i) in character.attributeArray" :key="i" class="relative w-full py-2">
				<span
					v-tooltip="'Remove Attribute'"
					class="fas fa-times absolute right-0 top-9 h-8 w-8 flex cursor-pointer items-center justify-center rounded-lg bg-red-600 text-gray-900 hover:bg-red-700"
					@click.prevent="removeAttribute(attribute)"
				/>
				<label>
					<input
						v-model="attribute.name"
						type="text"
						class="mb-1 block h-6 w-32 border border-teal-500 rounded bg-gray-900 p-1 pl-0 text-gray-100 focus:outline-none"
					/>
					<input
						v-model="attribute.value"
						type="text"
						class="block h-8 w-full border rounded-lg bg-gray-300 px-1 text-gray-900 focus:outline-none"
					/>
				</label>
			</div>
			<div class="mt-8 flex justify-center">
				<MoeButton icon="fas fa-plus" class="h-10 w-48 bg-gray-500 py-2" @click.prevent="addAttribute">Add Attribute</MoeButton>
			</div>
		</div>
		<div class="h-7% flex items-center justify-center gap-2">
			<MoeButton icon="fas fa-save" class="text-color-unset h-10 w-auto bg-green-600 py-2"> Save Character </MoeButton>
			<MoeButton icon="fas fa-trash" class="text-color-unset h-10 w-auto bg-red-600 py-2" @click.prevent="deleteCharacter">
				Delete character
			</MoeButton>
			<div v-if="copied">
				<MoeButton icon="fas fa-trash" class="h-10 w-auto bg-gray-500 py-2" @click.prevent="copyCharacter"> Copied! </MoeButton>
			</div>
			<MoeButton v-else icon="fas fa-copy" class="h-10 w-auto bg-gray-500 py-2" @click.prevent="copyCharacter"
				>Copy Character</MoeButton
			>
			<MoeButton icon="fas fa-file-export" class="h-10 w-auto bg-gray-500 py-2" @click.prevent="exportCharacter"
				>Export Character</MoeButton
			>
		</div>
	</form>
</template>

<script setup lang="ts">
	import pkg from "file-saver";
	import { Modal } from "~/models/enums/Modal";
	import type { CharacterAttribute } from "@/models/interfaces/Character";
	const { saveAs } = pkg;

	const mainStore = useStore();
	const collectionStore = useCollection();
	const characterStore = useCharacter();

	const copied = ref(false);
	const character = characterStore.character;

	async function saveChanges() {
		mainStore.loading = true;
		try {
			await collectionStore.saveChanges();
			mainStore.modal = Modal.NONE;
		} catch (error) {
			console.error(error);

			mainStore.modal = Modal.SAVEERROR;
		} finally {
			mainStore.loading = false;
		}
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

	async function backToCharacterList() {
		characterStore.resetCharacter();
		await mainStore.toList();
	}

	function addAttribute() {
		characterStore.addAttribute();
	}

	function removeAttribute(attribute: CharacterAttribute) {
		characterStore.removeAttribute(attribute);
	}
</script>
