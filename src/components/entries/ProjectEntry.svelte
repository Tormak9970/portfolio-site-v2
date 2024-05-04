<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from '@roxi/routify';
  import { getIdFromName } from "../../Utils";

  export let entry:Project;

  let contentCont:HTMLDivElement;

  function openProjectEntry() {
    $goto(`./:id`, { id: getIdFromName(entry.name) });
  }

  onMount(() => {
    const img = new Image();
    img.onload = () => {
      contentCont.appendChild(img);
    }
    img.alt = entry.name;
    img.style.maxHeight = "min(100%, 400px)";
    img.style.maxWidth = "min(100%, 652px)";
    img.src = entry.image;
  });
</script>

<div class="entry">
  <div class="image-container" bind:this={contentCont} />
  <div class="details-container">
    <div class="header-container">
      <h2 class="header">{entry.name}</h2>
      <div class="proj-link-cont">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="proj-link" on:click|stopPropagation="{openProjectEntry}">
          Read More
        </div>
      </div>
    </div>
    <p class="description">
      {@html entry.description}
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

  :global(.entry .image-container img) {
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