import { nanoid } from "nanoid";
import { defineStore } from "pinia";
import type { Character, CharacterAttribute, CharacterImage } from "@/models/interfaces/Character";
import { newCharacter, newCharacterImage } from "@/models/interfaces/Character";

export const useCharacter = defineStore("character", () => {
	const character = ref(newCharacter(""));
	const unsavedCharacter = ref(newCharacter(""));
	const activeImage = ref(newCharacterImage(undefined));
	function setCharacter(c: Character) {
		c.images.forEach((image) => {
			if (image.valid === undefined) {
				image.valid = true;
			}
		});
		c.attributeArray.forEach((attribute) => {
			if (!attribute.id) {
				attribute.id = nanoid();
			}
		});
		character.value = c;
	}
	function resetCharacter() {
		character.value = newCharacter(undefined);
	}
	function changeCharacterName(name: string) {
		character.value.name = name;
	}
	function changeCharacterOrigin(origin: string) {
		character.value.origin = origin;
	}
	function addCharacterImage({ src, valid }: { src: string; valid: boolean }) {
		if (character.value.images.filter((img) => img.src === src).length > 0) {
			return;
		}
		character.value.images.push(newCharacterImage(src, character.value.images.filter((image) => image.main).length === 0, valid));
	}
	function designateImageAsInvalid(img: CharacterImage) {
		character.value.images.filter((image) => image === img)[0].valid = false;
	}
	function addAttribute() {
		character.value.attributeArray.push({ name: "", value: "", id: nanoid() });
	}
	function removeAttribute(attribute: CharacterAttribute) {
		character.value.attributeArray = character.value.attributeArray.filter((attr) => attr.id !== attribute.id);
	}
	function removeCharacterImage(index: number) {
		if (character.value.images.length > 1 && character.value.images[index].main) {
			character.value.images.splice(index, 1);
			character.value.images[0].main = true;
		} else {
			character.value.images.splice(index, 1);
		}
	}
	function designateMainImage(index: number) {
		character.value.images.forEach((image, i) => {
			image.main = i === index;
		});
	}
	function setActiveImage(image: CharacterImage) {
		activeImage.value = image;
	}
	function nextImage() {
		const currentIndex = character.value.images.indexOf(activeImage.value);
		if (character.value.images.length - 1 > currentIndex) {
			activeImage.value = character.value.images[currentIndex + 1];
		} else {
			activeImage.value = character.value.images[0];
		}
	}
	function previousImage() {
		const currentIndex = character.value.images.indexOf(activeImage.value);
		if (currentIndex > 0) {
			activeImage.value = character.value.images[currentIndex - 1];
		} else {
			activeImage.value = character.value.images[character.value.images.length - 1];
		}
	}

	return {
		character,
		unsavedCharacter,
		activeImage,
		setCharacter,
		resetCharacter,
		changeCharacterName,
		changeCharacterOrigin,
		addCharacterImage,
		designateImageAsInvalid,
		addAttribute,
		removeAttribute,
		removeCharacterImage,
		designateMainImage,
		setActiveImage,
		nextImage,
		previousImage,
	};
});
