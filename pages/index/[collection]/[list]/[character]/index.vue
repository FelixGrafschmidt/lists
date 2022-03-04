<template>
	<div @click="quickImage" class="flex relative gap-4 mt-4">
		<MoeButton v-tooltip="'Back to Character List'" @click="backToCharacterList" />

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
