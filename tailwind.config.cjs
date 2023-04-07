const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},

	daisyui: {
		themes: ["light"],
	},

	plugins: [require("daisyui")]
};

module.exports = config;
