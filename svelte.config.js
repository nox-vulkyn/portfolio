import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const basePath = process.env.BASE_PATH ?? '';

const config = {
	kit: {
		adapter: adapter(),
		paths: {
			base: basePath
		}
	}
};

export default config;
