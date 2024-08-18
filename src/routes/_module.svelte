<script lang="ts">
	import MediaQuery from "../components/utils/MediaQuery.svelte";
  import DesktopNav from "../components/nav/DesktopNav.svelte";
  import MobileNav from "../components/nav/MobileNav.svelte";
  import MobileHeader from "../components/nav/MobileHeader.svelte";

  let mobileNavOpen = false;
</script>

<div class="layout">
	<MediaQuery query="(orientation:landscape)" let:matches>
    {#if matches}
      <DesktopNav />
    {:else}
      <MobileHeader bind:mobileNavOpen={mobileNavOpen} />
    {/if}
  </MediaQuery>
  <div class="content-wrapper" class:menu-hidden={!mobileNavOpen}>
    <div class="grad-left" />
    <div class="grad-right" />
    <div class="content-body">
      <slot />
    </div>
    <MediaQuery query="(orientation:landscape)" let:matches>
      {#if !matches}
        <MobileNav showing={mobileNavOpen} />
      {/if}
    </MediaQuery>
  </div>
	<div class="rights">© Travis Lane {new Date().getFullYear()}</div>
</div>

<style>
	.layout {
		width: 100vw;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		overflow: hidden;
    
    background-color: var(--background);
    background:
      linear-gradient(-90deg, var(--background) 1px, transparent 1px),
      linear-gradient(var(--background) 1px, transparent 1px),
      linear-gradient(-90deg, var(--background) 1px, transparent 1px),
      linear-gradient(var(--background) 1px, transparent 1px),
      linear-gradient(transparent 6px, transparent 6px, transparent 156px, transparent 156px),
      linear-gradient(-90deg,var(--background) 1px, transparent 1px),
      linear-gradient(-90deg, transparent 6px, transparent 6px, transparent 156px, transparent 156px),
      linear-gradient(var(--background) 1px, transparent 1px),
      transparent;
	}

	.content-wrapper {
    position: relative;
		z-index: 2;
		overflow: hidden;
		height: calc(100% - 50px);
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: flex-start;
	}

  .grad-left {
    position: absolute;
    z-index: 1;
    top: 0%;
    left: -50%;
    width: 150vh;
    height: 150vh;
    opacity: .3;
    background: radial-gradient(circle, var(--highlight-alt) 0%, transparent 70%);
    animation: 14s intro;
    pointer-events: none;
  }

  .grad-right {
    position: absolute;
    z-index: 1;
    top: -50%;
    left: 50%;
    width: 150vh;
    height: 150vh;
    opacity: .3;
    background: radial-gradient(circle, var(--highlight) 0%, transparent 70%);
    animation: 6s intro;
    pointer-events: none;
  }

	.content-wrapper .content-body {
		position: relative;
		height: 100%;
		width: 100vw;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		overflow: hidden;

    z-index: 2;
	}
  
	.rights {
		position: absolute;
		right: 7px;
		bottom: 7px;
		font-size: 10px;
		opacity: 0.4;

		z-index: 1000;
	}

  @keyframes intro {
    0% {
      scale: 1.4;
      opacity: 0;
    }
    80% {
      scale: .9;
    }
  }
</style>
