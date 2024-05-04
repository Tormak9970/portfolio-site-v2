<script lang="ts">
	import { goto } from "@roxi/routify";
  
  import DesktopNavLink from "./DesktopNavLink.svelte";
</script>

<div class="header">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="home-container" on:click={() => { $goto("./index"); }} >
    <img src="/images/logo.svg" alt="logo" height="30" width="30" />
  </div>
  <div class="navigation">
    <DesktopNavLink label="Home" route="./index" />
    <DesktopNavLink label="About" route="./about" />
    <DesktopNavLink label="Experience" route="./experience" />
    <DesktopNavLink label="Projects" route="./projects" />
  </div>
</div>

<style>
  .header {
		width: 100%;
		height: 50px;
    border-bottom: 1px solid var(--border);
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	.home-container {
		height: 100%;
		width: 50px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}
	.navigation {
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
</style>