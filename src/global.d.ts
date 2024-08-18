/// <reference types="svelte" />
/// <reference types="vite/client" />

interface Project {
  index: number,
  name: string,
  description: string,
  tech: string[],
  content: any,
  link?: string,
  image: string
}

interface Experience {
  index: number,
  company: string,
  duration: string,
  position: string,
  companyLink: string,
  description: string,
  content?: any
}

declare module 'editorjs-html';