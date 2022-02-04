// const darkmode = require("tailwindcss-dark-mode");
// const forms = require("@tailwindcss/forms");
// const typography = require("tailwindcss-typography");
import scrollbar from "@windicss/plugin-scrollbar"
import { defineConfig } from 'windicss/helpers'


export default defineConfig({
	theme: {},
	plugins: [scrollbar],
	extract: {
		include: ['**/*.{vue,html,jsx,tsx,ts,js}'],
	}
})



// module.exports = {
// 	theme: {
// 		extend: {},
// 		darkSelector: ".dark",
// 	},
// 	darkMode: "media",
// 	variants: {
// 		backgroundColor: ["dark", "dark-hover", "dark-group-hover", "dark-even", "dark-odd", "hover", "responsive"],
// 		borderColor: ["dark", "dark-focus", "dark-focus-within", "hover", "responsive"],
// 		textColor: ["dark", "dark-hover", "dark-active", "hover", "responsive"],
// 		scrollbar: ["dark", "rounded"],
// 	},
// 	// plugins: [darkmode(), forms, scrollbar, typography],
// 	content: {
// 		// enable remove unused CSS only in production
// 		enabled: process.env.NODE_ENV === "production",
// 		// any file that may contain the reference of CSS styles by class name.
// 		content: ["components/**/*.vue", "layouts/**/*.vue", "pages/**/*.vue", "plugins/**/*.js", "nuxt.config.ts"],
// 	},
// };
