<script lang="ts">
  import { fade } from "svelte/transition";
  import { allowScroll, expScrollIdx, orientation, scrollDir } from "../Stores";
  import { experience } from '../linkConfig';
  import { afterPageLoad } from '@roxi/routify';
  import { onMount } from "svelte";
  import { orientationQuery, sortEntriesBasedOnIndex } from "../utils";
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

  function interceptScroll(e: WheelEvent) {
    const direction:boolean = e.deltaY > 0; // true = down, false = up
    
    if (!($expScrollIdx == 0 && !direction) && !($expScrollIdx == entries.length-1 && direction) && Math.abs(e.deltaY) != 0) {
      if (direction) {
        $expScrollIdx++;
      } else {
        $expScrollIdx--;
      }
      $scrollDir = direction;
    } else {
      $allowScroll = true;
    }
  }
  function interceptScrollFromIdx(direction: boolean, tarIdx: number) {
    $expScrollIdx = tarIdx;
    $scrollDir = direction;
  }
  function jumpToHandler(e: MouseEvent) {
    const target:HTMLElement = <HTMLElement>e.currentTarget;
    const curIdx = $expScrollIdx;
    const tarIdx:number = parseInt(target.id.substring(0, target.id.indexOf('-')));
    interceptScrollFromIdx(curIdx < tarIdx, tarIdx);
  }

  function manageScroll(e: WheelEvent) {
    if ($orientation === 0) {
      if ($allowScroll) {
        $allowScroll = false;
        setTimeout(() => $allowScroll = true, 300);
        interceptScroll(e);
      }
    }
  }

  function processEntries([key, entr]:[string, Experience], i: number) { 
    entries.push({
      "key": key,
      "data": entr,
      "isLast": i+1 == experience.size
    });
    jumpNames.set(i, entr.position);
    return entr; 
  }

  $afterPageLoad(() => {
    if ($expScrollIdx != 0) {
      $expScrollIdx -= 1;
      if ($orientation === 0) interceptScrollFromIdx(false, $expScrollIdx+1);
    }
    return true;
  });

  onMount(() => {
    Array.from(experience).sort(sortEntriesBasedOnIndex).map(processEntries);
    entries = [...entries];
  });
</script>

<svelte:window on:wheel|stopPropagation|preventDefault="{manageScroll}" />

<div id="experience">
  <div class="content{$orientation === 0 ? ' fancy' : ' card'}" in:fade>
    <MediaQuery query="{orientationQuery}" let:matches>
      {#if matches && $orientation === 0}
        {#key $expScrollIdx}
          <ExperienceEntry entryData={entries[$expScrollIdx].data} isLast={entries[$expScrollIdx].isLast}/>
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
      <JumpList len={experience.size} tooltips={jumpNames} handler={jumpToHandler} scrollIdx={$expScrollIdx}/>
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