<template>
	<div class="flex sticky w-full top-0 bg-gray-600 rounded font-extrabold text-lg select-none">
		<div class="w-[35%] border-gray-800 border-r-2 py-2 text-center cursor-pointer" @click="listStore.sortListByName()">
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
		<div class="w-[35%] border-gray-800 border-r-2 border-l-2 py-2 text-center cursor-pointer" @click="listStore.sortListByOrigin()">
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
		<div class="w-[10%] border-gray-800 border-r-2 border-l-2 py-2 text-center cursor-pointer" @click="listStore.sortListByImages()">
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
		<div class="w-[10%] border-gray-800 border-r-2 border-l-2 py-2 text-center">Attributes</div>
		<div class="w-[10%] border-gray-800 border-l-2 py-2 text-center">Main Image</div>
	</div>
</template>

<script setup lang="ts">
	const listStore = useListStore();

	const sortcriterion = ref("");
	const sortorder = ref("");
</script>
