<template>
	<div class="flex sticky top-0 bg-gray-600 rounded font-extrabold text-lg select-none">
		<div
			@click="listStore.sortListByName()"
			class="w-[35%] border-gray-800 border-r-2 py-2 text-center cursor-pointer"
		>
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
		<div
			@click="listStore.sortListByOrigin()"
			class="w-[35%] border-gray-800 border-r-2 border-l-2 py-2 text-center cursor-pointer"
		>
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
		<div
			@click="listStore.sortListByImages()"
			class="w-[10%] border-gray-800 border-r-2 border-l-2 py-2 text-center cursor-pointer"
		>
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

const listStore = useListStore()

const sortcriterion = ref("")
const sortorder = ref("")

</script>
