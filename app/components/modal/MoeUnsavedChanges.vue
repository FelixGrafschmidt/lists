<template>
  <div class="relative grid m-auto rounded-2xl bg-gray-800 pb-10 text-gray-100" @click.stop>
    <div class="mt-12 px-16">
      You will lose your changes on {{ character.name }}. Are you sure?
    </div>
    <div class="m-auto flex flex-row gap-4 pt-4">
      <FGButton variant="outline" size="lg" color="green" @click="saveChanges">
        Save Changes
      </FGButton>
      <FGButton variant="outline" size="lg" color="red" @click="mainStore.modal = Modal.NONE">
        Discard Changes
      </FGButton>
    </div>

    <MoeModalCloseButton />
  </div>
</template>

<script setup lang="ts">
import { Modal } from '@@/models/enums/Modal';

const mainStore = useStore();
const collectionStore = useCollection();
const listStore = useList();
const characterStore = useCharacter();

const character = characterStore.unsavedCharacter;

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
  listStore.addCharacter({ character, index: -1 });
  mainStore.modal = Modal.NONE;
}
</script>
