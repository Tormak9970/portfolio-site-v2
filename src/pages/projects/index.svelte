<script lang="ts">
  import { projects } from "../../loadConfig";
  import { sortEntriesBasedOnIndex } from "../../Utils";
  import ProjectEntry from "../../components/entries/ProjectEntry.svelte";
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";

  let entries: Project[] = Array.from(projects.values()).sort(sortEntriesBasedOnIndex);
  const imageMap: Map<number, HTMLImageElement> = new Map();

  onMount(() => {
    entries.map((entry, i) => {
      const img = new Image();
      img.onload = () => {
        imageMap.set(i, img);
      }
      img.src = entry.image;
    });
  });
</script>

<div class="projects-container">
  <div class="content" in:fade>
    {#each entries as entry, i}
      <ProjectEntry entry={entry} image={imageMap.get(i)}/>
    {/each }
  </div>
</div>

<style>
	.projects-container {
    width: 100%;
    height: 100%;

    overflow: scroll;
  }
  
  .content {
    width: 100%;
    
    display: flex;
    flex-direction: column;
    align-items: center;

    padding-bottom: 30px;
  }
</style>