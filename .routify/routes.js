
/**
 * @roxi/routify 2.18.3
 * File generated Thu Aug 25 2022 09:55:58 GMT-0400 (Eastern Daylight Time)
 */

export const __version = "2.18.3"
export const __timestamp = "2022-08-25T13:55:58.657Z"

//buildRoutes
import { buildClientTree } from "@roxi/routify/runtime/buildRoutes"

//imports


//options
export const options = {}

//tree
export const _tree = {
  "root": true,
  "children": [
    {
      "isFallback": true,
      "path": "/_fallback",
      "component": () => import('../src/pages/_fallback.svelte').then(m => m.default)
    },
    {
      "isPage": true,
      "path": "/about",
      "id": "_about",
      "component": () => import('../src/pages/about.svelte').then(m => m.default)
    },
    {
      "isDir": true,
      "ext": "",
      "children": [
        {
          "isIndex": true,
          "isPage": true,
          "path": "/art/index",
          "id": "_art_index",
          "component": () => import('../src/pages/art/index.svelte').then(m => m.default)
        }
      ],
      "path": "/art"
    },
    {
      "isPage": true,
      "path": "/contact",
      "id": "_contact",
      "component": () => import('../src/pages/contact.svelte').then(m => m.default)
    },
    {
      "isDir": true,
      "ext": "",
      "children": [
        {
          "isIndex": true,
          "isPage": true,
          "path": "/experience/index",
          "id": "_experience_index",
          "component": () => import('../src/pages/experience/index.svelte').then(m => m.default)
        }
      ],
      "path": "/experience"
    },
    {
      "isPage": true,
      "path": "/featured",
      "id": "_featured",
      "component": () => import('../src/pages/featured.svelte').then(m => m.default)
    },
    {
      "isIndex": true,
      "isPage": true,
      "path": "/index",
      "id": "_index",
      "component": () => import('../src/pages/index.svelte').then(m => m.default)
    },
    {
      "isDir": true,
      "ext": "",
      "children": [
        {
          "isIndex": true,
          "isPage": true,
          "path": "/organizations/index",
          "id": "_organizations_index",
          "component": () => import('../src/pages/organizations/index.svelte').then(m => m.default)
        }
      ],
      "path": "/organizations"
    },
    {
      "isDir": true,
      "ext": "",
      "children": [
        {
          "isPage": true,
          "path": "/projects/:project",
          "id": "_projects__project",
          "component": () => import('../src/pages/projects/[project].svelte').then(m => m.default)
        },
        {
          "isIndex": true,
          "isPage": true,
          "path": "/projects/index",
          "id": "_projects_index",
          "component": () => import('../src/pages/projects/index.svelte').then(m => m.default)
        }
      ],
      "path": "/projects"
    }
  ],
  "isLayout": true,
  "path": "/",
  "id": "__layout",
  "component": () => import('../src/pages/_layout.svelte').then(m => m.default)
}


export const {tree, routes} = buildClientTree(_tree)

