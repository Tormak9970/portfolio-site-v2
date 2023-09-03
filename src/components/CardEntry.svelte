<script lang="ts">
  import { goto } from '@roxi/routify';
  import { getKeyFromName } from "../utils";
  import { imageModalData, showImagePreviewModal } from "../Stores";

  export let entryData:Project | Organization | Art | Experience;

  function openOrganiationEntry() {
    $goto(`./:organization`, { organization: getKeyFromName((entryData as Organization).name) });
  }

  function openProjectEntry() {
    $goto(`./:project`, { project: getKeyFromName((entryData as Project).name) });
  }

  function isExperience(entry: Project | Organization | Art | Experience): entry is Experience {
    return (entry as Experience).position !== undefined;
  }
  function isProject(entry: Project | Organization | Art | Experience): entry is Project {
    return (entry as Project).category !== undefined;
  }
  function isOrganization(entry: Project | Organization | Art | Experience): entry is Organization {
    return (entry as Organization).projects !== undefined;
  }

  function showImageModal() {
    $imageModalData = {
      "id": "artPreviewModal",
      "data": {
        "image": entryData.image,
        "name": (entryData as Art).name
      }
    };
    setTimeout(() => { $showImagePreviewModal = true; }, 30);
  }
</script>

<div class="card-entry">
  <div class="name-cont">
    {isExperience(entryData) ? entryData.position : entryData.name}
  </div>
  <div class="img-cont">
    {#if isProject(entryData) || isOrganization(entryData) || isExperience(entryData)}
      <img src="{entryData.image}" alt="">
    {:else}
      <img src="{entryData.image}" alt="" on:click|stopPropagation="{showImageModal}">
    {/if}
  </div>
  {#if isExperience(entryData)}
    <div class="desc-cont">Company: {entryData.company}</div>
  {/if}
  <div class="desc-cont">
    {@html entryData.description}
  </div>
  {#if isProject(entryData)}
    <div class="link-cont">
      <div class="name">Learn more:</div>
      <div class="proj-link" on:click|stopPropagation="{openProjectEntry}">
        <i class="fas fa-external-link-alt"></i>
      </div>
    </div>
  {:else if isOrganization(entryData)}
    <div class="link-cont">
      <div class="name">Learn more:</div>
      <div class="proj-link" on:click|stopPropagation="{openOrganiationEntry}">
        <i class="fas fa-external-link-alt"></i>
      </div>
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

  .link-cont {
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    margin-bottom: 5px;
  }
  .link-cont > .name {
    height: 100%;
    
    margin-right: 7px;
    font-size: 20px;
  }

  .link-cont > .proj-link {
    padding-top: 3px;

    display: flex;
    flex-direction: row;
    align-items: center;

    color: var(--highlight);

    cursor: pointer;
    font-size: 14px;
  }
  .link-cont:hover {
    color: var(--highlight-hover);
  }
</style>