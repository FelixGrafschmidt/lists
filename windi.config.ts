// const forms = require("@tailwindcss/forms");
// const typography = require("tailwindcss-typography");
import scrollbar from "@windicss/plugin-scrollbar"
import { defineConfig } from 'windicss/helpers'


export default defineConfig({
	theme: {},
	plugins: [scrollbar],
	extract: {
		include: ['**/*.{vue,html,jsx,tsx,ts,js}'],
	},
	variants: {
		// ...
		scrollbar: ['rounded']
	}
})
