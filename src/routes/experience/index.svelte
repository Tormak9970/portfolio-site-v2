<script lang="ts">
  import { fade } from "svelte/transition";
  import { sortEntriesBasedOnIndex } from "../../lib/utils";
  import { experience, loadConfig } from '../../lib/loadConfig';
  import ExperienceEntry from "../../components/entries/ExperienceEntry.svelte";
  import LoadingAnimation from "../../components/utils/LoadingAnimation.svelte";

  let configLoadPromise = loadConfig();
  let entries: Experience[];

  configLoadPromise.then(() => {
    entries = Array.from(experience.values()).sort(sortEntriesBasedOnIndex)
  });
</script>

<div class="experience-container">
  {#await configLoadPromise}
    <LoadingAnimation />
  {:then}
    <div class="content" in:fade>
      {#each entries as entry}
        <ExperienceEntry entry={entry}/>
      {/each}
    </div>
  {/await}
</div>

<style>
  .experience-container {
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
    justify-content: center;

    padding-bottom: 30px;
  }
</style>