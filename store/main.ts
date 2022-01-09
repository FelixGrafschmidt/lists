import { defineStore } from "pinia";
import { Modal } from "~~/models/enums/Modal";

export const useMainStore = defineStore('main', {
	state: () => ({
		loading: false,
		modal: Modal.NONE
	})
})
