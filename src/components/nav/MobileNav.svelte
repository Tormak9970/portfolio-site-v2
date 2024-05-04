<script lang="ts">
  import MobileNavLink from "./MobileNavLink.svelte";

  export let showing: boolean;
</script>

<div class="navigation" class:menu-hidden={!showing}>
  <MobileNavLink label="Home" route="./index" />
  <MobileNavLink label="About" route="./about" />
  <MobileNavLink label="Experience" route="./experience" />
  <MobileNavLink label="Projects" route="./projects" />
</div>

<style>
  .navigation {
		z-index: 100;
		position: absolute;
		left: calc(100% - 150px);
		top: 50px;
		transition: left 0.4s;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		background-color: var(--foreground);
    border-left: 1px solid var(--srcery-xgray2);
	}

	.menu-hidden {
		left: 100%;
	}
</style>