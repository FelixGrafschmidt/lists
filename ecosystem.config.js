module.exports = {
	apps: [
		{
			name: "character_viewer",
			exec_mode: "cluster",
			instances: 1,
			script: "./.output/server/index.mjs",
			env: {
				PORT: 3000,
				REDIS_PORT: 6378,
			},
		},
	],
};
