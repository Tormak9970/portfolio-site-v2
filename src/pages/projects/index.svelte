<script lang="ts" context="module">
  // svelte-ignore unused-export-let
  export let jumpTo = (_id:string) => {}
</script>
<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { projects } from "../../linkConfig";
  import { projScrollIdx, orientation, scrollDir } from "../../Stores";
  import { afterPageLoad } from "@roxi/routify";
  import { interceptScrollFromIdx, jumpToHandler, manageScroll, orientationQuery, processEntries, sortEntriesBasedOnIndex } from "../../utils";
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
  const imageMap: Map<number, HTMLImageElement> = new Map();

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

  $afterPageLoad(() => {
    if ($projScrollIdx != 0) {
      $projScrollIdx -= 1;
      if ($orientation === 0) interceptScrollFromIdx(false, $projScrollIdx+1, projScrollIdx);
    }
    return true;
  });
  onMount(() => {
    Array.from(projects).sort(sortEntriesBasedOnIndex).map(processEntries(entries, projects, jumpNames, 0, imageMap));
    entries = [...entries];
  });
</script>
<svelte:window on:wheel|stopPropagation|preventDefault="{manageScroll(entries, projScrollIdx)}" />

<div id="projects">
  <div class="content{$orientation === 0 ? ' fancy' : ' card'}" in:fade>
    <MediaQuery query="{orientationQuery}" let:matches>
      {#if matches && $orientation === 0}
        {#key $projScrollIdx}
          <ProjectEntry entryData={entries[$projScrollIdx].data} image={imageMap.get($projScrollIdx)} isLast={entries[$projScrollIdx].isLast}/>
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
      <JumpList len={projects.size} tooltips={jumpNames} handler={jumpToHandler(projScrollIdx)} scrollIdx={$projScrollIdx}/>
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