import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				accent: '#2337ff',
				'accent-dark': '#000d8a',
				ink: 'rgb(15, 18, 25)',
				fog: 'rgb(34, 41, 57)',
				mist: 'rgb(96, 115, 159)',
				cloud: 'rgb(229, 233, 240)',
			},
			fontFamily: {
				sans: ['"Atkinson"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
			},
			boxShadow: {
				soft:
					'0 2px 6px rgba(96, 115, 159, 0.25), 0 8px 24px rgba(96, 115, 159, 0.33), 0 16px 32px rgba(96, 115, 159, 0.33)',
			},
			backgroundImage: {
				'body-gradient': 'linear-gradient(rgba(229, 233, 240, 0.5), #ffffff)',
			},
			maxWidth: {
				content: '720px',
			},
		},
	},
	plugins: [],
};

export default config;
