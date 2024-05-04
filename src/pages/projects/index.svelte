<script lang="ts">
  import { loadConfig, projects } from "../../loadConfig";
  import { sortEntriesBasedOnIndex } from "../../Utils";
  import ProjectEntry from "../../components/entries/ProjectEntry.svelte";
  import { fade } from "svelte/transition";
  import LoadingAnimation from "../../components/utils/LoadingAnimation.svelte";

  let configLoadPromise = loadConfig();
  let entries: Project[];

  configLoadPromise.then(() => {
    entries = Array.from(projects.values()).sort(sortEntriesBasedOnIndex)
  });
</script>

<div class="projects-container">
  {#await configLoadPromise}
    <LoadingAnimation />
  {:then} 
    <div class="content" in:fade>
      {#each entries as entry}
        <ProjectEntry entry={entry} />
      {/each }
    </div>
  {/await}
</div>

<style>
	.projects-container {
    width: 100%;
    height: 100%;

    overflow-y: scroll;
    overflow-x: hidden;
  }
  
  .content {
    width: 100%;
    
    display: flex;
    flex-direction: column;
    align-items: center;

    padding-bottom: 30px;
  }
</style>