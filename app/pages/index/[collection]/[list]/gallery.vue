<template>
  <div class="relative">
    <div class="sticky left-0 top-0 w-8 -ml-6 -mt-6">
      <FGButton
        v-tooltip="'Back to List'" class="rounded-none rounded-br-1" fullwidth variant="outline" icon="fa:arrow-left"
        @click="useStore().toList()"
      />
    </div>

    <section class="px-2 py-6">
      <div class="flex flex-row flex-wrap gap-y-4">
        <div v-for="(character, i) in list.characters" :key="i" class="w-1/4 flex flex-col items-center px-2 py-4">
          <span class="text-xl">{{ character.name }}</span>
          <div class="mt-2 flex flex-row flex-wrap gap-4">
            <img
              v-for="(image, j) in character.images" :key="j" loading="lazy" crossorigin="anonymous"
              class="h-72 rounded" :src="image.src"
            >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const listStore = useList();

const list = computed(() => listStore.list);
</script>
