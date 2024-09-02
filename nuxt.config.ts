// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	app: {
		head: {
			meta: [
				{ charset: "utf-8" },
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1.0",
				},
				{
					name: "theme-color",
					content: "black",
				},
				{
					hid: "description",
					name: "description",
					content: process.env.npm_package_description || "",
				},
				{ content: "#ffffff", property: "" },
				{ content: "#00aba9", property: "" },
				{ content: "/mstile-144x144.png", property: "" },
			],
			link: [
				{ rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
				{ rel: "icon", sizes: "16x16", type: "image/png", href: "/favicon-16x16.png" },
				{ rel: "icon", sizes: "32x32", type: "image/png", href: "/favicon-32x32.png" },
				{
					rel: "stylesheet",
					href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css",
					integrity: "sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w==",
					crossorigin: "anonymous",
				},
				{ rel: "manifest", href: "/site.webmanifest" },
			],
			title: "Character List Manager",
		},
	},

	modules: ["@pinia/nuxt", "@unocss/nuxt", "nuxt-icon", "@vueuse/nuxt", "@nuxt/eslint", "nuxt-security", "@nuxtjs/device"],
	typescript: { strict: true },

	security: {
		headers: {
			crossOriginEmbedderPolicy: "unsafe-none",
			contentSecurityPolicy: {
				"img-src": "'self' data: https:",
			},
		},
	},

	components: [
		{
			path: "~/components",
			pathPrefix: false,
		},
	],

	compatibilityDate: "2024-09-02",
});
