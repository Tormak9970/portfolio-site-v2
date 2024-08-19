<script lang="ts">
  import { goto } from "@roxi/routify";

  export let label: string;
  export let url: string;
  export let isRelative = false;
  export let useIcon = true;

  function openLink() {
    if (isRelative) {
      $goto(url);
    } else {
      window.open(url, '_blank', 'noopener noreferrer');
    }
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="link-container" on:click={openLink}>
  {label}
 {#if useIcon}
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 269 269" width="11px" height="11px">
    <path d="M108.688 0C94.4162 0 82.8859 12.0181 82.8859 26.8937C82.8859 41.7693 94.4162 53.7874 108.688 53.7874H175.37L13.0592 223.05C2.98027 233.555 2.98027 250.616 13.0592 261.121C23.1381 271.626 39.5063 271.626 49.5852 261.121L211.896 91.8588V161.362C211.896 176.238 223.426 188.256 237.698 188.256C251.97 188.256 263.5 176.238 263.5 161.362V26.8937C263.5 12.0181 251.97 0 237.698 0"/>
  </svg>
 {/if}
</div>

<style>
  .link-container {
    width: 100%;
    display: flex;
    align-items: center;
    transition: text-decoration 0.15s ease-in-out;
  }
  .link-container svg {
    margin-left: 5px;
    margin-top: 2px;
    fill: var(--link-color);
    transition: fill 0.15s ease-in-out, transform 0.15s ease-out;
  }

  .link-container:hover {
    text-decoration: underline;
    cursor: pointer;
  }
  .link-container:hover svg {
    transform: translate(3px, -3px);
  }
</style>