import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-css-only';
import { generateSW } from 'rollup-plugin-workbox';
import SitemapPlugin from 'rollup-plugin-sitemap';

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.ts',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js',
		inlineDynamicImports: true
	},
	plugins: [
		svelte({
			preprocess: sveltePreprocess({ sourceMap: !production }),
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production
			}
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: 'bundle.css' }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		typescript({
			sourceMap: !production,
			inlineSources: !production
		}),
		generateSW({
			swDest: './public/service-worker.js',
			globDirectory: './public',
			globPatterns: [
				'**/*.{html,json,js,css}',
			],
			skipWaiting: true,
			clientsClaim: true,
			runtimeCaching: [{
				urlPattern: /\.(?:png|jpg|jpeg|svg|webp)$/,
				handler: 'NetworkFirst',
				options: {
					cacheName: 'images',
					expiration: {
						maxEntries: 10,
					},
				},
			}, {
				urlPattern: /\.(?:js|css)$/,
				handler: 'NetworkFirst',
				options: {
					cacheName: 'assets',
					expiration: {
						maxEntries: 10,
					},
				},
			}, {
				urlPattern: /\.(?:html)$/,
				handler: 'NetworkFirst',
				options: {
					cacheName: 'pages',
					expiration: {
						maxEntries: 10,
					},
				},
			}],
		}),
		SitemapPlugin({
			baseUrl: 'https://swtorslicers.org',
			contentBase: 'dist',
			routes: [
				{ path: '/', name: 'Home' },
				{ path: '/experience', name: 'Experience' },
				{ path: '/featured', name: 'Featured' },
				{ path: '/projects', name: 'Projects' },
				{ path: '/organizations', name: 'Organizations' },
				{ path: '/art', name: 'Art Gallery' },
				{ path: '/contact', name: 'Contact' },
			]
		}),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
