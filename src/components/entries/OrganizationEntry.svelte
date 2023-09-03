<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "@roxi/routify";

  import { getKeyFromName } from "../../utils";
  import Entry from "./Entry.svelte";

  export let entryData: Organization;
  export let image: HTMLImageElement;
  export let isLast: boolean;

  let contentCont: HTMLDivElement;

  function openOrgEntry() {
    $goto(`./:organization`, { organization: getKeyFromName(entryData.name) });
  }

  onMount(() => {
    if (image) {
      image.alt = entryData.name;
      contentCont.insertBefore(image, contentCont.children[0]);
    }
  });
</script>

<Entry isLast={isLast}>
  <div class="imgs-cont" bind:this={contentCont}>
    {#if !image}
      <img src={entryData.image} alt={entryData.name} />
    {/if}
  </div>
  <div class="org-overview-cont">
    <div class="org-header">
      <h2 style="margin-top: 0px;">{entryData.name}</h2>
    </div>
    <p class="overview">
      {@html entryData.about}
    </p>
    <div class="org-link-cont">
      <div class="name">Learn more:</div>
      <div class="org-link" on:click|stopPropagation={openOrgEntry}>
        <i class="fas fa-external-link-alt" />
      </div>
    </div>
  </div>
</Entry>

<style>
  .org-header {
    font-size: 27px;
  }

  .imgs-cont {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .imgs-cont :global(img) {
    max-width: 400px;
    width: 100%;
    max-height: 70%;
    width: auto;
  }

  .org-overview-cont {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 100%;
  }

  .overview {
    width: 100%;
    margin-top: 14px;
    font-size: 20px;
    text-align: center;
  }

  .org-link-cont {
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

  .org-link {
    padding-top: 3px;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: var(--highlight);
    cursor: pointer;
    font-size: 14px;
  }
  .org-link:hover {
    color: var(--highlight-hover);
  }
</style>
