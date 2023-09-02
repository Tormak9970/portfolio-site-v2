<script lang="ts">
	import { isActive, url } from "@roxi/routify";
  
  export let label: string;
  export let route: string;

  let isHovered = false;
</script>

<div class="nav-link" on:mouseenter={() => isHovered = true} on:mouseleave={() => isHovered = false}>
  <a href={$url(route)} class="nav-btn">{label}</a>
  <div class="interaction-indicator" class:rendered={$isActive(route)} class:hovered={isHovered}/>
</div>

<style>
  .nav-link {
		height: 100%;
		padding: 0px 9px;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}
	.nav-btn {
		color: var(--font-color);
		text-decoration: none;
		margin-top: 14px;
	}
	.nav-btn:focus {
		color: var(--font-color);
	}
	.interaction-indicator {
		width: 0px;
		height: 3px;
		background-color: var(--highlight);
		border-radius: 8px;
		transition: width 0.3s ease-in-out;
	}
	.rendered {
		width: 100%;
		background-color: var(--font-color);
	}
	.hovered {
		width: 100%;
	}
	.nav-link:hover {
		cursor: pointer;
	}
</style>