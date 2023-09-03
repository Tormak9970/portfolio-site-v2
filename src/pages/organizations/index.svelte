<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { organizations } from "../../linkConfig";
  import { organizationScrollIdx, orientation } from "../../Stores";
  import { afterPageLoad } from "@roxi/routify";
  import { interceptScrollFromIdx, jumpToHandler, manageScroll, orientationQuery, processEntries, sortEntriesBasedOnIndex } from "../../utils";
  import MediaQuery from "../../components/utils/MediaQuery.svelte";
  import JumpList from "../../components/utils/JumpList.svelte";
  import OrganizationEntry from "../../components/entries/OrganizationEntry.svelte";
  import CardEntry from "../../components/CardEntry.svelte";

  type OrganizationListEntry = {
    key:string,
    data:Organization,
    isLast:boolean
  }

  let entries: OrganizationListEntry[] = [];
  const jumpNames: Map<number, string> = new Map();
  const imageMap: Map<number, HTMLImageElement> = new Map();

  $afterPageLoad(() => {
    if ($organizationScrollIdx != 0) {
      $organizationScrollIdx -= 1;
      if ($orientation === 0) interceptScrollFromIdx(false, $organizationScrollIdx+1, organizationScrollIdx);
    }
    return true;
  });

  onMount(() => {
    Array.from(organizations).sort(sortEntriesBasedOnIndex).map(processEntries(entries, organizations, jumpNames, 0, imageMap));
    entries = [...entries];
  });
</script>

<svelte:window on:wheel|stopPropagationon|preventDefault="{manageScroll(entries, organizationScrollIdx)}" />

<div id="orgs">
  <div class="content{$orientation === 0 ? ' fancy' : ' card'}" in:fade>
      <MediaQuery query="{orientationQuery}" let:matches>
        {#if matches && $orientation === 0}
          {#key $organizationScrollIdx}
            <OrganizationEntry entryData={entries[$organizationScrollIdx].data} image={imageMap.get($organizationScrollIdx)} isLast={entries[$organizationScrollIdx].isLast}/>
          {/key}
        {:else}
          {#each entries as orgEntr}
            <CardEntry entryData={orgEntr.data}/>
          {/each }
        {/if}
      </MediaQuery>
  </div>
    
  <MediaQuery query="{orientationQuery}" let:matches>
    {#if matches}
      <JumpList len={organizations.size} tooltips={jumpNames} handler={jumpToHandler(organizationScrollIdx)} scrollIdx={$organizationScrollIdx}/>
    {/if}
  </MediaQuery>
</div>

<style>
  #orgs {
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