<script lang="ts">
  import { fly } from "svelte/transition";
  import { getIdFromName } from "../../lib/utils";

  import RightLink from "../utils/RightLink.svelte";

  export let entry:Project;
</script>

<div class="entry" in:fly|global={{ delay: entry.index * 200, x: 200, duration: 800 }}>
  <div class="image-container">
    <img src=".{entry.image}" alt={entry.name} />
  </div>
  <div class="details-container">
    <div class="header-container">
      <h2 class="header">{entry.name}</h2>
    </div>
    <RightLink label="View Writeup" url="/projects/:id" urlParams={{ id: getIdFromName(entry.name) }} isRelative />
    <p class="description">
      {@html entry.description}
    </p>
    <div class="tags-container">
      {#each entry.tech as tag}
        <div class="tag">{tag}</div>
      {/each}
    </div>
  </div>
</div>

<style>
  .entry {
    width: calc(90%);
    max-width: 800px;

    margin-top: 30px;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap-reverse;
    justify-content: center;
    align-items: flex-end;
    gap: 10px;
  }

  :global(.entry .image-container img) {
		width: 100%;
		height: auto;
		border-radius: 4px;
  }

  .image-container {
    width: calc(100% - 22px);
		max-width: 330px;

		padding: 10px;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border: 1px solid var(--border);

    border-radius: 4px;
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

  .details-container {
    width: 350px;
  }

  .description {
    width: 100%;
    max-width: 600px;
    margin-top: 5px;
    margin-bottom: 0px;
    font-size: 18px;
  }

  .tags-container {
    display: flex;
    flex-wrap: wrap;
  }

  .tag {
    border-radius: 4px;
    padding: 4px 6px;

    margin-right: 10px;
    margin-top: 10px;

    font-weight: 600;

    background-color: var(--highlight-alt);
    color: var(--highlight-alt-text);
  }
</style>