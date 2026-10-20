<script lang="ts">
  import type { Snippet } from "svelte";

  type Props = {
    onClick: () => void;
    children: Snippet;
  };

  let { onClick, children }: Props = $props();
</script>

<div class="social-button-container">
  <button type="button" onclick={onClick} class="social-button">
    {@render children()}
  </button>
</div>

<style>
  .social-button-container {
    margin: 4px;
  }
  .social-button {
    width: 40px;
    height: 40px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    text-decoration: none;

    /* reset default button styling */
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    color: inherit;
    cursor: pointer;
  }
  :global(.social-button svg) {
    fill: var(--highlight);
    font-size: 40px;

    transition: fill 0.15s ease-in-out;
  }
  .social-button:hover {
    cursor: pointer;
  }
  :global(.social-button:hover svg) {
    fill: var(--highlight-hover);
  }
</style>
