<script lang="ts">
  export let mobileNavOpen: boolean;
</script>

<div class="mobile-header">
  <div class="home-container">
    <img src="/images/logo.svg" alt="logo" height="30" width="30" />
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="menu-toggle" class:change={mobileNavOpen} on:click|stopPropagation={() => mobileNavOpen = !mobileNavOpen} >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="26px" height="26px">
        <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
        <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/>
      </svg>
    </div>
  </div>
</div>

<style>
	.mobile-header {
		width: 100%;
    border-bottom: 1px solid var(--border);
		display: flex;
		flex-direction: column;
	}
	.home-container {
		height: 50px;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		cursor: pointer;
	}
	.menu-toggle {
		cursor: pointer;
    margin-right: 10px;
	}
  svg {
    fill: var(--font-color);
  }
	img {
		margin-left: 7px;
	}
</style>