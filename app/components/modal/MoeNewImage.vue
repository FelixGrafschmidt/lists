<template>
  <form
    class="relative m-auto h-[80vh] w-[40vw] flex flex-col items-center justify-end rounded-2xl bg-gray-800 py-10 text-gray-100"
    @click.stop
    @submit.prevent="src !== '' ? addImage() : undefined"
  >
    <figure v-if="src" class="h-[80%] max-h-[80%]">
      <img
        :src="src"
        crossorigin="anonymous"
        alt="Invalid image url"
        class="max-h-full"
        @load="valid = true"
        @error="valid = false"
      >
    </figure>
    <label class="h-[10%]">
      <span>Image URL</span>
      <input
        :value="src"
        type="text"
        class="mb-8 block h-8 w-80 border rounded-lg bg-gray-300 text-gray-900 focus:outline-none"
        @blur="updateUrl"
      >
    </label>
    <p v-if="!valid" class="text-red-600">
      Invalid image url
    </p>
    <div class="h-[10%]">
      <FGButton variant="outline" size="lg" :disabled="src === ''" :color="src === '' ? 'gray' : 'teal'" class="mx-auto mt-4 bg-gray-500">
        Add Image
      </FGButton>
    </div>

    <MoeModalCloseButton />
  </form>
</template>

<script setup lang="ts">
import { Modal } from '@@/models/enums/Modal';

const src = ref('');
const valid = ref(true);

const mainStore = useStore();
const characterStore = useCharacter();

function updateUrl(event: Event) {
  const value = (event.target as HTMLInputElement).value;
  if (value.startsWith('data:')) {
    valid.value = false;
    src.value = '';
  }
  else {
    src.value = value;
    valid.value = false;
  }
}

function addImage() {
  characterStore.addCharacterImage({ src: src.value, valid: valid.value });
  mainStore.modal = Modal.NONE;
}
</script>
