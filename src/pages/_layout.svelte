<script lang="ts">
	import MediaQuery from "../components/utils/MediaQuery.svelte";

	import { loadConfig } from "../loadConfig";
  import DesktopNav from "../components/nav/DesktopNav.svelte";
  import MobileNav from "../components/nav/MobileNav.svelte";
  import MobileHeader from "../components/nav/MobileHeader.svelte";

  let mobileNavOpen = false;
</script>

<div class="layout">
	{#await loadConfig()}
		<!-- <LoadingSpinner /> -->
	{:then _}
		<MediaQuery query="(orientation:landscape)" let:matches>
			{#if matches}
				<DesktopNav />
			{:else}
				<MobileHeader bind:mobileNavOpen={mobileNavOpen} />
			{/if}
		</MediaQuery>
		<div class="content-wrapper" class:menu-hidden={!mobileNavOpen}>
			<div class="content-body">
				<slot />
			</div>
			<MediaQuery query="(orientation:landscape)" let:matches>
				{#if !matches}
					<MobileNav showing={mobileNavOpen} />
				{/if}
			</MediaQuery>
		</div>
	{/await}
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
	}

	.content-wrapper {
		z-index: 2;
		overflow-x: hidden;
		height: calc(100% - 50px);
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: flex-start;
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
	}
  
	.rights {
		position: absolute;
		right: 7px;
		bottom: 7px;
		font-size: 10px;
		opacity: 0.4;

		z-index: 1000;
	}
</style>
