<template>
  <div v-if="image" class="h-[80vh] w-1/2 flex flex-col items-center justify-between gap-3">
    <div class="h-90% flex justify-center">
      <figure class="h-full flex flex-col justify-center">
        <img :alt="character.name" :src="image.src || ''" crossorigin="anonymous" class="m-auto max-h-full rounded">
      </figure>
    </div>
    <div class="h-10% flex items-center justify-self-end gap-4">
      <FGButton v-tooltip="'Designate as Main Image'" variant="outline" size="lg" color="gray" icon="fa:star" @click="designateMainImage" />
      <FGButton v-tooltip="'Remove this Image'" variant="outline" size="lg" color="red" icon="fa:trash" @click="deleteImage" />
      <FGButton v-tooltip="'Delete all Images'" variant="outline" size="lg" color="red" icon="fa:trash" @click="deleteAllImages" />
      <FGButton v-tooltip="'Add Image'" variant="outline" size="lg" color="gray" icon="fa:plus" @click="addNewImage" />
      <FGButton v-tooltip="'Add Images'" variant="outline" size="lg" color="gray" icon="fa:image" @click="addImageMulti" />
      <FGButton v-tooltip="'Export all Images'" variant="outline" size="lg" color="gray" icon="fa:save" @click="exportImages" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Character, CharacterImage } from '@@/models/interfaces/Character';
import { Modal } from '@@/models/enums/Modal';
import pkg from 'file-saver';

const props = defineProps<{
  character: Character
  image?: CharacterImage
}>();
const emit = defineEmits<{
  (e: 'delete', images: CharacterImage[]): void
}>();
const mainStore = useStore();
const characterStore = useCharacter();
const { saveAs } = pkg;

function designateMainImage() {
  const index = props.character.images.indexOf(props.image!);
  characterStore.designateMainImage(index);
}
function addNewImage() {
  mainStore.modal = Modal.NEWIMAGE;
}

function addImageMulti() {
  mainStore.modal = Modal.IMAGEMULTI;
}

function deleteAllImages() {
  emit('delete', props.character.images);
}

function deleteImage() {
  emit('delete', [props.image!]);
}

function exportImages() {
  let imageSources = '';
  props.character.images.forEach((image) => {
    imageSources += `${image.src}\n`;
  });
  saveAs(new File([imageSources], `${props.character.name}_images.txt`));
}
</script>
