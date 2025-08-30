<template>
  <form
    class="relative m-auto max-h-[80vh] w-[40vw] flex flex-col items-center rounded-2xl bg-gray-800 pb-10 pt-5 text-gray-100"
    @click.stop @submit.prevent="name !== '' ? addList() : undefined"
  >
    <label class="mx-12">
      <span>Type a name for your new list.</span>
      <input
        v-model="name" type="text"
        class="mb-8 block w-80 border rounded-lg bg-gray-300 px-2 text-gray-900 focus:outline-none"
      >
    </label>
    <FGButton variant="outline" size="lg" :disabled="name === ''" :color="name === '' ? 'gray' : 'teal'">
      Add List
    </FGButton>

    <MoeModalCloseButton />
  </form>
</template>

<script setup lang="ts">
import type { List } from '@@/models/interfaces/List';
import { Modal } from '@@/models/enums/Modal';
import { newList } from '@@/models/interfaces/List';

const name = ref('');

const mainStore = useStore();
const collectionStore = useCollection();
const listStore = useList();

async function openList(list: List) {
  listStore.setList(list);
  await mainStore.toList();
}

function addList() {
  collectionStore.addListToCollection(newList(undefined, name.value));
  if (collectionStore.collection.lists.length >= 1) {
    openList(collectionStore.collection.lists.at(-1)!);
  }
  mainStore.modal = Modal.NONE;
}
</script>
