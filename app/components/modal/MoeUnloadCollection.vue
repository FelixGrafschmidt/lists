<template>
  <div class="relative grid m-auto rounded-2xl bg-gray-800 pb-10 text-gray-100" @click.stop>
    <div class="mt-12 w-[60vw] px-16">
      Are you sure you eant to unload your collection from your browser? If you have saved the id you can later reload
      it.
      <br>
      ID: {{ collectionStore.collection.id }}
    </div>

    <div class="m-auto flex flex-row gap-4 pt-4">
      <FGButton variant="outline" size="lg" color="red" @click="deleteCharacter">
        Unload Collection
      </FGButton>
      <FGButton variant="outline" size="lg" color="gray" @click="mainStore.modal = Modal.NONE">
        Cancel
      </FGButton>
    </div>

    <MoeModalCloseButton />
  </div>
</template>

<script setup lang="ts">
import { Modal } from '@@/models/enums/Modal';
import { newCollection } from '@@/models/interfaces/Collection';

const mainStore = useStore();
const collectionStore = useCollection();

function deleteCharacter() {
  collectionStore.setCollection(newCollection());
  mainStore.modal = Modal.NONE;
}
</script>
