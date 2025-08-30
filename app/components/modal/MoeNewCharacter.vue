<template>
  <form
    class="relative m-auto max-h-[80vh] w-[40vw] flex flex-col items-center rounded-2xl bg-gray-800 pb-10 pt-5 text-gray-100"
    @click.stop
    @submit.prevent="name !== '' ? saveCharacter() : undefined"
  >
    <div class="py-2">
      <label>
        Name
        <input
          v-model="name"
          type="text"
          class="block h-8 w-full border rounded-lg bg-gray-300 px-1 text-gray-900 focus:outline-none"
        >
      </label>
    </div>
    <div class="py-2">
      <label>
        Origin
        <input
          v-model="origin"
          type="text"
          class="block h-8 w-full border rounded-lg bg-gray-300 px-1 text-gray-900 focus:outline-none"
        >
      </label>
    </div>
    <div class="m-auto flex flex-row gap-4 pt-4">
      <FGButton variant="outline" size="lg" :disabled="name === ''" :color="name === '' ? 'gray' : 'green'" @click.prevent="name !== '' ? saveCharacter() : undefined">
        Save Character
      </FGButton>
      <FGButton variant="outline" size="lg" color="red" @click.prevent="mainStore.modal = Modal.NONE">
        Discard Character
      </FGButton>
    </div>

    <MoeModalCloseButton />
  </form>
</template>

<script setup lang="ts">
import { Modal } from '@@/models/enums/Modal';
import { newCharacter } from '@@/models/interfaces/Character';

const name = ref('');
const origin = ref('');

const mainStore = useStore();
const characterStore = useCharacter();
const collectionStore = useCollection();
const listStore = useList();

async function saveCharacter() {
  const character = newCharacter(undefined, name.value, origin.value);
  listStore.addCharacter({ character, index: -1 });
  characterStore.setCharacter(character);
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
    mainStore.toCharacter();
  }
}
</script>
