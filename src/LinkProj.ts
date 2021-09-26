interface Project {
    name:string,
    time:string,
    status:string,
    difficulty:string,
    description:string,
    link:string,
    imgMarkup:string
}

const projects = {};

async function loadProjects() {
    const config = await fetch('./config.json').then(response => { return response.json(); }).then(json => { return json['projects']; });

    for (const entr of Object.entries(config)) {
        for (const proj of Object.entries(entr[1])) {
            projects[proj[0]] = proj[1];
        }
    }
}

async function displayProject(projId: string) {
    console.log(projects[projId]);
}

export { loadProjects, displayProject };