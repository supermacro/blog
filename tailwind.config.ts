import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				accent: '#0ea5e9',
				'accent-dark': '#0284c7',
				ink: '#0f172a',
				fog: '#1f2937',
				mist: '#4b5563',
				cloud: '#e2e8f0',
				canvas: '#f8fafc',
			},
			fontFamily: {
				sans: ['"Atkinson"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				mono: [
					'"JetBrains Mono"',
					'"IBM Plex Mono"',
					'ui-monospace',
					'SFMono-Regular',
					'Menlo',
					'monospace',
				],
			},
			boxShadow: {
				soft: '0 12px 32px rgba(15, 23, 42, 0.05)',
			},
			maxWidth: {
				content: '780px',
			},
		},
	},
	plugins: [],
};

export default config;
