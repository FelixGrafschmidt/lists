<template>
	<div v-if="show">
		<div
			class="bg-gray-900 absolute z-20 h-screen w-[100vw] grid opacity-90 inset-0"
			aria-role="dialog"
			aria-modal
		></div>
		<div
			class="absolute inset-0 flex justify-center items-center z-30"
			@click="mainStore.modal = Modal.NONE"
		>
			<component :is="component" />
		</div>
	</div>
</template>


<script setup lang="ts">
import { Modal } from "~/models/enums/Modal";

const mainStore = useMainStore()

const show = computed(() => mainStore.modal !== Modal.NONE)
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
		default:
			return "";
	}

})

</script>
