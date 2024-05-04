<script lang="ts">
  import { goto } from "@roxi/routify";

  export let label: string;
  export let url: string;
  export let isRelative = false;
  export let urlParams: any;

  function openLink() {
    if (isRelative) {
      $goto(url, urlParams);
    } else {
      window.open(url, '_blank', 'noopener noreferrer');
    }
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="link-container" on:click={openLink}>
  {label}
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="14px" height="14px">
    <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
    <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/>
  </svg>
</div>

<style>
  .link-container {
    margin-top: 10px;
    width: 100%;
    display: flex;
    align-items: center;
    transition: text-decoration 0.15s ease-in-out;
  }
  .link-container svg {
    margin-left: 5px;
    margin-top: 2px;
    fill: var(--highlight);
    transition: fill 0.15s ease-in-out, transform 0.15s ease-out;
  }

  .link-container:hover {
    text-decoration: underline;
    cursor: pointer;
  }
  .link-container:hover svg {
    transform: translate(3px);
  }
</style>