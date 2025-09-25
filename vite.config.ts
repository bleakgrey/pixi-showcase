import { defineConfig } from 'vite';

export default defineConfig({
	base: './',
	server: {
		host: true
	},
	build: {
		outDir: 'dist',
		assetsDir: 'assets',
		sourcemap: false,
		rollupOptions: {
			output: {
				assetFileNames() {
					return 'assets/[name][extname]';
				},
			},
		},
	},
	assetsInclude: ["**/*.xml"]
});