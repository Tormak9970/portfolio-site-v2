<script lang="ts">
  import { goto, isActive } from '@roxi/routify';
  import { getKeyFromName } from "../utils";
  import { imageModalData, orientation, showImagePreviewModal } from "../Stores";

  export let entryData:Project | Experience;

  function openProjectEntry() {
    $goto(`./:project`, { project: getKeyFromName((entryData as Project).name) });
  }

  function isExperience(entry: Project | Experience): entry is Experience {
    return (entry as Experience).position !== undefined;
  }
  function isProject(entry: Project | Experience): entry is Project {
    return (entry as Project).content !== undefined;
  }
</script>

<div class="card-entry" class:uniform-height={$orientation === 1 || $isActive("/archive")}>
  <div class="name-cont">
    {isExperience(entryData) ? entryData.position : entryData.name}
  </div>
  <div class="img-cont">
    <img src="{entryData.image}" alt="">
  </div>
  {#if isExperience(entryData)}
    <div class="desc-cont">Company: {entryData.company}</div>
  {/if}
  <div class="desc-cont">
    {@html entryData.description}
  </div>
  {#if isProject(entryData)}
    <div class="proj-link" on:click|stopPropagation="{openProjectEntry}">
      Read More
    </div>
  {/if}
</div>

<style>
  .card-entry {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    width: 90%;
    max-width: 330px;
    height: fit-content;

    background-color: var(--foreground);
    border-radius: 4px;

    margin: 14px;
  }

  .uniform-height {
    height: 100%;
  }

  .name-cont {
    width: 90%;

    text-align: center;

    font-size: 20px;

    margin-bottom: 7px;
  }

  .img-cont {
    width: 90%;
    margin-bottom: 7px;
  }

  .img-cont > img { width: 100%; }
  
  .desc-cont {
    width: 90%;

    text-align: center;

    font-size: 16px;

    margin-bottom: 5px;
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