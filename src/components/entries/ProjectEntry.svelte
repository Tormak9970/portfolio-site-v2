<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from '@roxi/routify';
  import { getKeyFromName } from "../../utils";
  import Entry from "./Entry.svelte";

  export let entryData:Project;
  export let image:HTMLImageElement;
  export let isLast:boolean;

  let contentCont:HTMLDivElement;

  function openProjectEntry() {
    $goto(`./:project`, { project: getKeyFromName(entryData.name) });
  }

  onMount(() => {
    if (image) {
      image.alt = entryData.name;
      image.style.maxHeight = "min(100%, 400px)";
      image.style.maxWidth = "min(100%, 652px)";
      contentCont.appendChild(image);
    }
  });
</script>

<Entry isLast={isLast}>
  <div class="imgs-cont" bind:this={contentCont}>
    {#if !image}
      <img src="{entryData.image}" alt="{entryData.name}" style="max-height: min(100%, 400px); max-width: min(100%, 652px);">
    {/if}
  </div>
  <div class="proj-overview-cont">
    <div class="proj-header">
      <h2>{entryData.name}</h2>
    </div>
    <p class="overview">
      {@html entryData.description}
    </p>
    <div class="proj-link-cont">
      <div class="name">Learn more:</div>
      <div class="proj-link" on:click|stopPropagation="{openProjectEntry}">
        <i class="fas fa-external-link-alt"></i>
      </div>
    </div>
  </div>
</Entry>

<style>
  .proj-header {
    font-size: 27px;
  }
  .imgs-cont {
    width: 100%;
    max-width: calc(666px - 14px);
    max-height: min(100%, 400px);

    padding: 7px;
    border-radius: 4px;

    background-color: var(--foreground);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .proj-overview-cont {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  .overview {
    width: 100%;
    margin-top: 14px;
    font-size: 20px;
    text-align: center;
  }
  .proj-link-cont {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .name {
    height: 100%;
    margin-right: 7px;
    font-size: 20px;
  }
  .proj-link {
    padding-top: 3px;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: var(--highlight);
    cursor: pointer;
    font-size: 14px;
  }
  .proj-link:hover {
    color: var(--highlight-hover);
  }
</style>