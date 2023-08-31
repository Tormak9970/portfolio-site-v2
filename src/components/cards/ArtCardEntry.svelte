<script lang="ts">
  import { imageModalData, showing } from "../../Stores";
  export let entryData:Art;

  function showImageModal() {
    $imageModalData = {
      "id": "artPreviewModal",
      "data": {
        "image": entryData.image,
        "name": entryData.name
      }
    };
    setTimeout(() => { $showing = true; }, 30);
  }
</script>

<div class="card-entr">
  <div class="name-cont">
    {entryData.name}
  </div>
  <div class="img-cont">
    <img src="{entryData.image}" alt="" on:click|stopPropagation="{showImageModal}">
  </div>
  <div class="desc-cont">
    {@html entryData.description}
  </div>
</div>

<style>
  @import "/theme.css";

  .card-entr {
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
</style>