<template>
	<div class="flex items-center gap-3">
		<div class="flex items-center gap-1 font-medium">
			Autosave:
			<p v-if="autosave" class="text-green-400">{{ countdown }}</p>
			<p v-else class="text-red-600">OFF</p>
		</div>

		<MoeButton v-if="autosave" class="h-10 w-32 bg-gray-500" @click="disableAutosave">Disable autosave</MoeButton>
		<MoeButton v-else class="h-10 w-32 bg-gray-500" @click="enableAutosave">Enable autosave</MoeButton>

		<MoeButton v-tooltip="'Save'" icon="fas fa-save" class="h-10 w-10 bg-gray-500" @click="saveChanges" />
		<div v-if="changes" class="w-48 text-lg text-red-600 font-medium">UNSAVED CHANGES</div>
	</div>
</template>

<script setup lang="ts">
	import { getHash } from "~/models/interfaces/Collection";
	import { Modal } from "@/models/enums/Modal";

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
		} catch (error) {
			console.error(error);
			mainStore.modal = Modal.SAVEERROR;
		} finally {
			mainStore.loading = false;
		}
	}
</script>
