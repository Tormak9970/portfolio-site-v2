<script lang="ts">
  import { fly } from "svelte/transition";
  import MediaQuery from "../utils/MediaQuery.svelte";
  import DiagonalLink from "../utils/DiagonalLink.svelte";
  import RightLink from "../utils/RightLink.svelte";
  import { getIdFromName } from "../../lib/utils";

  export let entry: Experience;

  $: id = getIdFromName(entry.company) + "-" + getIdFromName(entry.position);
  $: console.log(id);
</script>

<div class="entry" in:fly|global={{ delay: entry.index * 300, x: 200, duration: 1000 }}>
  <MediaQuery query="(min-width: 750px)" let:matches>
    {#if matches}
      <div class="time-container" style="margin-top: 15px;">
        {entry.duration}
      </div>
    {/if}
    <div class="info-container">
      <h2 class="experience-header">{entry.position}</h2>
      {#if !matches}
        <div class="time-container">
          {entry.duration}
        </div>
      {/if}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      
      <DiagonalLink label={entry.company} url={entry.companyLink} useIcon={false}/>
      <div class="description">{entry.description}</div>
      {#if entry.content?.blocks?.length > 0}
        <RightLink label="View Details" url="/experience/:id" urlParams={{ id: id }} isRelative />
      {/if}
    </div>
  </MediaQuery>
</div>

<style>
  .entry {
    width: 80%;
    max-width: 600px;

    display: flex;

    margin-bottom: 20px;
    margin-top: 30px;
  }

  .time-container {
    width: 150px;
    color: var(--highlight);
    font-weight: bold;
  }

  .info-container {
    display: flex;
    flex-direction: column;
  }

  .experience-header {
    font-size: 22px;
    margin: 0px;
    padding: 0;
  }

  .description {
    width: 100%;
    max-width: 450px;
    
    margin-top: 10px;

    font-size: 18px;
  }
</style>
