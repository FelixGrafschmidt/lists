<template>
  <FGButton
    icon="fa:times"
    round
    color="red"
    variant="outline"
    size="md"
    class="absolute right-1 top-1"
    @click="mainStore.modal = Modal.NONE"
  />
</template>

<script lang="ts" setup>
import { Modal } from '@@/models/enums/Modal';
import FGButton from 'ui.felgraf.dev/components/FGButton.vue';

const mainStore = useStore();
</script>
