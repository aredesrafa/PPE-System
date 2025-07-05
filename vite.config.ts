import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: 5175,
		host: true
	},
	ssr: {
		noExternal: ['flowbite-svelte-icons', 'flowbite-svelte']
	},
	optimizeDeps: {
		include: ['flowbite-svelte-icons', 'flowbite-svelte']
	},
	build: {
		rollupOptions: {
			external: []
		}
	}
});