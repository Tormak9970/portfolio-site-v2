<script lang="ts">
  import { fly } from "svelte/transition";
  import MediaQuery from "../utils/MediaQuery.svelte";

  export let entry: Experience;

  function openCompanyLink() {
    window.open(entry.companyLink, '_blank', 'noopener noreferrer');
  }
</script>

<div class="entry" in:fly={{ delay: entry.index * 300, x: 200, duration: 1000 }}>
  <MediaQuery query="(min-width: 750px)" let:matches>
    {#if matches}
      <div class="time-container" style="margin-top: 15px;">
        {entry.duration}
      </div>
    {/if}
    <div class="info-container">
      <h2 class="experience-header">{entry.position}</h2>
      {#if !matches}
        <div class="time-container">
          {entry.duration}
        </div>
      {/if}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="company-link" on:click={openCompanyLink}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="14px" height="14px">
          <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
          <path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"/>
        </svg>
        <div class="company">{entry.company}</div>
      </div>
      <div class="description">{entry.description}</div>
    </div>
  </MediaQuery>
</div>

<style>
  .entry {
    width: 80%;
    max-width: 600px;

    display: flex;

    margin-bottom: 20px;
    margin-top: 30px;
  }

  .time-container {
    width: 150px;
    color: var(--highlight);
  }

  .info-container {
    display: flex;
    flex-direction: column;
  }

  .experience-header {
    font-size: 22px;
    margin: 0px;
    padding: 0;
  }

  .company-link {
    display: flex;
    align-items: center;
    transition: text-decoration 0.15s ease-in-out;
  }

  .company-link:hover {
    text-decoration: underline;
    cursor: pointer;
  }
  .company-link:hover svg {
    fill: var(--link-color_clicked);
  }

  .company {
    margin-left: 5px;
  }

  svg {
    margin-top: 2px;
    fill: var(--link-color);
    transition: fill 0.15s ease-in-out;
  }

  .description {
    width: 100%;
    max-width: 450px;
    
    margin-top: 10px;

    font-size: 18px;
  }
</style>
