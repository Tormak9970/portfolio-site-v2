<script lang="ts">
	import { isActive, url } from "@roxi/routify";
  
  export let label: string;
  export let route: string;
</script>

<div id="1" class="nav-link" class:rendered={$isActive(route)}>
  <a href={$url(route)} class="nav-btn">{label}</a>
</div>

<style>
	.nav-link {
		height: 40px;
		width: 150px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
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