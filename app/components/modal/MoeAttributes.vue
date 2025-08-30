<template>
  <div
    class="relative m-auto max-h-[80vh] w-[60vw] flex flex-col rounded-2xl bg-gray-800 pb-10 pt-5 text-gray-100"
    @click.stop
  >
    <div class="max-h-[85%] min-h-[85%] flex justify-evenly">
      <div>
        <span>Select all Characters to apply these attributes to</span>
        <div
          class="mt-4 max-h-[90%] min-h-[90%] flex flex-col overflow-y-scroll px-4 scrollbar scrollbar-thumb-color-gray-9 scrollbar-track-color-gray-500 scrollbar-rounded scrollbar-radius-2 scrollbar-thumb-radius-4 scrollbar-track-radius-4 scrollbar-w-2"
        >
          <label
            v-for="character in characters" :id="character.id" ref="characterLabel" :key="character.id"
            class="flex flex-row items-center py-1"
          >
            <input
              type="checkbox" checked
              class="rounded text-teal-500 shadow-none ring-0 ring-offset-0 focus:outline-none"
            >
            <span class="ml-1 select-none">{{ character.name }}</span>
          </label>
        </div>
      </div>
      <form class="flex flex-col" @submit.prevent>
        <div
          class="overflow-y-auto px-2 scrollbar scrollbar-thumb-color-gray-9 scrollbar-track-color-gray-500 scrollbar-rounded scrollbar-radius-2 scrollbar-thumb-radius-4 scrollbar-track-radius-4 scrollbar-w-2"
        >
          <div v-for="(attribute, i) in attributes" :key="i" class="relative">
            <FGButton
              v-tooltip="'Remove Attribute'" icon="fa:times" size="lg" color="red"
              class="absolute right-0 top-6 h-8"
              @click.prevent="removeAttribute(i)"
            />
            <label>
              <span>New Attribute</span>
              <input
                v-model="attributes[i]" type="text"
                class="mb-8 block h-8 w-80 border rounded-lg bg-gray-300 text-gray-900 focus:outline-none"
              >
            </label>
          </div>
          <div class="flex justify-center">
            <FGButton
              v-tooltip="'New Attribute'" icon="fa:plus" variant="outline" size="lg" color="teal"
              @click.prevent="attributes.push('')"
            />
          </div>
        </div>
      </form>
    </div>

    <div class="mx-auto">
      <FGButton
        variant="outline"
        size="lg"
        :disabled="attributes.length === 0"
        :color="attributes.length === 0 ? 'gray' : 'teal'"
        @click.prevent="attributes.length !== 0 ? addAttributes() : undefined"
      >
        Add all Attributes
      </FGButton>
    </div>

    <MoeModalCloseButton />
  </div>
</template>

<script setup lang="ts">
import { Modal } from '@@/models/enums/Modal';

const attributes = ref(new Array<string>());

const selectedCharacters = ref(new Array<string>());
const characterLabels = useTemplateRef('characterLabel');

const mainStore = useStore();
const listStore = useList();

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
