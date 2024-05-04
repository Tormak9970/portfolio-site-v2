<script lang="ts">
	import { goto } from '@roxi/routify';

  export let url: string;

  function goBack() {
    $goto(url);
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="back-button" on:click={goBack}>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20px" height="20px">
    <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
    <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
  </svg>
</div>

<style>
  .back-button {
    position: absolute;
    left: 0;
    top: calc(50% - 13px);

    border: 1px solid var(--border);

    border-radius: 4px;

    height: 20px;
    padding: 5px;

    cursor: pointer;
    
    transition: border-color 0.15s ease-in-out;
  }

  .back-button:hover {
    border-color: var(--border-hover);
  }

  svg {
    fill: var(--foreground);
    transition: fill 0.15s ease-in-out;
  }

  .back-button:hover svg {
    fill: var(--foreground-hover);
  }
</style>