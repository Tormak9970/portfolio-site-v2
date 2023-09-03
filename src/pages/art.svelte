<script lang="ts">
  import { fade } from "svelte/transition";
  import { artScrollIdx, orientation } from "../Stores";
  import { art } from '../linkConfig';
  import { afterPageLoad } from '@roxi/routify';
  import { onMount } from "svelte";
  import { interceptScrollFromIdx, jumpToHandler, manageScroll, orientationQuery, processEntries, sortEntriesBasedOnIndex } from "../utils";
  import MediaQuery from "../components/utils/MediaQuery.svelte";
  import ArtEntry from "../components/entries/ArtEntry.svelte";
  import JumpList from "../components/utils/JumpList.svelte";
  import CardEntry from "../components/CardEntry.svelte";

  interface ArtEntry {
    key:string,
    data:Art,
    isLast:boolean
  }

  const jumpNames: Map<number, string> = new Map([[0, "Foreword"]]);
  const imageMap: Map<number, HTMLImageElement> = new Map();

  let entries: ArtEntry[] = [
    {
      "key": "forword",
      "data": {
        "index": -1,
        "name": "Foreword",
        "image": undefined,
        "description": `I am by no means a professional artist, but I have always liked being creative and making different forms of art. 
          I enjoy practicing art, and it is a good to take a break from development every now and again. 
          Additionally, I find this practice invaluable when it comes to being a developer, 
          as being able to impliment creativity into your work can really set you apart, and greatly improve whatever product you are designing.`
      },
      "isLast": false
    }
  ];

  $afterPageLoad(() => {
    if ($artScrollIdx != 0) {
      $artScrollIdx -= 1;
      if ($orientation === 0) interceptScrollFromIdx(false, $artScrollIdx+1, artScrollIdx);
    }
    return true;
  });

  onMount(() => {
    Array.from(art).sort(sortEntriesBasedOnIndex).map(processEntries(entries, art, jumpNames, 1, imageMap));
    entries = [...entries];
  });
</script>

<svelte:window on:wheel|stopPropagation="{manageScroll(entries, artScrollIdx)}" />

<div id="art">
  <div class="content{$orientation === 0 ? ' fancy' : ' card'}" in:fade>
    <MediaQuery query="{orientationQuery}" let:matches>
      {#if matches && $orientation === 0}
        {#key $artScrollIdx}
          <ArtEntry entryData={entries[$artScrollIdx].data} image={imageMap.get($artScrollIdx)} isLast={entries[$artScrollIdx].isLast}/>
        {/key}
      {:else}
        {#each entries as artEntr}
          <CardEntry entryData={artEntr.data}/>
        {/each }
      {/if}
    </MediaQuery>
  </div>
  <MediaQuery query="{orientationQuery}" let:matches>
    {#if matches}
      <JumpList len={art.size+1} tooltips={jumpNames} handler={jumpToHandler(artScrollIdx)} scrollIdx={$artScrollIdx}/>
    {/if}
  </MediaQuery>
</div>

<style>
  #art {
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