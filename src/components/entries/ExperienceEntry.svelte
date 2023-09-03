<script lang="ts">
  import Entry from "./Entry.svelte";

  export let entryData: Experience;
  export let isLast: boolean;
</script>

<Entry isLast={isLast} useContentContainer={false}>
  <div class="experience-header">
    <h2>{entryData.position}</h2>
  </div>
  <div class="content-container">
    <div class="img-cont">
      <img src={entryData.image} alt={entryData.position} />
    </div>
    <div>
      <div class="description">
        <div>Company: {entryData.company}</div>
      </div>
      <div class="description">
        <p>{entryData.description}</p>
      </div>
    </div>
  </div>
</Entry>

<style>
  .experience-header {
    font-size: 27px;
  }

  .description {
    width: 100%;
    margin-top: 14px;
    font-size: 24px;
    text-align: center;
  }

  .content-container {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, minmax(400px, 1fr));
    column-gap: 14px;
  }

  .img-cont {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .img-cont > img {
    max-width: 100%;
    height: auto;
    margin-top: 14px;
  }
</style>
