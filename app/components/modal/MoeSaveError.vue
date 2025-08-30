<template>
  <div class="relative m-auto flex rounded-2xl bg-gray-800 pb-10 text-gray-100" @click.stop>
    <Icon name="fa:times-circle" alt="error" class="ml-10 mt-16 h-16 w-16 text-red-6" />
    <div class="mx-12">
      <div class="mt-16 flex flex-col text-xl">
        <span>An error has occurred while saving your changes.</span>
        <span>Your changes have NOT been saved!</span>
      </div>
      <div class="mt-8 flex flex-col gap-2">
        <FGButton variant="outline" size="lg" color="gray" @click="saveChanges">
          Try again
        </FGButton>
        <FGButton variant="outline" size="lg" color="gray" @click="exportData">
          Export your data
        </FGButton>
        <FGButton variant="outline" size="lg" color="gray" @click="contactUs">
          Contact us
        </FGButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Modal } from '@@/models/enums/Modal';
import pkg from 'file-saver';

const { saveAs } = pkg;

const mainStore = useStore();
const collectionStore = useCollection();

function contactUs() {
  mainStore.modal = Modal.CONTACTUS;
}

function saveChanges(): Promise<void> {
  mainStore.loading = true;
  return collectionStore
    .saveChanges()
    .then(() => {
      mainStore.modal = Modal.NONE;
    })
    .catch(() => {
      mainStore.modal = Modal.SAVEERROR;
    })
    .finally(() => {
      mainStore.loading = false;
    });
}

function exportData() {
  saveAs(new File([JSON.stringify(collectionStore.collection)], `${collectionStore.collection.id}.json`));
}
</script>
