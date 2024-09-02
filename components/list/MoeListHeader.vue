<template>
	<div class="sticky top-0 w-full flex select-none rounded bg-gray-600 text-lg font-extrabold">
		<div class="w-[35%] cursor-pointer border-r-2 border-gray-800 py-2 text-center" @click="listStore.sortListByName()">
			Name
			<div
				v-if="sortcriterion === 'NAME'"
				:class="{
					'fa-arrow-down': sortorder === 'ASC',
					'fa-arrow-up': sortorder === 'DESC',
				}"
				class="fas"
			></div>
		</div>
		<div class="w-[35%] cursor-pointer border-l-2 border-r-2 border-gray-800 py-2 text-center" @click="listStore.sortListByOrigin()">
			Origin
			<div
				v-if="sortcriterion === 'ORIGIN'"
				:class="{
					'fa-arrow-down': sortorder === 'ASC',
					'fa-arrow-up': sortorder === 'DESC',
				}"
				class="fas"
			></div>
		</div>
		<div class="w-[10%] cursor-pointer border-l-2 border-r-2 border-gray-800 py-2 text-center" @click="listStore.sortListByImages()">
			Images
			<div
				v-if="sortcriterion === 'IMAGES'"
				:class="{
					'fa-arrow-down': sortorder === 'ASC',
					'fa-arrow-up': sortorder === 'DESC',
				}"
				class="fas"
			></div>
		</div>
		<div class="w-[10%] border-l-2 border-r-2 border-gray-800 py-2 text-center">Attributes</div>
		<div class="w-[10%] border-l-2 border-gray-800 py-2 text-center">Main Image</div>
	</div>
</template>

<script setup lang="ts">
	const listStore = useList();

	const sortcriterion = ref("");
	const sortorder = ref("");
</script>
