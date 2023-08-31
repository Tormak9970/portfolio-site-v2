<script lang="ts">
  import { fade } from "svelte/transition";
  import { allowScroll, artScrollIdx, orientation, scrollDir } from "../Stores";
  import { art } from '../linkConfig';
  import { afterPageLoad } from '@roxi/routify';
  import { onMount } from "svelte";
  import { orientationQuery } from "../utils";
    import MediaQuery from "../components/utils/MediaQuery.svelte";
    import ArtEntry from "../components/entries/ArtEntry.svelte";
    import ArtCardEntry from "../components/cards/ArtCardEntry.svelte";
    import JumpList from "../components/utils/JumpList.svelte";

  interface ArtEntry {
    key:string,
    data:Art,
    isLast:boolean
  }

  const jumpNames:Map<number, string> = new Map([[0, "Foreword"]]);

  let pieces:ArtEntry[] = [
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
  const imgsMap:Map<number, HTMLImageElement> = new Map();

  function interceptScroll(e: WheelEvent) {
    const direction:boolean = e.deltaY > 0; // true = down, false = up
    
    if (!($artScrollIdx == 0 && !direction) && !($artScrollIdx == pieces.length-1 && direction) && Math.abs(e.deltaY) != 0) {
      if (direction) {
        $artScrollIdx++;
      } else {
        $artScrollIdx--;
      }
      $scrollDir = direction;
    } else {
      $allowScroll = true;
    }
  }
  function interceptScrollFromIdx(direction:boolean, tarIdx:number) {
    $artScrollIdx = tarIdx;
    $scrollDir = direction;
  }
  function jumpToHandler(e: MouseEvent) {
    const target:HTMLElement = <HTMLElement>e.currentTarget;
    const curIdx = $artScrollIdx;
    const tarIdx:number = parseInt(target.id.substring(0, target.id.indexOf('-')));
    interceptScrollFromIdx(curIdx < tarIdx, tarIdx);
  }

  function processEntries([key, entr]:[string, Art], i:number) { 
    pieces.push({
      "key": key,
      "data": entr,
      "isLast": i+1 == art.size
    });
    jumpNames.set(i+1, entr.name);

    if (entr.image) {
      const img = new Image();
      img.onload = () => {
          imgsMap.set(i+1, img);
      }
      img.src = entr.image;
    }

    return entr; 
  }

  function manageScroll(e: WheelEvent) {
    if ($orientation == 0) {
      if ($allowScroll) {
        $allowScroll = false;
        setTimeout(() => $allowScroll = true, 300);
        interceptScroll(e);
      }
    }
  }

  $afterPageLoad(() => {
    if ($artScrollIdx != 0) {
      $artScrollIdx -= 1;
      if ($orientation == 0) interceptScrollFromIdx(false, $artScrollIdx+1);
    }
    return true;
  });

  onMount(() => {
    Array.from(art).sort((a, b) => a[1].index - b[1].index).map(processEntries);
    pieces = [...pieces];
  });
</script>

<svelte:window on:wheel|stopPropagation="{manageScroll}" />

<div id="art">
  <div class="content{$orientation == 0 ? ' fancy' : ' card'}" in:fade>
    <MediaQuery query="{orientationQuery}" let:matches>
      {#if matches && $orientation == 0}
        {#key $artScrollIdx}
          <ArtEntry entryData={pieces[$artScrollIdx].data} image={imgsMap.get($artScrollIdx)} isLast={pieces[$artScrollIdx].isLast}/>
        {/key}
      {:else}
        {#each pieces as artEntr}
          <ArtCardEntry entryData={artEntr.data}/>
        {/each }
      {/if}
    </MediaQuery>
  </div>
  <MediaQuery query="{orientationQuery}" let:matches>
    {#if matches}
      <JumpList len={art.size+1} tooltips={jumpNames} handler={jumpToHandler} scrollIdx={$artScrollIdx}/>
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