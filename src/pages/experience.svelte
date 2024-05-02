<script lang="ts">
  import { fade } from "svelte/transition";
  import { sortEntriesBasedOnIndex } from "../Utils";
  import { experience } from '../loadConfig';
  import ExperienceEntry from "../components/entries/ExperienceEntry.svelte";

  let entries: Experience[] = Array.from(experience.values()).sort(sortEntriesBasedOnIndex);
</script>

<div id="experience">
  <div class="content" in:fade>
    {#each entries as expEntr}
      <ExperienceEntry entryData={expEntr}/>
    {/each }
  </div>
</div>

<style>
  #experience {
    width: 100%;
    height: 100%;
    
    overflow: scroll;
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