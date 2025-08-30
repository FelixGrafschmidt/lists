<template>
  <div class="relative flex flex-row justify-center gap-2 gap-4 p-6" @click="quickImage">
    <div class="sticky left-0 top-0 w-8 -ml-6 -mt-6">
      <FGButton
        v-tooltip="'Back to Character List'" class="rounded-none rounded-br-1" fullwidth variant="outline"
        icon="fa:arrow-left" @click="backToCharacterList"
      />
    </div>

    <MoeCharacterImages />
    <MoeCharacterAttributes />
  </div>
</template>

<script setup lang="ts">
const mainStore = useStore();
const characterStore = useCharacter();

const quickImages = ref(false);

// onBeforeRouteUpdate(() => {
//  const characters = listStore.list.characters;
//  characterStore.unsavedCharacter = character;
//  if (!discarded.value && !characters.find((listCharacter) => listCharacter.id === character.id)) {
//  mainStore.modal = Modal.UNSAVED_CHANGES;
//  }
//  return true;
// });

// onBeforeRouteLeave(() => {
//   const characters = listStore.list.characters;
//   characterStore.unsavedCharacter = character;
//   if (!discarded.value && !characters.find(listCharacter => listCharacter.id === character.id)) {
//     mainStore.modal = Modal.UNSAVED_CHANGES;
//   }
//   return true;
// });

async function quickImage(event: MouseEvent) {
  if (event.ctrlKey) {
    quickImages.value = !quickImages.value;
    return;
  }
  if (quickImages.value) {
    characterStore.addCharacterImage({ src: await navigator.clipboard.readText(), valid: true });
  }
}

async function backToCharacterList() {
  characterStore.resetCharacter();
  await mainStore.toList();
}
</script>
