<script lang="ts">
	export let onClick: () => void;
</script>

<div class="social-button-container">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div on:click="{onClick}" class="social-button">
    <slot />
  </div>
</div>

<style>
  .social-button-container { margin: 4px; }
  .social-button {
    width: 40px;
    height: 40px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    text-decoration: none;
  }
  :global(.social-button svg) {
    fill: var(--highlight);
    font-size: 40px;

    transition: fill 0.15s ease-in-out;
  }
  .social-button:hover { cursor: pointer; }
  :global(.social-button:hover svg) { fill: var(--highlight-hover);  }
</style>