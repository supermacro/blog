import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { transformerRemoveLineBreak } from '@shikijs/transformers';
import { defineConfig } from 'astro/config';

const lineNumbersMetaPattern = /(?:^|\s)(?:lineNumbers|showLineNumbers|linenums)(?:\s|$)/i;

const transformerLineNumbers = () => ({
	name: 'line-numbers',
	pre(this: any, hast: any) {
		const rawMeta = this.options.meta?.__raw ?? '';

		if (!lineNumbersMetaPattern.test(rawMeta)) {
			return;
		}

		this.addClassToHast(hast, 'has-line-numbers');
	},
});

// https://astro.build/config
export default defineConfig({
	site: 'https://gdelgado.ca',
	markdown: {
		shikiConfig: {
			transformers: [transformerLineNumbers(), transformerRemoveLineBreak()],
		},
	},
	integrations: [mdx(), react(), tailwind(), sitemap()],
});
