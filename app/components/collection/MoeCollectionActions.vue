<template>
  <div class="mb-20 mt-7 flex justify-center gap-2">
    <div class="w-24">
      <FGButton
        v-tooltip="'Create New List'" icon="fa:plus" variant="outline" color="gray" fullwidth size="lg"
        @click="addNewList"
      />
    </div>
    <div class="w-24">
      <FGButton
        v-tooltip="'Import List'" icon="fa:file" variant="outline" color="gray" fullwidth size="lg"
        @click="importFromFile"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Modal } from '@@/models/enums/Modal';

const mainStore = useStore();

function importFromFile(): void {
  mainStore.modal = Modal.IMPORTLIST;
}

function addNewList() {
  mainStore.modal = Modal.NEWLIST;
}
</script>
