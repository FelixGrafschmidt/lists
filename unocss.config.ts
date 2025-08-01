import { presetScrollbar } from "unocss-preset-scrollbar";
import { presetAttributify, transformerDirectives, defineConfig, presetWind3 } from "unocss";

export default defineConfig({
	// presets

	// core options
	shortcuts: [],
	rules: [],
	presets: [
		presetWind3(),
		presetAttributify(),
		presetScrollbar({
			// config
		}),
	],
	transformers: [transformerDirectives()],
});
