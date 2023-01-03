import adapter from '@sveltejs/adapter-auto';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    alias: {
      $workshop: 'src/workshop'
    }
  },

  extensions: ['.svelte', ...mdsvexConfig.extensions],

  preprocess: [mdsvex(mdsvexConfig)],

  onwarn: (warning, handler) => {
    if (warning.code.startsWith('a11y-')) {
      return;
    }
    handler(warning);
  }
};

export default config;
