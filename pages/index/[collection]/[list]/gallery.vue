<template>
	<div class="relative flex flex-row px-6">
		<MoeButton
			v-tooltip="'Back to List'"
			class="sticky left-0 top-0 h-8 w-8 border border-teal-700 rounded-none rounded-br-1 -ml-6 !p-0"
			icon="fas fa-arrow-left"
			@click="useMainStore().toList()"
		/>

		<section class="w-2/3 px-2 py-6">
			<div class="flex flex-row flex-wrap gap-4">
				<div v-for="(character, i) in list.characters" :key="i">
					<span class="text-xl">{{ character.name }}</span>
					<div class="mt-2 flex flex-row flex-wrap gap-4">
						<img v-for="(image, j) in character.images" :key="j" loading="lazy" class="h-72 rounded" :src="image.src" />
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
	const listStore = useListStore();

	const list = computed(() => listStore.list);
</script>
