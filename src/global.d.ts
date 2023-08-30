/// <reference types="svelte" />

interface Project {
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
  name: string,
  image: string,
  description: string
}

interface Organization {
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
  company: string,
  image: string,
  position: string,
  description: string
}

declare module 'editorjs-html';