module.exports = {
	root: true,
	parser: "vue-eslint-parser",
	parserOptions: {
		sourceType: "module",
	},
	extends: [
		"plugin:vue/base",
		"plugin:vue/vue3-recommended",
		"plugin:nuxt/recommended",
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"@nuxtjs/eslint-config-typescript",
		"prettier",
	],
	plugins: ["prettier", "typescript"],
	// add your custom rules here
	rules: {
		"no-console": "off",
		"no-debugger": "off",
	},
	ignorePatterns: [".nuxt/"],
};
