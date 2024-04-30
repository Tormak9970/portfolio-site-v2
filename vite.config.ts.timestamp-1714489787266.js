// vite.config.ts
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";
import { generateSW } from "rollup-plugin-workbox";
import { VitePluginSitemap } from "@tormak/vite-plugin-sitemap";
var vite_config_default = defineConfig({
  plugins: [
    VitePluginSitemap({
      baseUrl: "https://travislane.dev",
      contentBase: "public",
      routes: [
        { path: "/", name: "Home" },
        { path: "/experience", name: "Experience" },
        { path: "/projects", name: "Projects" },
        { path: "/contact", name: "Contact" }
      ],
      urlGenHook: async (config) => {
        let routes = config.routes;
        return routes;
      }
    }),
    svelte({
      preprocess: [
        sveltePreprocess({
          typescript: true
        })
      ]
    }),
    generateSW({
      swDest: "./dist/service-worker.js",
      globDirectory: "./dist",
      globPatterns: [
        "**/*.{html,json,js,css}"
      ],
      skipWaiting: true,
      clientsClaim: true,
      runtimeCaching: [{
        urlPattern: /\.(?:png|jpg|jpeg|svg|webp)$/,
        handler: "NetworkFirst",
        options: {
          cacheName: "images",
          expiration: {
            maxEntries: 10
          }
        }
      }, {
        urlPattern: /\.(?:js|css)$/,
        handler: "NetworkFirst",
        options: {
          cacheName: "assets",
          expiration: {
            maxEntries: 10
          }
        }
      }, {
        urlPattern: /\.(?:html)$/,
        handler: "NetworkFirst",
        options: {
          cacheName: "pages",
          expiration: {
            maxEntries: 10
          }
        }
      }]
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB7IHN2ZWx0ZSB9IGZyb20gJ0BzdmVsdGVqcy92aXRlLXBsdWdpbi1zdmVsdGUnXHJcbmltcG9ydCBzdmVsdGVQcmVwcm9jZXNzIGZyb20gXCJzdmVsdGUtcHJlcHJvY2Vzc1wiO1xyXG5pbXBvcnQgeyBnZW5lcmF0ZVNXIH0gZnJvbSAncm9sbHVwLXBsdWdpbi13b3JrYm94JztcclxuaW1wb3J0IHsgVml0ZVBsdWdpblNpdGVtYXAgfSBmcm9tICdAdG9ybWFrL3ZpdGUtcGx1Z2luLXNpdGVtYXAnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbXHJcbiAgICBWaXRlUGx1Z2luU2l0ZW1hcCh7XHJcbiAgICAgIGJhc2VVcmw6ICdodHRwczovL3RyYXZpc2xhbmUuZGV2JyxcclxuICAgICAgY29udGVudEJhc2U6ICdwdWJsaWMnLFxyXG4gICAgICByb3V0ZXM6IFtcclxuICAgICAgICB7IHBhdGg6ICcvJywgbmFtZTogJ0hvbWUnIH0sXHJcbiAgICAgICAgeyBwYXRoOiAnL2V4cGVyaWVuY2UnLCBuYW1lOiAnRXhwZXJpZW5jZScgfSxcclxuICAgICAgICB7IHBhdGg6ICcvcHJvamVjdHMnLCBuYW1lOiAnUHJvamVjdHMnIH0sXHJcbiAgICAgICAgeyBwYXRoOiAnL2NvbnRhY3QnLCBuYW1lOiAnQ29udGFjdCcgfSxcclxuICAgICAgXSxcclxuICAgICAgdXJsR2VuSG9vazogYXN5bmMgKGNvbmZpZzogeyByb3V0ZXM6IGFueTsgfSkgPT4ge1xyXG4gICAgICAgIGxldCByb3V0ZXMgPSBjb25maWcucm91dGVzO1xyXG4gICAgICAgIHJldHVybiByb3V0ZXM7XHJcbiAgICAgIH1cclxuICAgIH0pLFxyXG4gICAgc3ZlbHRlKHtcclxuICAgICAgcHJlcHJvY2VzczogW1xyXG4gICAgICAgIHN2ZWx0ZVByZXByb2Nlc3Moe1xyXG4gICAgICAgICAgdHlwZXNjcmlwdDogdHJ1ZSxcclxuICAgICAgICB9KSxcclxuICAgICAgXSxcclxuICAgIH0pLFxyXG4gICAgZ2VuZXJhdGVTVyh7XHJcbiAgICAgIHN3RGVzdDogJy4vZGlzdC9zZXJ2aWNlLXdvcmtlci5qcycsXHJcbiAgICAgIGdsb2JEaXJlY3Rvcnk6ICcuL2Rpc3QnLFxyXG4gICAgICBnbG9iUGF0dGVybnM6IFtcclxuICAgICAgICAnKiovKi57aHRtbCxqc29uLGpzLGNzc30nLFxyXG4gICAgICBdLFxyXG4gICAgICBza2lwV2FpdGluZzogdHJ1ZSxcclxuICAgICAgY2xpZW50c0NsYWltOiB0cnVlLFxyXG4gICAgICBydW50aW1lQ2FjaGluZzogW3tcclxuICAgICAgICB1cmxQYXR0ZXJuOiAvXFwuKD86cG5nfGpwZ3xqcGVnfHN2Z3x3ZWJwKSQvLFxyXG4gICAgICAgIGhhbmRsZXI6ICdOZXR3b3JrRmlyc3QnLFxyXG4gICAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAgIGNhY2hlTmFtZTogJ2ltYWdlcycsXHJcbiAgICAgICAgICBleHBpcmF0aW9uOiB7XHJcbiAgICAgICAgICAgIG1heEVudHJpZXM6IDEwLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgdXJsUGF0dGVybjogL1xcLig/OmpzfGNzcykkLyxcclxuICAgICAgICBoYW5kbGVyOiAnTmV0d29ya0ZpcnN0JyxcclxuICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICBjYWNoZU5hbWU6ICdhc3NldHMnLFxyXG4gICAgICAgICAgZXhwaXJhdGlvbjoge1xyXG4gICAgICAgICAgICBtYXhFbnRyaWVzOiAxMCxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIHVybFBhdHRlcm46IC9cXC4oPzpodG1sKSQvLFxyXG4gICAgICAgIGhhbmRsZXI6ICdOZXR3b3JrRmlyc3QnLFxyXG4gICAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAgIGNhY2hlTmFtZTogJ3BhZ2VzJyxcclxuICAgICAgICAgIGV4cGlyYXRpb246IHtcclxuICAgICAgICAgICAgbWF4RW50cmllczogMTAsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH1dLFxyXG4gICAgfSlcclxuICBdXHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBQSxTQUFTLG9CQUFvQjtBQUM3QixTQUFTLGNBQWM7QUFDdkIsT0FBTyxzQkFBc0I7QUFDN0IsU0FBUyxrQkFBa0I7QUFDM0IsU0FBUyx5QkFBeUI7QUFFbEMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1Asa0JBQWtCO0FBQUEsTUFDaEIsU0FBUztBQUFBLE1BQ1QsYUFBYTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sRUFBRSxNQUFNLEtBQUssTUFBTSxPQUFPO0FBQUEsUUFDMUIsRUFBRSxNQUFNLGVBQWUsTUFBTSxhQUFhO0FBQUEsUUFDMUMsRUFBRSxNQUFNLGFBQWEsTUFBTSxXQUFXO0FBQUEsUUFDdEMsRUFBRSxNQUFNLFlBQVksTUFBTSxVQUFVO0FBQUEsTUFDdEM7QUFBQSxNQUNBLFlBQVksT0FBTyxXQUE2QjtBQUM5QyxZQUFJLFNBQVMsT0FBTztBQUNwQixlQUFPO0FBQUEsTUFDVDtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsT0FBTztBQUFBLE1BQ0wsWUFBWTtBQUFBLFFBQ1YsaUJBQWlCO0FBQUEsVUFDZixZQUFZO0FBQUEsUUFDZCxDQUFDO0FBQUEsTUFDSDtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBLE1BQ1QsUUFBUTtBQUFBLE1BQ1IsZUFBZTtBQUFBLE1BQ2YsY0FBYztBQUFBLFFBQ1o7QUFBQSxNQUNGO0FBQUEsTUFDQSxhQUFhO0FBQUEsTUFDYixjQUFjO0FBQUEsTUFDZCxnQkFBZ0IsQ0FBQztBQUFBLFFBQ2YsWUFBWTtBQUFBLFFBQ1osU0FBUztBQUFBLFFBQ1QsU0FBUztBQUFBLFVBQ1AsV0FBVztBQUFBLFVBQ1gsWUFBWTtBQUFBLFlBQ1YsWUFBWTtBQUFBLFVBQ2Q7QUFBQSxRQUNGO0FBQUEsTUFDRixHQUFHO0FBQUEsUUFDRCxZQUFZO0FBQUEsUUFDWixTQUFTO0FBQUEsUUFDVCxTQUFTO0FBQUEsVUFDUCxXQUFXO0FBQUEsVUFDWCxZQUFZO0FBQUEsWUFDVixZQUFZO0FBQUEsVUFDZDtBQUFBLFFBQ0Y7QUFBQSxNQUNGLEdBQUc7QUFBQSxRQUNELFlBQVk7QUFBQSxRQUNaLFNBQVM7QUFBQSxRQUNULFNBQVM7QUFBQSxVQUNQLFdBQVc7QUFBQSxVQUNYLFlBQVk7QUFBQSxZQUNWLFlBQVk7QUFBQSxVQUNkO0FBQUEsUUFDRjtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0gsQ0FBQztBQUFBLEVBQ0g7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
