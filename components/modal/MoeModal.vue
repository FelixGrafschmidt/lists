<template>
	<div v-if="show">
		<div class="absolute inset-0 z-20 grid h-screen w-[100vw] bg-gray-900 opacity-90" aria-role="dialog" aria-modal></div>
		<div class="absolute inset-0 z-30 flex items-center justify-center" @click="mainStore.modal = Modal.NONE">
			<component :is="component" />
		</div>
	</div>
</template>

<script setup lang="ts">
	import { Modal } from "~/models/enums/Modal";

	const mainStore = useStore();

	const show = computed(() => mainStore.modal !== Modal.NONE);
	const component = computed(() => {
		switch (mainStore.modal) {
			case Modal.SAVEERROR:
				return "MoeSaveError";
			case Modal.CONTACTUS:
				return "MoeContactUs";
			case Modal.DELETELIST:
				return "MoeDeleteList";
			case Modal.DELETECHARACTER:
				return "MoeDeleteCharacter";
			case Modal.NEWIMAGE:
				return "MoeNewImage";
			case Modal.LOADCOLLECTION:
				return "MoeLoadCollection";
			case Modal.IMPORTLIST:
				return "MoeImportList";
			case Modal.NEWLIST:
				return "MoeNewList";
			case Modal.FULLSCREENIMG:
				return "MoeFullscreenImg";
			case Modal.TUTORIAL:
				return "MoeTutorial";
			case Modal.NEWATTRIBUTE:
				return "MoeAttributes";
			case Modal.IMAGEMULTI:
				return "MoeImageMulti";
			case Modal.UNLOADCOLLECTION:
				return "MoeUnloadCollection";
			case Modal.UNSAVED_CHANGES:
				return "MoeUnsavedChanges";
			case Modal.NEW_CHARACTER:
				return "MoeNewCharacter";
			default:
				return "";
		}
	});
</script>
