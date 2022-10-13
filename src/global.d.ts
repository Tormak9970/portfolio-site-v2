/// <reference types="svelte" />

interface Project {
    name:string,
    time:string,
    status:string,
    difficulty:string,
    description:string,
    isRelative?:boolean,
    category:string,
    content:any,
    link?:string,
    img:string,
    org:string
}

interface Art {
    name:string,
    img:string,
    description:string
}

interface Organization {
    name:string,
    img:string,
    about:string,
    description:string,
    projects:OrganizationProj[],
    link:string
}

interface OrganizationProj {
    name:string,
    linkId:string
}

interface Experience {
    company:string,
    img:string,
    position:string,
    description:string
}