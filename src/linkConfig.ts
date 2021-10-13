const projects:Map<string, Project> = new Map();
const organizations:Map<string, Organization> = new Map();
const art:Map<string, Art> = new Map();
let featured:Project;

async function loadConfig() {
    const config = await fetch('./config.json').then(response => { return response.json(); });

    for (const entr of Object.entries(config['projects'])) {
        for (const proj of Object.entries(entr[1])) {
            projects.set(proj[0], proj[1] as Project);
        }
    }

    for (const entr of Object.entries(config['organizations'])) {
        organizations.set(entr[0], entr[1] as Organization);
    }

    for (const entr of Object.entries(config['art'])) {
        art.set(entr[0], entr[1] as Art);
    }

    const feat = config['featured']
    featured = projects.get(feat);
}

export { loadConfig, projects, organizations, art, featured };