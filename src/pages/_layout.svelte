<script lang="ts">
	import { startProjIdx, projectDisplay, showProject, imageModalData, navCheck } from "../Stores";
	import Socials from "./_utils/Socials.svelte";
	import { loadConfig } from "../linkConfig";

	import ProjectEntry from "./projects/_projectEntry.svelte";
	import ImageModal from "./_utils/ImageModal.svelte";
	import MediaQuery from "./_utils/MediaQuery.svelte";
	import { isActive, url } from "@roxi/routify";

	function removeAllIndicators() {
		const intInds = document.querySelectorAll('.interaction-indicator');

		for (const elem of intInds) {
			const cElem = elem as HTMLElement;
			if (!cElem.classList.contains('rendered')) {
				cElem.style.display = "hidden";
				cElem.style.width = "0px";
			}
		}
	}
	function handleNavHover1(e: Event) {
		removeAllIndicators();

		const navCont = e.currentTarget;
		const intInd = (navCont as HTMLElement).children[1] as HTMLElement;
		if (!intInd.classList.contains('rendered')) {
			intInd.style.backgroundColor = "#82b74bff";
			intInd.style.width = "100%";
		}
	}
	function handleNavHover2(e: Event) {
		const navCont = e.currentTarget;
		const intInd = (navCont as HTMLElement).children[1] as HTMLElement;
		if (!intInd.classList.contains('rendered')) {
			intInd.style.display = "hidden";
			intInd.style.width = "0px";
		}
	}
	function forwardClick(e: Event) {
		const elem = (<HTMLElement>e.currentTarget).children[0] as HTMLAnchorElement;
		elem.click();
	}
	function handleNavClick(e: Event) {
		$showProject = false;
		$navCheck = true;
		setTimeout(() => { $navCheck = false; }, 300);
		const elem = (<HTMLElement>e.currentTarget).parentElement;
		
		if (!elem.children[1].classList.contains('rendered')) {
			document.querySelector('.rendered').classList.remove('rendered');
			removeAllIndicators();
			elem.children[1].classList.add('rendered');
			if (elem.id == '4') {
				$startProjIdx = 0;
			}
		}
	}
</script>

<main>
	{#await loadConfig() then _}
		<MediaQuery query="(orientation:landscape)" let:matches>
			{#if matches}
				<div class="header">
					<div class="home-container">
						<img src="img/logo.svg" alt="logo" height="30" width="30">
					</div>
					<div class="navigation">
						<div id='1' class="nav-btn-cont" on:mouseenter="{handleNavHover1}" on:mouseleave="{handleNavHover2}" on:click="{forwardClick}">
							<a href="{$url('./index')}" class="nav-btn" on:click="{handleNavClick}">About</a>
							<div class="{$isActive('./index') ? 'rendered ' : ''}interaction-indicator"></div>
						</div>
						<div id='2' class="nav-btn-cont" on:mouseenter="{handleNavHover1}" on:mouseleave="{handleNavHover2}" on:click="{forwardClick}">
							<a href="{$url('./experience')}" class="nav-btn" on:click="{handleNavClick}">Experience</a>
							<div class="{$isActive('./experience') ? 'rendered ' : ''}interaction-indicator"></div>
						</div>
						<div id='3' class="nav-btn-cont" on:mouseenter="{handleNavHover1}" on:mouseleave="{handleNavHover2}" on:click="{forwardClick}">
							<a href="{$url('./featured')}" class="nav-btn" on:click="{handleNavClick}">Featured</a>
							<div class="{$isActive('./featured') ? 'rendered ' : ''}interaction-indicator"></div>
						</div>
						<div id='4' class="nav-btn-cont" on:mouseenter="{handleNavHover1}" on:mouseleave="{handleNavHover2}" on:click="{forwardClick}">
							<a href="{$url('./projects')}" class="nav-btn" on:click="{handleNavClick}">Projects</a>
							<div class="{$isActive('./projects') || $isActive('./minesweeper') || $isActive('./pong') || $isActive('./tetris') ? 'rendered ' : ''}interaction-indicator"></div>
						</div>
						<div id='5' class="nav-btn-cont" on:mouseenter="{handleNavHover1}" on:mouseleave="{handleNavHover2}" on:click="{forwardClick}">
							<a href="{$url('./organizations')}" class="nav-btn" on:click="{handleNavClick}">Organizations</a>
							<div class="{$isActive('./organizations') ? 'rendered ' : ''}interaction-indicator"></div>
						</div>
						<div id='6' class="nav-btn-cont" on:mouseenter="{handleNavHover1}" on:mouseleave="{handleNavHover2}" on:click="{forwardClick}">
							<a href="{$url('./art')}" class="nav-btn" on:click="{handleNavClick}">Art Gallery</a>
							<div class="{$isActive('./art') ? 'rendered ' : ''}interaction-indicator"></div>
						</div>
						<div id='7' class="nav-btn-cont" on:mouseenter="{handleNavHover1}" on:mouseleave="{handleNavHover2}" on:click="{forwardClick}">
							<a href="{$url('./contact')}" class="nav-btn" on:click="{handleNavClick}">Contact</a>
							<div class="{$isActive('./contact') ? 'rendered ' : ''}interaction-indicator"></div>
						</div>
					</div>
				</div>
			{:else}
				<div class="mobile-header">
					<div class="home-container">
						<img src="img/logo.svg" alt="logo" height="30" width="30">
						<div id="mobileMenu" class="nav-toggle">
							<div class="bar1"></div>
							<div class="bar2"></div>
							<div class="bar3"></div>
						</div>
					</div>
				</div>
			{/if}
		</MediaQuery>
		<div class="content-wrapper menu-hidden">
			<div class="content-body">
				<Socials />
				<slot />
				<div class="project-container{$showProject ? '' : ' hidden'}">
					<ProjectEntry entryData={$projectDisplay}/>
				</div>
			</div>
			<MediaQuery query="(orientation:landscape)" let:matches>
				{#if !matches}
					<div class="navigation">
						<div id='1' class="nav-btn-cont{$isActive('./index') ? ' rendered' : ''}" on:click="{forwardClick}">
							<a href="{$url('./index')}" class="nav-btn" on:click="{handleNavClick}">About</a>
						</div>
						<div id='2' class="nav-btn-cont{$isActive('./experience') ? ' rendered' : ''}" on:click="{forwardClick}">
							<a href="{$url('./experience')}" class="nav-btn" on:click="{handleNavClick}">Experience</a>
						</div>
						<div id='3' class="nav-btn-cont{$isActive('./featured') ? ' rendered' : ''}" on:click="{forwardClick}">
							<a href="{$url('./featured')}" class="nav-btn" on:click="{handleNavClick}">Featured</a>
						</div>
						<div id='4' class="nav-btn-cont{$isActive('./projects') || $isActive('./minesweeper') || $isActive('./pong') || $isActive('./tetris') ? ' rendered' : ''}" on:click="{forwardClick}">
							<a href="{$url('./projects')}" class="nav-btn" on:click="{handleNavClick}">Projects</a>
						</div>
						<div id='5' class="nav-btn-cont{$isActive('./organizations') ? ' rendered' : ''}" on:click="{forwardClick}">
							<a href="{$url('./organizations')}" class="nav-btn" on:click="{handleNavClick}">Organizations</a>
						</div>
						<div id='6' class="nav-btn-cont{$isActive('./art') ? ' rendered' : ''}" on:click="{forwardClick}">
							<a href="{$url('./art')}" class="nav-btn" on:click="{handleNavClick}">Art Gallery</a>
						</div>
						<div id='7' class="nav-btn-cont{$isActive('./contact') ? ' rendered' : ''}" on:click="{forwardClick}">
							<a href="{$url('./contact')}" class="nav-btn" on:click="{handleNavClick}">Contact</a>
						</div>
					</div>
				{/if}
			</MediaQuery>
		</div>
		<ImageModal config={$imageModalData} />
    {/await}
</main>

<style lang="scss">
	$grey-primary: #252525;
	$grey-secondary__selected: rgb(44, 44, 44);
	$grey-secondary: #383838;
	$font-color: rgb(231, 231, 231);
	$bud-green: #82b74bff;
    $bud-green__hover: rgb(138, 194, 78);

	main {
		width: 100%;
		height: 100%;

		display: flex;
		flex-direction: column;
		align-items: center;

		position: relative;

		.header {
			width: 100%;
			height: 50px;

			background-color: $grey-secondary;
			box-shadow: #151515 1px 1px 10px 0px;

			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;

			.home-container {
				height: 100%;
				width: 50px;

				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}

			.navigation {
				height: 100%;

				display: flex;
				flex-direction: row;
				align-items: center;

				.nav-btn-cont {
					height: 100%;

					padding: 0px 9px;

					display: flex;
					flex-direction: column;
					justify-content: flex-start;

					.nav-btn {
						color: $font-color;
						text-decoration: none;

						margin-top: 14px;
					}
					.nav-btn:focus {
						color: $font-color;
					}

					.interaction-indicator {
						width: 0px;
						height: 3px;

						background-color: $bud-green;

						border-radius: 8px;

						transition: width 0.3s ease-in-out;
					}

					.rendered {
						width: 100% !important;
						
						background-color: $font-color !important;
					}
				}
				.nav-btn-cont:hover {
					cursor: pointer;
				}
			}
		}
		.mobile-header {
			width: 100%;

			background-color: $grey-secondary;
			box-shadow: #151515 1px 1px 10px 0px;

			display: flex;
			flex-direction: column;

			.home-container {
				height: 50px;
				width: 100%;

				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;

				.nav-toggle {
					margin-right: 7px;
					display: inline-block;
					cursor: pointer;

					.bar1, .bar2, .bar3 {
						width: 35px;
						height: 5px;
						background-color: $font-color;
						margin: 6px 0;
						transition: 0.4s;
					}

					.change .bar1 { -webkit-transform: rotate(-45deg) translate(-9px, 6px); transform: rotate(-45deg) translate(-9px, 6px); }
					.change .bar2 { opacity: 0; }
					.change .bar3 { -webkit-transform: rotate(45deg) translate(-8px, -8px); transform: rotate(45deg) translate(-8px, -8px); }
				}

				img { margin-left: 7px; }
			}
		}

		.content-wrapper {
			z-index: 2;
			overflow-x: hidden;

			height: calc(100% - 50px);
			width: calc(100% + 150px);

			position: absolute;
			left: -150px;
			top: 50px;
			
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: flex-start;
			

			.content-body {
				position: relative;

				height: 100%;
				width: 100%;

				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				overflow: hidden;
				
				.project-container {
					z-index: 2;

					height: 100%;
					width: 100%;

					position: absolute;
					top: 0;

					display: flex;
					flex-direction: column;
					align-items: center;

					background-color: $grey-primary;

					transition: top 0.5s ease-in-out;
				}
				.hidden { top: 100%; }
			}

			.navigation {
				height: 100%;

				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				align-items: center;

				background-color: $grey-secondary;

				.nav-btn-cont {

					height: 40px;

					width: 150px;

					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;

					.nav-btn {
						color: $font-color;
						text-decoration: none;

						margin-top: 14px;

						&:focus { color: $font-color; }
					}
				}

				.rendered { background-color: $grey-secondary__selected; }
				.nav-btn-cont:hover { cursor: pointer; }
			}
		}

		.menu-hidden { left: 0; }
	}
</style>