const projects: Map<string, Project> = new Map();
const experience: Map<string, Experience> = new Map();

let configLoaded = false;

async function loadConfig() {
  if (!configLoaded) {
    const config = await fetch('/config.json').then(response => { return response.json(); });

    for (const entr of Object.entries(config['projects'])) {
      projects.set(entr[0], entr[1] as Project);
    }

    for (const entr of Object.entries(config['experience'])) {
      experience.set(entr[0], entr[1] as Experience);
    }

    configLoaded = true;
  }
}

export { loadConfig, projects, experience };