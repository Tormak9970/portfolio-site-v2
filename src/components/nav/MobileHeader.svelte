<script lang="ts">
  export let mobileNavOpen: boolean
</script>

<div class="mobile-header">
  <div class="home-container">
    <img src="/images/logo.svg" alt="logo" height="30" width="30" />
    <div class="nav-toggle" class:change={mobileNavOpen} on:click|stopPropagation={() => mobileNavOpen = !mobileNavOpen} >
      <div class="bar1" />
      <div class="bar2" style="transition: none;" />
      <div class="bar3" />
    </div>
  </div>
</div>

<style>
	.mobile-header {
		width: 100%;
    border-bottom: 1px solid var(--srcery-xgray2);
		display: flex;
		flex-direction: column;
	}
	.mobile-header .home-container {
		height: 50px;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		cursor: pointer;
	}
	.mobile-header .home-container .nav-toggle {
		margin-right: 7px;
		display: inline-block;
		cursor: pointer;
	}
	.mobile-header .home-container .nav-toggle .bar1,
	.mobile-header .home-container .nav-toggle .bar2,
	.mobile-header .home-container .nav-toggle .bar3 {
		width: 35px;
		height: 5px;
		background-color: var(--font-color);
		margin: 6px 0;
		transition: 0.4s;
		border-radius: 4px;
	}
	.mobile-header .home-container .change .bar1 {
		-webkit-transform: rotate(-45deg) translate(-9px, 6px);
		transform: rotate(-45deg) translate(-9px, 6px);
		border-radius: 4px;
	}
	.mobile-header .home-container .change .bar2 {
		opacity: 0;
    visibility: hidden;
	}
	.mobile-header .home-container .change .bar3 {
		-webkit-transform: rotate(45deg) translate(-9px, -7px);
		transform: rotate(45deg) translate(-9px, -7px);
		border-radius: 4px;
	}
	.mobile-header .home-container img {
		margin-left: 7px;
	}
</style>