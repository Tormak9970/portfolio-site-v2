<script lang="ts">
  import MediaQuery from "../utils/MediaQuery.svelte";

  export let entryData: Experience;
</script>

<div class="entry">
  <MediaQuery query="(min-width: 750px)" let:matches>
    {#if matches}
      <div class="time-container" style="margin-top: 15px;">
        {entryData.start} — {entryData.end}
      </div>
    {/if}
    <div class="info-container">
      <h2 class="experience-header">{entryData.position}</h2>
      {#if !matches}
        <div class="time-container">
          {entryData.start} — {entryData.end}
        </div>
      {/if}
      <div class="company">{entryData.company}</div>
      <div class="description">{entryData.description}</div>
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
