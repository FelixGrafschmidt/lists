<template>
  <div class="flex justify-center gap-2">
    <div class="w-24">
      <FGButton
        v-tooltip="'Open Gallery'" icon="fa:image" fullwidth variant="outline" size="lg" color="gray"
        @click="mainStore.toListGallery"
      />
    </div>
    <div class="w-24">
      <FGButton
        v-tooltip="'Add New Character'" icon="fa:user-plus" variant="outline" fullwidth size="lg" color="gray"
        @click="addNewCharacter"
      />
    </div>
    <div class="w-24">
      <FGButton
        v-tooltip="'Add Attributes to all Characters'" icon="fa:user-circle" fullwidth variant="outline"
        size="lg" color="gray" @click="addListAttribute"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Modal } from '@@/models/enums/Modal';

const mainStore = useStore();

function addNewCharacter() {
  mainStore.modal = Modal.NEW_CHARACTER;
}

function addListAttribute() {
  mainStore.modal = Modal.NEWATTRIBUTE;
}
</script>
