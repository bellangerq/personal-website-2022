import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-netlify';
import sveltePreprocess from 'svelte-preprocess';

const sassGlobalData = `
  @import "src/assets/style/_variables.scss";
  @import "src/assets/style/_functions.scss";
`;

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		target: '#svelte'
	},
	extensions: ['.svelte', '.svx', '.md'],
	preprocess: [
		mdsvex({
			extensions: ['.svx', '.md']
		}),
		sveltePreprocess({
			scss: {
				prependData: sassGlobalData
			}
		})
	]
};

export default config;
