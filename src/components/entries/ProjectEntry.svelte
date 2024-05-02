<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from '@roxi/routify';
  import { getKeyFromName } from "../../Utils";

  export let entryData:Project;
  export let image:HTMLImageElement;

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

<div class="entry">
  <div class="image-container" bind:this={contentCont}>
    {#if !image}
      <img src="{entryData.image}" alt="{entryData.name}">
    {/if}
  </div>
  <div class="details-container">
    <div class="header-container">
      <h2 class="header">{entryData.name}</h2>
      <div class="proj-link-cont">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="proj-link" on:click|stopPropagation="{openProjectEntry}">
          Read More
        </div>
      </div>
    </div>
    <p class="description">
      {@html entryData.description}
    </p>
  </div>
</div>

<style>
  .entry {
    width: 80%;
    max-width: 900px;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    background-color: var(--foreground);

    margin-top: 30px;

    border-radius: 4px;
  }

  img {
    max-width: 300px;
    max-height: 200px;
    height: auto;

    padding: 7px;
    border-radius: 4px;

    margin: 0px 7px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .header-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .header {
    font-size: 24px;
    margin: 0px;
    padding: 0;
  }

  .description {
    width: 100%;
    max-width: 600px;
    margin-top: 0px;
    font-size: 18px;
  }

  .proj-link-cont {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .proj-link {
    margin-top: auto;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    margin-bottom: 5px;

    padding: 3px 6px;
    border-radius: 4px;

    background-color: var(--highlight);
    
    cursor: pointer;
  }

  .proj-link:hover, .proj-link:focus {
    background-color: var(--highlight-hover);
  }
</style>