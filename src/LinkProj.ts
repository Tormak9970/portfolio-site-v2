import { jumpTo } from "./components/Projects.svelte";

interface Release {
    name:string,
    date:string,
    length:string,
    changes:string[],
    bugFixes?:string[]
}

interface Project {
    name:string,
    time:string,
    status:string,
    difficulty:string,
    description:string,
    takeaways:string[],
    releases?:Release[],
    link?:string,
    imgMarkup:string
}

const projects:Map<string, Project> = new Map();

async function loadProjects() {
    const config = await fetch('./config.json').then(response => { return response.json(); }).then(json => { return json['projects']; });

    for (const entr of Object.entries(config)) {
        for (const proj of Object.entries(entr[1])) {
            projects.set(proj[0], proj[1]);
        }
    }
}

async function displayProject(projId: string) { jumpTo(projId); }

export { loadProjects, displayProject, projects };
export type { Project, Release };