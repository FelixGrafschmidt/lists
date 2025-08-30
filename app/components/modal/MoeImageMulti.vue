<template>
  <form
    class="relative m-auto w-[40vw] flex flex-col items-center justify-end rounded-2xl bg-gray-800 py-10 text-gray-100"
    @click.stop
    @submit.prevent="src !== '' ? addImages() : undefined"
  >
    <label>
      <span>Insert urls seperated by linebreaks</span>
      <textarea
        v-model="src"
        max-height="500"
        type="text"
        class="overflow-y-scroll' mb-8 block w-80 resize-none border rounded-lg bg-gray-300 text-gray-900 scrollbar scrollbar-thumb-color-gray-9 scrollbar-track-color-gray-500 scrollbar-rounded scrollbar-radius-2 scrollbar-thumb-radius-4 scrollbar-track-radius-4 scrollbar-w-2 focus:outline-none"
      />
    </label>
    <div class="h-[10%]">
      <FGButton
        variant="outline" size="lg" :disabled="src === ''" :color="src === '' ? 'gray' : 'teal'"
      >
        Add Images
      </FGButton>
    </div>

    <MoeModalCloseButton />
  </form>
</template>

<script setup lang="ts">
import { Modal } from '@@/models/enums/Modal';

const src = ref('');

const mainStore = useStore();
const characterStore = useCharacter();

function addImages() {
  src.value.split('\n').forEach((url) => {
    if (characterStore.character.images.filter(img => img.src === url).length > 0) {
      return;
    }
    characterStore.addCharacterImage({ src: url, valid: true });
  });
  mainStore.modal = Modal.NONE;
}
</script>
