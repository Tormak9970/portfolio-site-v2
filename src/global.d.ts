/// <reference types="svelte" />

interface Project {
  index: number,
  name: string,
  time: string,
  status: string,
  difficulty: string,
  description: string,
  isRelative?: boolean,
  category: string,
  content: any,
  link?: string,
  image: string,
  organization: string
}

interface Art {
  index: number,
  name: string,
  image: string,
  description: string
}

interface Organization {
  index: number,
  name: string,
  image: string,
  about: string,
  description: string,
  projects: OrganizationProj[],
  link: string
}

interface OrganizationProj {
  name: string,
  linkId: string
}

interface Experience {
  index: number,
  company: string,
  image: string,
  position: string,
  description: string
}

declare module 'editorjs-html';