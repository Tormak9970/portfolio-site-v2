/// <reference types="svelte" />
/// <reference types="vite/client" />

interface Project {
  index: number,
  name: string,
  description: string,
  content: any,
  link?: string,
  image: string
}

interface Experience {
  index: number,
  company: string,
  image: string,
  position: string,
  description: string
}

declare module 'editorjs-html';