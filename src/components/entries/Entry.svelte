<script lang="ts">
  import { fly } from "svelte/transition";

  import { scrollDir, allowScroll } from "../../Stores";
  import { getTransitions } from "../../utils";

  export let isLast:boolean;
  export let useContentContainer = true;

  $: transition = getTransitions($scrollDir);

  function handleTransEnd(): void { $allowScroll = true; }
</script>

<div class="entry" in:fly|local={transition.in} out:fly|local={transition.out} on:introend="{handleTransEnd}">
  {#if useContentContainer}
    <div class="content-container">
      <slot />
    </div>
  {:else}
    <slot />
  {/if}
  <div class="message">{isLast ? "" : "Scroll to continue..."}</div>
</div>

<style>
  .entry {
    width: 64%;

    position: absolute;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  
  .content-container {
    width: 100%;
    height: calc(100% - 87px);
    display: grid;
    grid-template-columns: minmax(600px, 3fr) minmax(400px, 2fr);
    column-gap: 14px;
    justify-items: center;
    align-items: center;
  }
  
  .message {
    margin-top: 56px;
    font-size: 24px;
  }
</style>