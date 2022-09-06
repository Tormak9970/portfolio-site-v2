<script lang="ts">
	import { isActive, url, goto } from "@roxi/routify";

	import ImageModal from "./_utils/ImageModal.svelte";
	import MediaQuery from "./_utils/MediaQuery.svelte";
	import Socials from "./_utils/Socials.svelte";
	import LoadingSpinner from "./_utils/LoadingSpinner.svelte";

	import { imageModalData, navCheck, projScrollIdx } from "../Stores";
	import { loadConfig } from "../linkConfig";

	function removeAllIndicators() {
		const intInds = document.querySelectorAll(".interaction-indicator");

		for (const elem of intInds) {
			const cElem = elem as HTMLElement;
			if (!cElem.classList.contains("rendered")) {
				cElem.style.display = "hidden";
				cElem.style.width = "0px";
			}
		}
	}
	function handleNavHover1(e: Event) {
		removeAllIndicators();

		const navCont = e.currentTarget;
		const intInd = (navCont as HTMLElement).children[1] as HTMLElement;
		if (!intInd.classList.contains("rendered")) {
			intInd.style.backgroundColor = "#82b74bff";
			intInd.style.width = "100%";
		}
	}
	function handleNavHover2(e: Event) {
		const navCont = e.currentTarget;
		const intInd = (navCont as HTMLElement).children[1] as HTMLElement;
		if (!intInd.classList.contains("rendered")) {
			intInd.style.display = "hidden";
			intInd.style.width = "0px";
		}
	}
	function forwardClick(e: Event) {
		const elem = (<HTMLElement>e.currentTarget)
			.children[0] as HTMLAnchorElement;
		elem.click();
	}
	function handleNavClick(e: Event) {
		$navCheck = true;
		setTimeout(() => {
			$navCheck = false;
		}, 300);
		const elem = (<HTMLElement>e.currentTarget).parentElement;

		if (elem.children.length == 2) {
			if (!elem.children[1].classList.contains("rendered")) {
				document
					.querySelector(".rendered")
					.classList.remove("rendered");
				removeAllIndicators();
				elem.children[1].classList.add("rendered");
				if (elem.id == "4") {
					$projScrollIdx = 0;
				}
			}
		} else {
			if (!elem.children[0].classList.contains("rendered")) {
				if (elem.id == "4") {
					$projScrollIdx = 0;
				}
			}
		}
	}

	function handleMobileClick(e: Event) {
		const elem = <HTMLElement>e.currentTarget;
		elem.classList.toggle("change");
		document
			.querySelector(".content-wrapper")
			.classList.toggle("menu-hidden");
	}
</script>

<main>
	{#await loadConfig()}
		<LoadingSpinner />
	{:then _}
		<MediaQuery query="(orientation:landscape)" let:matches>
			{#if matches}
				<div class="header">
					<div
						class="home-container"
						on:click={() => {
							$goto("./index");
						}}
					>
						<img
							src="img/logo.svg"
							alt="logo"
							height="30"
							width="30"
						/>
					</div>
					<div class="navigation">
						<div
							id="1"
							class="nav-btn-cont"
							on:mouseenter={handleNavHover1}
							on:mouseleave={handleNavHover2}
							on:click={forwardClick}
						>
							<a
								href={$url("./index")}
								class="nav-btn"
								on:click={handleNavClick}>Home</a
							>
							<div
								class="{$isActive('./index')
									? 'rendered '
									: ''}interaction-indicator"
							/>
						</div>
						<div
							id="2"
							class="nav-btn-cont"
							on:mouseenter={handleNavHover1}
							on:mouseleave={handleNavHover2}
							on:click={forwardClick}
						>
							<a
								href={$url("./about")}
								class="nav-btn"
								on:click={handleNavClick}>About</a
							>
							<div
								class="{$isActive('./about')
									? 'rendered '
									: ''}interaction-indicator"
							/>
						</div>
						<div
							id="3"
							class="nav-btn-cont"
							on:mouseenter={handleNavHover1}
							on:mouseleave={handleNavHover2}
							on:click={forwardClick}
						>
							<a
								href={$url("./experience")}
								class="nav-btn"
								on:click={handleNavClick}>Experience</a
							>
							<div
								class="{$isActive('./experience')
									? 'rendered '
									: ''}interaction-indicator"
							/>
						</div>
						<div
							id="4"
							class="nav-btn-cont"
							on:mouseenter={handleNavHover1}
							on:mouseleave={handleNavHover2}
							on:click={forwardClick}
						>
							<a
								href={$url("./featured")}
								class="nav-btn"
								on:click={handleNavClick}>Featured</a
							>
							<div
								class="{$isActive('./featured')
									? 'rendered '
									: ''}interaction-indicator"
							/>
						</div>
						<div
							id="5"
							class="nav-btn-cont"
							on:mouseenter={handleNavHover1}
							on:mouseleave={handleNavHover2}
							on:click={forwardClick}
						>
							<a
								href={$url("./projects")}
								class="nav-btn"
								on:click={handleNavClick}>Projects</a
							>
							<div
								class="{$isActive('./projects') ||
								$isActive('./minesweeper') ||
								$isActive('./pong') ||
								$isActive('./tetris')
									? 'rendered '
									: ''}interaction-indicator"
							/>
						</div>
						<div
							id="6"
							class="nav-btn-cont"
							on:mouseenter={handleNavHover1}
							on:mouseleave={handleNavHover2}
							on:click={forwardClick}
						>
							<a
								href={$url("./organizations")}
								class="nav-btn"
								on:click={handleNavClick}>Organizations</a
							>
							<div
								class="{$isActive('./organizations')
									? 'rendered '
									: ''}interaction-indicator"
							/>
						</div>
						<div
							id="7"
							class="nav-btn-cont"
							on:mouseenter={handleNavHover1}
							on:mouseleave={handleNavHover2}
							on:click={forwardClick}
						>
							<a
								href={$url("./art")}
								class="nav-btn"
								on:click={handleNavClick}>Art Gallery</a
							>
							<div
								class="{$isActive('./art')
									? 'rendered '
									: ''}interaction-indicator"
							/>
						</div>
						<div
							id="8"
							class="nav-btn-cont"
							on:mouseenter={handleNavHover1}
							on:mouseleave={handleNavHover2}
							on:click={forwardClick}
						>
							<a
								href={$url("./contact")}
								class="nav-btn"
								on:click={handleNavClick}>Contact</a
							>
							<div
								class="{$isActive('./contact')
									? 'rendered '
									: ''}interaction-indicator"
							/>
						</div>
					</div>
				</div>
			{:else}
				<div class="mobile-header">
					<div class="home-container">
						<img
							src="img/logo.svg"
							alt="logo"
							height="30"
							width="30"
						/>
						<div
							class="nav-toggle"
							on:click|stopPropagation={handleMobileClick}
						>
							<div class="bar1" />
							<div class="bar2" />
							<div class="bar3" />
						</div>
					</div>
				</div>
			{/if}
		</MediaQuery>
		<div class="content-wrapper menu-hidden">
			<div class="content-body">
				<Socials />
				<slot />
			</div>
			<MediaQuery query="(orientation:landscape)" let:matches>
				{#if !matches}
					<div class="navigation">
						<div id="1" class="nav-btn-cont{$isActive('./index') ? ' rendered' : ''}" on:click={forwardClick}>
							<a href={$url("./index")} class="nav-btn" on:click={handleNavClick}>Home</a>
						</div>
						<div id="2" class="nav-btn-cont{$isActive('./about') ? ' rendered' : ''}" on:click={forwardClick}>
							<a href={$url("./about")} class="nav-btn" on:click={handleNavClick}>About</a>
						</div>
						<div class="spacer" />
						<div id="3" class="nav-btn-cont{$isActive('./experience') ? ' rendered' : ''}" on:click={forwardClick}>
							<a href={$url("./experience")} class="nav-btn" on:click={handleNavClick}>Experience</a>
						</div>
						<div class="spacer" />
						<div id="4" class="nav-btn-cont{$isActive('./featured') ? ' rendered' : ''}" on:click={forwardClick} >
							<a href={$url("./featured")} class="nav-btn" on:click={handleNavClick}>Featured</a>
						</div>
						<div class="spacer" />
						<div id="5" class="nav-btn-cont{$isActive('./projects') || $isActive('./minesweeper') || $isActive('./pong') || $isActive('./tetris') ? ' rendered' : ''}" on:click={forwardClick} >
							<a href={$url("./projects")} class="nav-btn" on:click={handleNavClick}>Projects</a>
						</div>
						<div class="spacer" />
						<div id="6" class="nav-btn-cont{$isActive('./organizations') ? ' rendered' : ''}" on:click={forwardClick}>
							<a href={$url("./organizations")} class="nav-btn" on:click={handleNavClick}>Organizations</a>
						</div>
						<div class="spacer" />
						<div id="7" class="nav-btn-cont{$isActive('./art') ? ' rendered' : ''}" on:click={forwardClick}>
							<a href={$url("./art")} class="nav-btn" on:click={handleNavClick}>Art Gallery</a>
						</div>
						<div class="spacer" />
						<div id="8" class="nav-btn-cont{$isActive('./contact') ? ' rendered' : ''}" on:click={forwardClick}>
							<a href={$url("./contact")} class="nav-btn" on:click={handleNavClick}>Contact</a>
						</div>
					</div>
				{/if}
			</MediaQuery>
		</div>
		<ImageModal config={$imageModalData} />
	{/await}
	<div class="rights">© Travis Lane 2022</div>
</main>

<style>
	@import "/theme.css";

	main {
		width: 100vw;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		overflow: hidden;
	}
	main .header {
		width: 100%;
		height: 50px;
		background-color: var(--foreground);
		box-shadow: #151515 1px 1px 10px 0px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	main .header .home-container {
		height: 100%;
		width: 50px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}
	main .header .navigation {
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	main .header .navigation .nav-btn-cont {
		height: 100%;
		padding: 0px 9px;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}
	main .header .navigation .nav-btn-cont .nav-btn {
		color: var(--font-color);
		text-decoration: none;
		margin-top: 14px;
	}
	main .header .navigation .nav-btn-cont .nav-btn:focus {
		color: var(--font-color);
	}
	main .header .navigation .nav-btn-cont .interaction-indicator {
		width: 0px;
		height: 3px;
		background-color: var(--highlight);
		border-radius: 8px;
		transition: width 0.3s ease-in-out;
	}
	main .header .navigation .nav-btn-cont .rendered {
		width: 100% !important;
		background-color: var(--font-color) !important;
	}
	main .header .navigation .nav-btn-cont:hover {
		cursor: pointer;
	}
	main .mobile-header {
		width: 100%;
		background-color: var(--foreground);
		box-shadow: #151515 1px 1px 10px 0px;
		display: flex;
		flex-direction: column;
	}
	main .mobile-header .home-container {
		height: 50px;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		cursor: pointer;
	}
	main .mobile-header .home-container .nav-toggle {
		margin-right: 7px;
		display: inline-block;
		cursor: pointer;
	}
	main .mobile-header .home-container .nav-toggle .bar1,
	main .mobile-header .home-container .nav-toggle .bar2,
	main .mobile-header .home-container .nav-toggle .bar3 {
		width: 35px;
		height: 5px;
		background-color: var(--font-color);
		margin: 6px 0;
		transition: 0.4s;
		border-radius: 8px;
	}
	main .mobile-header .home-container .change .bar1 {
		-webkit-transform: rotate(-45deg) translate(-9px, 6px);
		transform: rotate(-45deg) translate(-9px, 6px);
		border-radius: 8px;
	}
	main .mobile-header .home-container .change .bar2 {
		opacity: 0;
	}
	main .mobile-header .home-container .change .bar3 {
		-webkit-transform: rotate(45deg) translate(-8px, -8px);
		transform: rotate(45deg) translate(-9px, -7px);
		border-radius: 8px;
	}
	main .mobile-header .home-container img {
		margin-left: 7px;
	}
	main .content-wrapper {
		z-index: 2;
		overflow-x: hidden;
		height: calc(100% - 50px);
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: flex-start;
	}
	main .content-wrapper .content-body {
		position: relative;
		height: 100%;
		width: 100vw;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}
	main .content-wrapper .navigation {
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
	}
	main .content-wrapper .navigation .spacer {
		width: 80%;
		height: 1px;
		background-color: #5e5d5d;
	}
	main .content-wrapper .navigation .nav-btn-cont {
		height: 40px;
		width: 150px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	main .content-wrapper .navigation .nav-btn-cont .nav-btn {
		color: var(--font-color);
		text-decoration: none;
		margin: 7px 0px;
	}
	main .content-wrapper .navigation .nav-btn-cont .nav-btn:focus {
		color: var(--font-color);
	}
	main .content-wrapper .navigation .rendered {
		background-color: var(--background-selected);
	}
	main .content-wrapper .navigation .nav-btn-cont:hover {
		cursor: pointer;
	}
	main .menu-hidden > .navigation {
		left: 100%;
	}
	.rights {
		position: absolute;
		right: 7px;
		bottom: 7px;
		font-size: 10px;
		opacity: 0.4;
	}
	main {
		width: 100vw;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		overflow: hidden;
	}
	main .header {
		width: 100%;
		height: 50px;
		background-color: var(--foreground);
		box-shadow: #151515 1px 1px 10px 0px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	main .header .home-container {
		height: 100%;
		width: 50px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}
	main .header .navigation {
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	main .header .navigation .nav-btn-cont {
		height: 100%;
		padding: 0px 9px;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}
	main .header .navigation .nav-btn-cont .nav-btn {
		color: var(--font-color);
		text-decoration: none;
		margin-top: 14px;
	}
	main .header .navigation .nav-btn-cont .nav-btn:focus {
		color: var(--font-color);
	}
	main .header .navigation .nav-btn-cont .interaction-indicator {
		width: 0px;
		height: 3px;
		background-color: var(--highlight);
		border-radius: 8px;
		transition: width 0.3s ease-in-out;
	}
	main .header .navigation .nav-btn-cont .rendered {
		width: 100% !important;
		background-color: var(--font-color) !important;
	}
	main .header .navigation .nav-btn-cont:hover {
		cursor: pointer;
	}
	main .mobile-header {
		width: 100%;
		background-color: var(--foreground);
		box-shadow: #151515 1px 1px 10px 0px;
		display: flex;
		flex-direction: column;
	}
	main .mobile-header .home-container {
		height: 50px;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		cursor: pointer;
	}
	main .mobile-header .home-container .nav-toggle {
		margin-right: 7px;
		display: inline-block;
		cursor: pointer;
	}
	main .mobile-header .home-container .nav-toggle .bar1,
	main .mobile-header .home-container .nav-toggle .bar2,
	main .mobile-header .home-container .nav-toggle .bar3 {
		width: 35px;
		height: 5px;
		background-color: var(--font-color);
		margin: 6px 0;
		transition: 0.4s;
		border-radius: 8px;
	}
	main .mobile-header .home-container .change .bar1 {
		-webkit-transform: rotate(-45deg) translate(-9px, 6px);
		transform: rotate(-45deg) translate(-9px, 6px);
		border-radius: 8px;
	}
	main .mobile-header .home-container .change .bar2 {
		opacity: 0;
	}
	main .mobile-header .home-container .change .bar3 {
		-webkit-transform: rotate(45deg) translate(-8px, -8px);
		transform: rotate(45deg) translate(-9px, -7px);
		border-radius: 8px;
	}
	main .mobile-header .home-container img {
		margin-left: 7px;
	}
	main .content-wrapper {
		z-index: 2;
		overflow-x: hidden;
		height: calc(100% - 50px);
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: flex-start;
	}
	main .content-wrapper .content-body {
		position: relative;
		height: 100%;
		width: 100vw;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}
	main .content-wrapper .navigation {
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
	}
	main .content-wrapper .navigation .spacer {
		width: 80%;
		height: 1px;
		background-color: #5e5d5d;
	}
	main .content-wrapper .navigation .nav-btn-cont {
		height: 40px;
		width: 150px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	main .content-wrapper .navigation .nav-btn-cont .nav-btn {
		color: var(--font-color);
		text-decoration: none;
		margin: 7px 0px;
	}
	main .content-wrapper .navigation .nav-btn-cont .nav-btn:focus {
		color: var(--font-color);
	}
	main .content-wrapper .navigation .rendered {
		background-color: var(--background-selected);
	}
	main .content-wrapper .navigation .nav-btn-cont:hover {
		cursor: pointer;
	}
	main .menu-hidden > .navigation {
		left: 100%;
	}
	.rights {
		position: absolute;
		right: 7px;
		bottom: 7px;
		font-size: 10px;
		opacity: 0.4;
	}
</style>
