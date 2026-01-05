import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				// Old site colors
				heading: '#3c3c3c',
				accent: '#8e7dfe',
				'accent-dark': '#7a6be0',
				body: '#333333',
				muted: '#86888b',
				border: '#ebebeb',
				'code-bg': 'rgba(107, 107, 107, 0.1)',
				'code-text': '#533afb',
				'pre-bg': 'rgba(248, 245, 254, 0.52)',
			},
			fontFamily: {
				serif: ['"Noto Serif"', 'Georgia', 'Cambria', 'serif'],
				sans: ['"Open Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
			},
			maxWidth: {
				content: '660px',
				page: '900px',
			},
			lineHeight: {
				relaxed: '1.75',
			},
		},
	},
	plugins: [],
};

export default config;
