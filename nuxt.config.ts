import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
	vue: { config: { performance: true } },
	buildModules: [
		"nuxt-windicss",
		'@pinia/nuxt'
	],
	alias: {
		"#config": "node_modules/nuxt3/dist/app/"
	},
	typescript: { strict: true },
})
