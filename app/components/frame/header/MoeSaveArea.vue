<template>
  <div class="flex items-center gap-3">
    <div class="w-26 flex items-center gap-1 font-medium">
      Autosave:
      <p v-if="autosave" class="text-green-400">
        {{ countdown }}
      </p>
      <p v-else class="text-red-600">
        OFF
      </p>
    </div>

    <div v-if="autosave" class="w-36">
      <FGButton size="lg" fullwidth color="gray" variant="outline" @click="disableAutosave">
        Disable autosave
      </FGButton>
    </div>
    <div v-else class="w-36">
      <FGButton size="lg" fullwidth color="gray" variant="outline" @click="enableAutosave">
        Enable autosave
      </FGButton>
    </div>

    <FGButton v-tooltip="'Save'" :disabled="!changes" icon="fa:save" variant="outline" size="lg" color="green" @click="saveChanges" />
    <div v-if="changes" class="w-48 text-lg text-red-600 font-medium">
      UNSAVED CHANGES
    </div>
  </div>
</template>

<script setup lang="ts">
import { Modal } from '@@/models/enums/Modal';
import { getHash } from '@@/models/interfaces/Collection';

const autosave = ref(false);
const autosaveId = ref(0);
const countdown = ref(60);

const collectionStore = useCollection();
const mainStore = useStore();

const collection = collectionStore.collection;
const changes = computed(() => collectionStore.originalHash !== getHash(collection));

onMounted(() => {
  performAutosave();
});

onBeforeUnmount(() => {
  window.clearInterval(autosaveId.value);
});

function performAutosave() {
  autosaveId.value = window.setInterval(() => {
    countdown.value--;
    if (autosave.value && countdown.value === 0) {
      collectionStore.saveChanges();
      countdown.value = 60;
    }
  }, 1000 * 1);
}
function enableAutosave() {
  autosave.value = true;
  countdown.value = 60;
}

function disableAutosave() {
  autosave.value = false;
  countdown.value = 60;
}

async function saveChanges(): Promise<void> {
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
}
</script>
