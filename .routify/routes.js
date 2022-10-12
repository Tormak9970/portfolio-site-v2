
/**
 * @roxi/routify 2.18.3
 * File generated Wed Oct 12 2022 15:10:03 GMT-0400 (Eastern Daylight Time)
 */

export const __version = "2.18.3"
export const __timestamp = "2022-10-12T19:10:03.935Z"

//buildRoutes
import { buildClientTree } from "@roxi/routify/runtime/buildRoutes"

//imports


//options
export const options = {}

//tree
export const _tree = {
  "name": "_layout",
  "filepath": "/_layout.svelte",
  "root": true,
  "ownMeta": {},
  "absolutePath": "C:/Users/Tormak/Documents/GitHub/portfolio-site-v2/src/pages/_layout.svelte",
  "children": [
    {
      "isFile": true,
      "isDir": false,
      "file": "_fallback.svelte",
      "filepath": "/_fallback.svelte",
      "name": "_fallback",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "C:/Users/Tormak/Documents/GitHub/portfolio-site-v2/src/pages/_fallback.svelte",
      "importPath": "../src/pages/_fallback.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": true,
      "isPage": false,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/_fallback",
      "id": "__fallback",
      "component": () => import('../src/pages/_fallback.svelte').then(m => m.default)
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "about.svelte",
      "filepath": "/about.svelte",
      "name": "about",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "C:/Users/Tormak/Documents/GitHub/portfolio-site-v2/src/pages/about.svelte",
      "importPath": "../src/pages/about.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/about",
      "id": "_about",
      "component": () => import('../src/pages/about.svelte').then(m => m.default)
    },
    {
      "isFile": false,
      "isDir": true,
      "file": "archive",
      "filepath": "/archive",
      "name": "archive",
      "ext": "",
      "badExt": false,
      "absolutePath": "C:/Users/Tormak/Documents/GitHub/portfolio-site-v2/src/pages/archive",
      "children": [
        {
          "isFile": true,
          "isDir": false,
          "file": "[project].svelte",
          "filepath": "/archive/[project].svelte",
          "name": "[project]",
          "ext": "svelte",
          "badExt": false,
          "absolutePath": "C:/Users/Tormak/Documents/GitHub/portfolio-site-v2/src/pages/archive/[project].svelte",
          "importPath": "../src/pages/archive/[project].svelte",
          "isLayout": false,
          "isReset": false,
          "isIndex": false,
          "isFallback": false,
          "isPage": true,
          "ownMeta": {},
          "meta": {
            "recursive": true,
            "preload": false,
            "prerender": true
          },
          "path": "/archive/:project",
          "id": "_archive__project",
          "component": () => import('../src/pages/archive/[project].svelte').then(m => m.default)
        },
        {
          "isFile": true,
          "isDir": false,
          "file": "index.svelte",
          "filepath": "/archive/index.svelte",
          "name": "index",
          "ext": "svelte",
          "badExt": false,
          "absolutePath": "C:/Users/Tormak/Documents/GitHub/portfolio-site-v2/src/pages/archive/index.svelte",
          "importPath": "../src/pages/archive/index.svelte",
          "isLayout": false,
          "isReset": false,
          "isIndex": true,
          "isFallback": false,
          "isPage": true,
          "ownMeta": {},
          "meta": {
            "recursive": true,
            "preload": false,
            "prerender": true
          },
          "path": "/archive/index",
          "id": "_archive_index",
          "component": () => import('../src/pages/archive/index.svelte').then(m => m.default)
        }
      ],
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": false,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/archive"
    },
    {
      "isFile": false,
      "isDir": true,
      "file": "art",
      "filepath": "/art",
      "name": "art",
      "ext": "",
      "badExt": false,
      "absolutePath": "C:/Users/Tormak/Documents/GitHub/portfolio-site-v2/src/pages/art",
      "children": [
        {
          "isFile": true,
          "isDir": false,
          "file": "index.svelte",
          "filepath": "/art/index.svelte",
          "name": "index",
          "ext": "svelte",
          "badExt": false,
          "absolutePath": "C:/Users/Tormak/Documents/GitHub/portfolio-site-v2/src/pages/art/index.svelte",
          "importPath": "../src/pages/art/index.svelte",
          "isLayout": false,
          "isReset": false,
          "isIndex": true,
          "isFallback": false,
          "isPage": true,
          "ownMeta": {},
          "meta": {
            "recursive": true,
            "preload": false,
            "prerender": true
          },
          "path": "/art/index",
          "id": "_art_index",
          "component": () => import('../src/pages/art/index.svelte').then(m => m.default)
        }
      ],
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": false,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/art"
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "contact.svelte",
      "filepath": "/contact.svelte",
      "name": "contact",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "C:/Users/Tormak/Documents/GitHub/portfolio-site-v2/src/pages/contact.svelte",
      "importPath": "../src/pages/contact.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/contact",
      "id": "_contact",
      "component": () => import('../src/pages/contact.svelte').then(m => m.default)
    },
    {
      "isFile": false,
      "isDir": true,
      "file": "experience",
      "filepath": "/experience",
      "name": "experience",
      "ext": "",
      "badExt": false,
      "absolutePath": "C:/Users/Tormak/Documents/GitHub/portfolio-site-v2/src/pages/experience",
      "children": [
        {
          "isFile": true,
          "isDir": false,
          "file": "index.svelte",
          "filepath": "/experience/index.svelte",
          "name": "index",
          "ext": "svelte",
          "badExt": false,
          "absolutePath": "C:/Users/Tormak/Documents/GitHub/portfolio-site-v2/src/pages/experience/index.svelte",
          "importPath": "../src/pages/experience/index.svelte",
          "isLayout": false,
          "isReset": false,
          "isIndex": true,
          "isFallback": false,
          "isPage": true,
          "ownMeta": {},
          "meta": {
            "recursive": true,
            "preload": false,
            "prerender": true
          },
          "path": "/experience/index",
          "id": "_experience_index",
          "component": () => import('../src/pages/experience/index.svelte').then(m => m.default)
        }
      ],
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": false,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/experience"
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "featured.svelte",
      "filepath": "/featured.svelte",
      "name": "featured",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "C:/Users/Tormak/Documents/GitHub/portfolio-site-v2/src/pages/featured.svelte",
      "importPath": "../src/pages/featured.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/featured",
      "id": "_featured",
      "component": () => import('../src/pages/featured.svelte').then(m => m.default)
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "index.svelte",
      "filepath": "/index.svelte",
      "name": "index",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "C:/Users/Tormak/Documents/GitHub/portfolio-site-v2/src/pages/index.svelte",
      "importPath": "../src/pages/index.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": true,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/index",
      "id": "_index",
      "component": () => import('../src/pages/index.svelte').then(m => m.default)
    },
    {
      "isFile": false,
      "isDir": true,
      "file": "organizations",
      "filepath": "/organizations",
      "name": "organizations",
      "ext": "",
      "badExt": false,
      "absolutePath": "C:/Users/Tormak/Documents/GitHub/portfolio-site-v2/src/pages/organizations",
      "children": [
        {
          "isFile": true,
          "isDir": false,
          "file": "index.svelte",
          "filepath": "/organizations/index.svelte",
          "name": "index",
          "ext": "svelte",
          "badExt": false,
          "absolutePath": "C:/Users/Tormak/Documents/GitHub/portfolio-site-v2/src/pages/organizations/index.svelte",
          "importPath": "../src/pages/organizations/index.svelte",
          "isLayout": false,
          "isReset": false,
          "isIndex": true,
          "isFallback": false,
          "isPage": true,
          "ownMeta": {},
          "meta": {
            "recursive": true,
            "preload": false,
            "prerender": true
          },
          "path": "/organizations/index",
          "id": "_organizations_index",
          "component": () => import('../src/pages/organizations/index.svelte').then(m => m.default)
        }
      ],
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": false,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/organizations"
    },
    {
      "isFile": false,
      "isDir": true,
      "file": "projects",
      "filepath": "/projects",
      "name": "projects",
      "ext": "",
      "badExt": false,
      "absolutePath": "C:/Users/Tormak/Documents/GitHub/portfolio-site-v2/src/pages/projects",
      "children": [
        {
          "isFile": true,
          "isDir": false,
          "file": "[project].svelte",
          "filepath": "/projects/[project].svelte",
          "name": "[project]",
          "ext": "svelte",
          "badExt": false,
          "absolutePath": "C:/Users/Tormak/Documents/GitHub/portfolio-site-v2/src/pages/projects/[project].svelte",
          "importPath": "../src/pages/projects/[project].svelte",
          "isLayout": false,
          "isReset": false,
          "isIndex": false,
          "isFallback": false,
          "isPage": true,
          "ownMeta": {},
          "meta": {
            "recursive": true,
            "preload": false,
            "prerender": true
          },
          "path": "/projects/:project",
          "id": "_projects__project",
          "component": () => import('../src/pages/projects/[project].svelte').then(m => m.default)
        },
        {
          "isFile": true,
          "isDir": false,
          "file": "index.svelte",
          "filepath": "/projects/index.svelte",
          "name": "index",
          "ext": "svelte",
          "badExt": false,
          "absolutePath": "C:/Users/Tormak/Documents/GitHub/portfolio-site-v2/src/pages/projects/index.svelte",
          "importPath": "../src/pages/projects/index.svelte",
          "isLayout": false,
          "isReset": false,
          "isIndex": true,
          "isFallback": false,
          "isPage": true,
          "ownMeta": {},
          "meta": {
            "recursive": true,
            "preload": false,
            "prerender": true
          },
          "path": "/projects/index",
          "id": "_projects_index",
          "component": () => import('../src/pages/projects/index.svelte').then(m => m.default)
        }
      ],
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": false,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/projects"
    }
  ],
  "isLayout": true,
  "isReset": false,
  "isIndex": false,
  "isFallback": false,
  "isPage": false,
  "isFile": true,
  "file": "_layout.svelte",
  "ext": "svelte",
  "badExt": false,
  "importPath": "../src/pages/_layout.svelte",
  "meta": {
    "recursive": true,
    "preload": false,
    "prerender": true
  },
  "path": "/",
  "id": "__layout",
  "component": () => import('../src/pages/_layout.svelte').then(m => m.default)
}


export const {tree, routes} = buildClientTree(_tree)

