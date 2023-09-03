<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { archive } from "../../linkConfig";
  import CardEntry from "../../components/CardEntry.svelte";
  import { sortEntriesBasedOnIndex } from "../../utils";

  let entries: Project[] = [];

  onMount(() => {
    entries = [...Array.from(archive).sort(sortEntriesBasedOnIndex).map(([key, entry]) => entry)];
  });
</script>

<div id="archive">
  <div class="content card" in:fade>
    {#each entries as entry}
      <CardEntry entryData={entry}/>
    {/each }
  </div>
</div>

<style>
	#archive {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  @media (orientation: landscape) and (min-width:1200px) {
    .content {
      width: 100%;
      height: 100%;
      position: relative;
      overflow-x: hidden;
    }
    .card {
      display: grid;
      grid-template-columns: repeat(auto-fill, 330px);
      grid-auto-rows: max-content;
      grid-row-gap: 1em;
      grid-column-gap: 1em;
      overflow: scroll;
    }
  }
  @media (orientation: portrait) or (max-width: 1199px) {
    .content {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      overflow: scroll;
      overflow-x: hidden;
    }
  }
</style>