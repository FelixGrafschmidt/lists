<template>
	<div class="flex gap-3 items-center">
		<div class="flex font-medium items-center gap-1">
			Autosave:
			<p v-if="autosave" class="text-green-400">{{ countdown }}</p>
			<p v-else class="text-red-600">OFF</p>
		</div>

		<MoeButton v-if="autosave" class="h-10 bg-gray-500" @click="disableAutosave">Disable autosave</MoeButton>
		<MoeButton v-else class="h-10 bg-gray-500" @click="enableAutosave">Enable autosave</MoeButton>

		<MoeButton
			v-tooltip="'Save'"
			icon="fas fa-save"
			class="h-10 w-10 bg-gray-500"
			@click="saveChanges"
		/>
		<div v-if="changes" class="text-lg font-medium max-w-[2rem] 2xl:max-w-none bg-gray-500">
			<div class="text-red-600">UNSAVED CHANGES</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { getHash } from "~/models/interfaces/Collection";
import { Modal } from "~~/models/enums/Modal";

const autosave = ref(false);
const autosaveId = ref(0);
const countdown = ref(60);

const collectionStore = useCollectionStore()
const mainStore = useMainStore()

const collection = collectionStore.collection
const changes = collectionStore.originalHash !== getHash(collection)

onMounted(() => {
	performAutosave();
})

onBeforeUnmount(() => {
	window.clearInterval(autosaveId.value);
})

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
	mainStore.loading = true
	try {
		await collectionStore.saveChanges()
		mainStore.modal = Modal.NONE
	} catch (error) {
		mainStore.modal = Modal.SAVEERROR
	} finally {
		mainStore.loading = false
	}
}
</script>
