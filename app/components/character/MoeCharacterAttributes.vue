<template>
  <form class="h-80vh w-1/2 flex flex-col justify-between" @submit.prevent="saveChanges">
    <div
      class="h-85% flex flex-col items-center overflow-auto px-8 scrollbar scrollbar-thumb-color-gray-9 scrollbar-track-color-gray-500 scrollbar-rounded scrollbar-radius-2 scrollbar-thumb-radius-4 scrollbar-track-radius-4 scrollbar-w-2"
    >
      <div class="w-full pb-2">
        <label>
          Name
          <input
            :value="character.name" type="text"
            class="block h-8 w-full border rounded-lg bg-gray-300 px-1 text-gray-900 focus:outline-none"
            @input="changeName"
          >
        </label>
      </div>
      <div class="w-full py-2">
        <label>
          Origin
          <input
            :value="character.origin" type="text"
            class="block h-8 w-full border rounded-lg bg-gray-300 px-1 text-gray-900 focus:outline-none"
            @input="changeOrigin"
          >
        </label>
      </div>
      <div v-for="(attribute, i) in character.attributeArray" :key="i" class="relative w-full py-2">
        <span
          v-tooltip="'Remove Attribute'"
          class="fa:times absolute right-0 top-9 h-8 w-8 flex cursor-pointer items-center justify-center rounded-lg bg-red-600 text-gray-900 hover:bg-red-700"
          @click.prevent="removeAttribute(attribute)"
        />
        <label>
          <input
            v-model="attribute.name" type="text"
            class="mb-1 block h-6 w-32 border border-teal-500 rounded bg-gray-900 p-1 pl-0 text-gray-100 focus:outline-none"
          >
          <input
            v-model="attribute.value" type="text"
            class="block h-8 w-full border rounded-lg bg-gray-300 px-1 text-gray-900 focus:outline-none"
          >
        </label>
      </div>
      <div class="mt-8 flex justify-center">
        <FGButton icon="fa:plus" variant="outline" color="gray" size="lg" @click.prevent="addAttribute">
          Add Attribute
        </FGButton>
      </div>
    </div>
    <div class="h-7% flex items-center justify-center gap-4 px-8">
      <div class="w-1/4">
        <FGButton v-tooltip="'Save Character'" fullwidth icon="fa:save" variant="outline" color="green" size="lg">
          Save
        </FGButton>
      </div>
      <div class="w-1/4">
        <FGButton
          v-tooltip="'Delete Character'" icon="fa:trash" fullwidth variant="outline" color="red" size="lg"
          @click.prevent="deleteCharacter"
        >
          Delete
        </FGButton>
      </div>
      <div class="w-1/4">
        <FGButton
          v-tooltip="'Copy Character'" icon="fa:copy" fullwidth variant="outline" color="gray" size="lg"
          @click.prevent="copyCharacter"
        >
          <span v-if="copied">
            Copied!
          </span>
          <span v-else>
            Copy
          </span>
        </FGButton>
      </div>
      <div class="w-1/4">
        <FGButton
          v-tooltip="'Export Character'" icon="fa:floppy-o" fullwidth variant="outline" color="gray" size="lg"
          @click.prevent="exportCharacter"
        >
          Export
        </FGButton>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { CharacterAttribute } from '@@/models/interfaces/Character';
import { Modal } from '@@/models/enums/Modal';
import pkg from 'file-saver';

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
  }
  catch (error) {
    console.error(error);

    mainStore.modal = Modal.SAVEERROR;
  }
  finally {
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
  saveAs(new File([JSON.stringify(character)], `${character.name}.json`));
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
