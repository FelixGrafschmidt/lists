<template>
	<div @click="quickImage" class="flex flex-row gap-4">
		<MoeButton
			class="h-8 w-8 -mt-6 -ml-6 rounded-none rounded-br-1 pr-8 pb-8 border border-teal-700"
			icon="fas fa-arrow-left"
			v-tooltip="'Back to Character List'"
			@click="backToCharacterList"
		/>

		<MoeCharacterImages />
		<MoeCharacterAttributes />
	</div>
</template>

<script setup lang="ts">
const mainStore = useMainStore()
const characterStore = useCharacterStore()

const quickImages = ref(false)

async function quickImage(event: MouseEvent) {
	if (event.ctrlKey) {
		quickImages.value = !quickImages.value;
		return;
	}
	if (quickImages.value) {
		characterStore.addCharacterImage({ src: await navigator.clipboard.readText(), valid: true });
	}
}

function backToCharacterList() {
	characterStore.resetCharacter();
	mainStore.toList();
}
</script>
