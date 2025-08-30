<template>
  <div class="relative grid m-auto rounded-2xl bg-gray-800 pb-10 text-gray-100" @click.stop>
    <div class="mt-12 px-16">
      Are you sure you want to delete {{ character.name }}
    </div>
    <div class="m-auto flex flex-row gap-4 pt-4">
      <FGButton variant="outline" size="lg" color="red" @click="deleteCharacter">
        Delete Character
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

const mainStore = useStore();
const listStore = useList();
const characterStore = useCharacter();

const character = characterStore.character;

async function deleteCharacter() {
  listStore.deleteCharacter(character);
  mainStore.modal = Modal.NONE;
  await mainStore.toList();
}
</script>
