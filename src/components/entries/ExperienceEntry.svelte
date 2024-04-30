<script lang="ts">
  export let entryData: Experience;
</script>

<div class="entry">
  <h2 class="experience-header">{entryData.position} at {entryData.company}</h2>
  <div class="description">
    <p>{entryData.description}</p>
  </div>
</div>

<style>
  .entry {
    width: 80%;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    margin-bottom: 20px;
    margin-top: 30px;
  }

  .experience-header {
    font-size: 24px;
    margin: 0px;
    padding: 0;

    text-align: center;
  }

  .description {
    width: 100%;
    max-width: 600px;
    margin-top: 0px;
    font-size: 18px;
    text-align: center;
  }

  .description p {
    margin-top: 10px;
  }
</style>
