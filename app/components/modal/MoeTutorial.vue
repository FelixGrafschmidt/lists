<template>
  <div class="relative grid m-auto max-w-4xl w-[80vw] rounded-2xl bg-gray-800 px-10 pb-10 text-gray-100" @click.stop>
    <div class="h-12 self-center pb-10 pt-8 text-center text-3xl">
      Tutorial
    </div>
    <div class="w-full flex justify-center">
      <div class="h-2 w-36 flex rounded bg-gray-600">
        <div
          v-for="index in mainStore.tutorial" :key="index" :class="{
            'rounded-r': index === 3,
            'rounded-l': index === 1,
          }" class="h-2 w-12 bg-teal-400"
        />
      </div>
    </div>
    <div class="flex justify-between">
      <FGButton
        variant="outline" :color="mainStore.tutorial !== 1 ? 'teal' : 'gray'" size="2xl"
        :disabled="mainStore.tutorial === 1" icon="fa:angle-left" @click="previous"
      />
      <component :is="step" class="h-72 w-full px-8 pt-8" />
      <FGButton
        variant="outline" :color="mainStore.tutorial !== 3 ? 'teal' : 'gray'" size="2xl"
        :disabled="mainStore.tutorial === 3" icon="fa:angle-right" @click="next"
      />
    </div>
    <div class="h-8 flex justify-center">
      <FGButton v-show="mainStore.tutorial === 3" variant="outline" size="lg" color="teal" @click="newList">
        Create New List
      </FGButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MoeTutorial1, MoeTutorial2, MoeTutorial3 } from '#components';
import { Modal } from '@@/models/enums/Modal';

const mainStore = useStore();

const step = computed(() => {
  switch (mainStore.tutorial) {
    case 1:
      return MoeTutorial1;
    case 2:
      return MoeTutorial2;
    case 3:
      return MoeTutorial3;
    default:
      return MoeTutorial1;
  }
});

onMounted(() => {
  window.localStorage.setItem('tutorial', mainStore.tutorial.toString());
});

function next() {
  mainStore.tutorial++;
  window.localStorage.setItem('tutorial', mainStore.tutorial.toString());
}

function previous() {
  mainStore.tutorial--;
  window.localStorage.setItem('tutorial', mainStore.tutorial.toString());
}

async function newList() {
  mainStore.modal = Modal.NONE;
  await mainStore.toCollection();
  mainStore.modal = Modal.NEWLIST;
}
</script>
