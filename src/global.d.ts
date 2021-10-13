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

    interface Art {
        name:string,
        path:string,
        description:string
    }

    interface Organization {
        name:string,
        path:string,
		about:string,
        description:string,
		projects:OrganizationProj[]
    }

    interface OrganizationProj {
        name:string,
        link:string
    }