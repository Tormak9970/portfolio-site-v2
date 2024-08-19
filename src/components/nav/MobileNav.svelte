<script lang="ts">
  import SideSheet from "../utils/SideSheet.svelte";
  import MobileNavLink from "./MobileNavLink.svelte";

  export let mobileNavOpen: boolean;
</script>

<SideSheet on:close={() => mobileNavOpen = false}>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="nav-container" on:click={() => mobileNavOpen = false}>
    <MobileNavLink label="Home" route="./index" />
    <MobileNavLink label="About" route="./about" />
    <MobileNavLink label="Experience" route="./experience" />
    <MobileNavLink label="Projects" route="./projects" />
  </div>
</SideSheet>

<style>
  .nav-container {
		width: 100%;
	}
</style>