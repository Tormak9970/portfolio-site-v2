<script lang="ts">
  import { fade } from "svelte/transition";
  import { experienceScrollIdx, orientation } from "../Stores";
  import { experience } from '../linkConfig';
  import { afterPageLoad } from '@roxi/routify';
  import { onMount } from "svelte";
  import { interceptScrollFromIdx, jumpToHandler, manageScroll, orientationQuery, processEntries, sortEntriesBasedOnIndex } from "../utils";
  import MediaQuery from "../components/utils/MediaQuery.svelte";
  import ExperienceEntry from "../components/entries/ExperienceEntry.svelte";
  import JumpList from "../components/utils/JumpList.svelte";
  import CardEntry from "../components/CardEntry.svelte";

  interface ExperienceListEntry {
    key:string,
    data:Experience,
    isLast:boolean
  }

  const jumpNames: Map<number, string> = new Map();

  let entries: ExperienceListEntry[] = [];

  $afterPageLoad(() => {
    if ($experienceScrollIdx != 0) {
      $experienceScrollIdx -= 1;
      if ($orientation === 0) interceptScrollFromIdx(false, $experienceScrollIdx+1, experienceScrollIdx);
    }
    return true;
  });

  onMount(() => {
    Array.from(experience).sort(sortEntriesBasedOnIndex).map(processEntries(entries, experience, jumpNames, 0));
    entries = [...entries];
  });
</script>

<svelte:window on:wheel|stopPropagation|preventDefault="{manageScroll(entries, experienceScrollIdx)}" />

<div id="experience">
  <div class="content{$orientation === 0 ? ' fancy' : ' card'}" in:fade>
    <MediaQuery query="{orientationQuery}" let:matches>
      {#if matches && $orientation === 0}
        {#key $experienceScrollIdx}
          <ExperienceEntry entryData={entries[$experienceScrollIdx].data} isLast={entries[$experienceScrollIdx].isLast}/>
        {/key}
      {:else}
        {#each entries as expEntr}
          <CardEntry entryData={expEntr.data}/>
        {/each }
      {/if}
    </MediaQuery>
  </div>
  <MediaQuery query="{orientationQuery}" let:matches>
    {#if matches}
      <JumpList len={experience.size} tooltips={jumpNames} handler={jumpToHandler(experienceScrollIdx)} scrollIdx={$experienceScrollIdx}/>
    {/if}
  </MediaQuery>
</div>

<style>
  #experience {
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

    .fancy {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      position: relative;

      overflow: hidden;
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