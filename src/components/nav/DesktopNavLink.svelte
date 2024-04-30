<script lang="ts">
	import { isActive, url } from "@roxi/routify";
  
  export let label: string;
  export let route: string;

  let isHovered = false;
</script>

<a class="nav-link" href={$url(route)} on:mouseenter={() => isHovered = true} on:mouseleave={() => isHovered = false}>
  <div class="nav-btn">{label}</div>
  <div class="interaction-indicator" class:rendered={$isActive(route)} class:hovered={isHovered}/>
</a>

<style>
  .nav-link {
		height: 100%;
		padding: 0px 9px;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		text-decoration: none;
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