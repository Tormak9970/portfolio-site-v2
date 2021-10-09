const projects:Map<string, Project> = new Map();
let featured:Project;

async function loadProjects() {
    const config = await fetch('./config.json').then(response => { return response.json(); }).then(json => { return json['projects']; });

    for (const entr of Object.entries(config)) {
        for (const proj of Object.entries(entr[1])) {
            projects.set(proj[0], proj[1] as Project);
        }
    }

    const feat = await fetch('./config.json').then(response => { return response.json(); }).then(json => { return json['featured']; });
    featured = projects.get(feat);
}

export { loadProjects, projects, featured };