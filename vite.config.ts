import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import sveltePreprocess from "svelte-preprocess";
// import { generateSW } from 'rollup-plugin-workbox';
import { VitePluginSitemap } from '@tormak/vite-plugin-sitemap';
import routify from '@roxi/routify/vite-plugin'

export default defineConfig({
  plugins: [
    routify(),
    VitePluginSitemap({
      baseUrl: 'https://travislane.dev',
      contentBase: 'public',
      routes: [
        { path: '/', name: 'Home' },
        { path: '/experience', name: 'Experience' },
        { path: '/projects', name: 'Projects' },
      ],
      urlGenHook: async (config: { routes: any; }) => {
        let routes = config.routes;
        return routes;
      }
    }),
    svelte({
      preprocess: [
        sveltePreprocess({
          typescript: true,
        }),
      ],
    }),
    // generateSW({
    //   swDest: './dist/client/service-worker.js',
    //   globDirectory: './dist/client',
    //   globPatterns: [
    //     '**/*.{html,json,js,css}',
    //   ],
    //   skipWaiting: true,
    //   clientsClaim: true,
    //   runtimeCaching: [{
    //     urlPattern: /\.(?:png|jpg|jpeg|svg|webp)$/,
    //     handler: 'NetworkFirst',
    //     options: {
    //       cacheName: 'images',
    //       expiration: {
    //         maxEntries: 10,
    //       },
    //     },
    //   }, {
    //     urlPattern: /\.(?:js|css)$/,
    //     handler: 'NetworkFirst',
    //     options: {
    //       cacheName: 'assets',
    //       expiration: {
    //         maxEntries: 10,
    //       },
    //     },
    //   }, {
    //     urlPattern: /\.(?:html)$/,
    //     handler: 'NetworkFirst',
    //     options: {
    //       cacheName: 'pages',
    //       expiration: {
    //         maxEntries: 10,
    //       },
    //     },
    //   }],
    // })
  ]
});
