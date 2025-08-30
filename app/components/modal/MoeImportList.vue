<template>
  <form
    class="relative m-auto max-h-[80vh] w-[40vw] flex flex-col items-center rounded-2xl bg-gray-800 pb-10 pt-5 text-gray-100"
    @click.stop @submit.prevent="json !== '' ? importList() : undefined"
  >
    <label class="mx-12">
      <span>Paste the content of your exported list below.</span>
      <textarea
        type="text" class="mb-8 block w-80 border rounded-lg bg-gray-300 text-gray-900 focus:outline-none"
        @input="parseJSONInput"
      />
    </label>
    <p v-if="json !== '' && !valid" class="text-red-600">
      Invalid file
    </p>
    <FGButton
      variant="outline" size="lg" :disabled="json === '' || valid === undefined"
      :color="json === '' || valid === undefined ? 'gray' : 'teal'" class="m-auto bg-gray-500"
    >
      Import List
    </FGButton>

    <MoeModalCloseButton />
  </form>
</template>

<script setup lang="ts">
import { Modal } from '@@/models/enums/Modal';
import { newList } from '@@/models/interfaces/List';
import { nanoid } from 'nanoid';

const json = ref('');
const valid: Ref<undefined | boolean> = ref(undefined);

let list = newList();

const mainStore = useStore();
const collectionStore = useCollection();

function importList() {
  list.characters.forEach((character) => {
    if (!character.images) {
      character.images = [];
    }
  });
  if (list.characters.length > 500) {
    // TODO: replace with custom solution
    window.alert('Too many characters!');
    return;
  }
  if (!list.id.match(/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/)) {
    list.id = nanoid();
  }
  const oldList = collectionStore.collection.lists.filter(listInStore => list.id === listInStore.id)[0];
  if (oldList) {
    if (
    // TODO: replace with custom solution
      !window.confirm(
        `A list with this id already exists. It contains ${oldList.characters.length} characters. Do you want to override this list?`,
      )
    ) {
      return;
    }
    else {
      collectionStore.removeListFromCollection(list.id);
    }
  }
  collectionStore.addListToCollection(list);
  mainStore.modal = Modal.NONE;
}

function parseJSONInput(event: Event) {
  try {
    json.value = (event.target as HTMLInputElement).value;
    list = JSON.parse(json.value);
    list.characters.forEach((character) => {
      if (!character.id) {
        character.id = nanoid();
      }
      if (!character.created) {
        character.created = new Date();
      }
    });
    valid.value = true;
  }
  catch (error) {
    console.error(error);

    valid.value = false;
  }
}
</script>
