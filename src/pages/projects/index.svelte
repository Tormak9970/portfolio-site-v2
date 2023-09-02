<script lang="ts" context="module">
  // svelte-ignore unused-export-let
  export let jumpTo = (_id:string) => {}
</script>
<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { projects } from "../../linkConfig";
  import { projScrollIdx, orientation, scrollDir, allowScroll } from "../../Stores";
  import { afterPageLoad } from "@roxi/routify";
  import { orientationQuery } from "../../utils";
  import MediaQuery from "../../components/utils/MediaQuery.svelte";
  import ProjectEntry from "../../components/entries/ProjectEntry.svelte";
  import JumpList from "../../components/utils/JumpList.svelte";
  import CardEntry from "../../components/CardEntry.svelte";

  interface ProjectListEntry {
    key:string,
    data:Project,
    isLast:boolean
  }

  let entries: ProjectListEntry[] = [];
  const jumpNames: Map<number, string> = new Map();
  const imgsMap: Map<number, HTMLImageElement> = new Map();

  function interceptScroll(e: WheelEvent) {
    const direction:boolean = e.deltaY > 0; // true = down, false = up
    
    if (!($projScrollIdx == 0 && !direction) && !($projScrollIdx == entries.length-1 && direction) && Math.abs(e.deltaY) != 0) {
      if (direction) {
        $projScrollIdx++;
      } else {
        $projScrollIdx--;
      }
      $scrollDir = direction;
    } else {
      $allowScroll = true;
    }
  }
  function interceptScrollFromIdx(direction:boolean, tarIdx:number) {
    $projScrollIdx = tarIdx;
    $scrollDir = direction;
  }
  function jumpToHandler(e: MouseEvent) {
    const target:HTMLElement = <HTMLElement>e.currentTarget;
    const curIdx = $projScrollIdx;
    const tarIdx:number = parseInt(target.id.substring(0, target.id.indexOf('-')));
    interceptScrollFromIdx(curIdx < tarIdx, tarIdx);
  }

  jumpTo = (id:string) => {
    const project:Project = projects.get(id);
    if (project) {
      const curIdx = entries.findIndex((val:ProjectListEntry) => { return val.key == id; });
      const curHIdx = $projScrollIdx;
      
      $projScrollIdx = curIdx < curHIdx ? curIdx-1 : curIdx+1;
      $projScrollIdx--;
      $scrollDir = false;
    } else {
      throw Error(`Expected key ${id} to be in map but was not.`);
    }
  }

  function processEntries([key, entr]:[string, Project], i:number) { 
    entries.push({
      "key": key,
      "data": entr,
      "isLast": i+1 == projects.size
    });
    jumpNames.set(i, entr.name);

    if (entr.image) {
      const img = new Image();
      img.onload = () => {
        imgsMap.set(i, img);
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
    if ($projScrollIdx != 0) {
      $projScrollIdx -= 1;
      if ($orientation == 0) interceptScrollFromIdx(false, $projScrollIdx+1);
    }
    return true;
  });
  onMount(() => {
    Array.from(projects).sort((a, b) => a[1].index - b[1].index).map(processEntries);
    entries = [...entries];
  });
</script>
<svelte:window on:wheel|stopPropagation|preventDefault="{manageScroll}" />

<div id="projects">
  <div class="content{$orientation == 0 ? ' fancy' : ' card'}" in:fade>
    <MediaQuery query="{orientationQuery}" let:matches>
      {#if matches && $orientation == 0}
        {#key $projScrollIdx}
          <ProjectEntry entryData={entries[$projScrollIdx].data} image={imgsMap.get($projScrollIdx)} isLast={entries[$projScrollIdx].isLast}/>
        {/key}
      {:else}
        {#each entries as projEntr}
          <CardEntry entryData={projEntr.data}/>
        {/each }
      {/if}
    </MediaQuery>
  </div>
  <MediaQuery query="{orientationQuery}" let:matches>
    {#if matches}
      <JumpList len={projects.size} tooltips={jumpNames} handler={jumpToHandler} scrollIdx={$projScrollIdx}/>
    {/if}
  </MediaQuery>
</div>

<style>
	#projects {
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