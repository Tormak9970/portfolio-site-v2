<script lang="ts">
  export let url: string;

	function navigateToUrl(url:string) {
    window.open(url, '_blank', 'noopener noreferrer');
  }
</script>

<div class="social-button-container">
  <div on:click="{() => { navigateToUrl(url); }}" class="social-button">
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

    transition: fill 0.3s ease-in-out;
  }
  .social-button:hover { cursor: pointer; }
  :global(.social-button:hover svg) { fill: var(--highlight-hover);  }
</style>