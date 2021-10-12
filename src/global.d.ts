/// <reference types="svelte" />

    interface Project {
        name:string,
        time:string,
        status:string,
        difficulty:string,
        description:string,
        isRelative?:boolean,
        content:any,
        link?:string,
        imgs:string[]
    }