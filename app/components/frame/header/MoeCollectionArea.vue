<template>
  <div class="mr-4 w-[50%] flex items-center justify-end gap-3">
    <span>{{ collection.id }}</span>
    <FGButton
      v-tooltip="'Copy ID'" icon="fa:copy" variant="outline" size="lg" color="gray" @click="copyID"
    />
    <FGButton
      v-tooltip="'Load Collection'" variant="outline" icon="fa:folder-open" size="lg" color="gray" @click="loadCollection"
    />
    <FGButton
      v-tooltip="'Export Collection'" icon="fa:download" size="lg" variant="outline" color="gray" @click="exportCollection"
    />
    <FGButton
      v-tooltip="'Unload Collection'" variant="outline" icon="fa:times" size="lg" color="red" @click="unloadCollection"
    />
  </div>
</template>

<script setup lang="ts">
import { Modal } from '@@/models/enums/Modal';
import pkg from 'file-saver';

const { saveAs } = pkg;

const collectionStore = useCollection();
const mainStore = useStore();

const collection = computed(() => collectionStore.collection);

function loadCollection() {
  mainStore.modal = Modal.LOADCOLLECTION;
}
function copyID() {
  useClipboard({ source: collection.value.id }).copy();
}

function exportCollection() {
  saveAs(new File([JSON.stringify(collection)], `${collection.value.id}.json`));
}

function unloadCollection() {
  mainStore.modal = Modal.UNLOADCOLLECTION;
}
</script>
