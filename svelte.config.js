// import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-netlify';
import sveltePreprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		target: '#svelte'
	},
	extensions: ['.svelte', '.svx'],
	preprocess: [
		// mdsvex(),
		sveltePreprocess({
			scss: {
				prependData: "@import 'src/assets/style/variables.scss';"
			}
		})
	]
};

export default config;
