<script lang="ts">
  import { onMount } from "svelte";

  import { imageModalData, showImagePreviewModal } from "../../Stores";
  import Entry from "./Entry.svelte";

  export let entryData: Art;
  export let image: HTMLImageElement;
  export let isLast: boolean;

  let contentCont: HTMLDivElement;

  function showModal() {
    $imageModalData = { image: entryData.image, name: entryData.name };
    $showImagePreviewModal = true;
  }

  onMount(() => {
    if (image) {
      image.alt = entryData.name;
      image.onclick = showModal;
      contentCont.insertBefore(image, contentCont.children[0]);
    }
  });
</script>

<Entry isLast={isLast} useContentContainer={false}>
  <div class="art-header">
    <h2>{entryData.name}</h2>
  </div>
  {#if entryData.image}
    <div class="content-container" bind:this={contentCont}>
      {#if !image}
        <img src={entryData.image} alt={entryData.name} on:click={showModal} />
      {/if}
      <div class="description">
        <p>{entryData.description}</p>
      </div>
    </div>
  {:else}
    <div class="description">
      <p>{entryData.description}</p>
    </div>
  {/if}
</Entry>

<style>
  .art-header {
    font-size: 27px;
  }

  .content-container {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, minmax(400px, 1fr));
    column-gap: 14px;
  }

  .content-container :global(img) {
    width: auto;
    max-width: 100%;
    height: auto;
    max-height: 100%;
    margin-top: 14px;
    border-radius: 5px;
    cursor: pointer;
  }

  .content-container :global(img:hover) {
    opacity: 0.7;
  }

  .description {
    width: 100%;
    margin-top: 14px;
    font-size: 24px;
    text-align: center;
  }
</style>
