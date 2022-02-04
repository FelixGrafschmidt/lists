import { nanoid } from "nanoid";
import { defineStore } from "pinia";
import { Character, CharacterAttribute, CharacterImage, newCharacter, newCharacterImage } from "~~/models/interfaces/Character";

export const useCharacterStore = defineStore('character', {
	state: () => ({
		character: newCharacter(""),
		activeImage: newCharacterImage(undefined)
	}),
	actions: {
		setCharacter(character: Character) {
			character.images.forEach((image) => {
				if (image.valid === undefined) {
					image.valid = true;
				}
			});
			character.attributeArray.forEach((attribute) => {
				if (!attribute.id) {
					attribute.id = nanoid();
				}
			});
			this.character = character;
		},
		resetCharacter() {
			this.character = newCharacter(undefined);
		},
		changeCharacterName(name: string) {
			this.character.name = name;
		},
		changeCharacterOrigin(origin: string) {
			this.character.origin = origin;
		},
		addCharacterImage({ src, valid }: { src: string; valid: boolean }) {
			if (this.character.images.filter((img) => img.src === src).length > 0) {
				return;
			}
			this.character.images.push(newCharacterImage(src, this.character.images.filter((image) => image.main).length === 0, valid));
		},
		designateImageAsInvalid(img: CharacterImage) {
			this.character.images.filter((image) => image === img)[0].valid = false;
		},
		addAttribute() {
			this.character.attributeArray.push({ name: "", value: "", id: nanoid() });
		},
		removeAttribute(attribute: CharacterAttribute) {
			this.character.attributeArray = this.character.attributeArray.filter((attr) => attr.id !== attribute.id);
		},
		removeCharacterImage(index: number) {
			if (this.character.images.length > 1 && this.character.images[index].main) {
				this.character.images.splice(index, 1);
				this.character.images[0].main = true;
			} else {
				this.character.images.splice(index, 1);
			}
		},
		designateMainImage(index: number) {
			this.character.images.forEach((image, i) => {
				image.main = i === index;
			});
		},
		setActiveImage(image: CharacterImage) {
			this.activeImage = image;
		},
		nextImage() {
			const currentIndex = this.character.images.indexOf(this.activeImage);
			if (this.character.images.length - 1 > currentIndex) {
				this.activeImage = this.character.images[currentIndex + 1];
			} else {
				this.activeImage = this.character.images[0];
			}
		},
		previousImage() {
			const currentIndex = this.character.images.indexOf(this.activeImage);
			if (currentIndex > 0) {
				this.activeImage = this.character.images[currentIndex - 1];
			} else {
				this.activeImage = this.character.images[this.character.images.length - 1];
			}
		}
	}
})
