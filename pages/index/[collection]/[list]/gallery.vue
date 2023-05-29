<template>
	<div class="flex flex-row relative px-6">
		<MoeButton
			v-tooltip="'Back to List'"
			class="!p-0 h-8 w-8 top-0 -ml-6 left-0 sticky rounded-none rounded-br-1 border border-teal-700"
			icon="fas fa-arrow-left"
			@click="useMainStore().toList()"
		/>

		<section class="w-2/3 py-6 px-2">
			<div class="flex flex-row flex-wrap gap-4">
				<div v-for="(character, i) in list.characters" :key="i">
					<span class="text-xl">{{ character.name }}</span>
					<div class="flex flex-row flex-wrap gap-4 mt-2">
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
