<script lang="ts">
	import { goto, isActive, url } from "@roxi/routify";
  
  export let label: string;
  export let route: string;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div id="1"class="nav-link" on:click={$goto(route)} class:rendered={$isActive(route)}>
  <div class="nav-btn">{label}</div>
</div>

<style>
	.nav-link {
		height: 40px;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

    border-radius: 10px;
	}
	.nav-link .nav-btn {
		color: var(--foreground-light-text);
		text-decoration: none;
		margin: 7px 0px;
	}
	.nav-link .nav-btn:focus {
		color: var(--foreground-light-text);
	}
	.rendered {
		background-color: var(--foreground-light-hover);
	}
	.nav-link:hover {
		cursor: pointer;
	}
</style>