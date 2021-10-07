<script lang="ts">
	import { startProjIdx, currentRendered, projectDisplay, showProject, imageModalData } from "./Stores";
	import About from "./components/About.svelte";
	import Experience from "./components/Experience.svelte";
	import Featured from "./components/Featured.svelte";
	import Projects, { jumpTo } from "./components/Projects.svelte";
	import Organizations from "./components/Organizations.svelte";
	import Art from "./components/Art.svelte";
	import Contact from "./components/Contact.svelte";
	import Socials from "./components/Socials.svelte";
	import { loadProjects } from "./LinkProj";

	import { beforeUpdate } from 'svelte';
	import ProjectEntry from "./components/projects/ProjectEntry.svelte";
	import ImageModal from "./components/utils/ImageModal.svelte";
	
	loadProjects();

	const PagesLut = {
		'1': About,
		'2': Experience,
		'3': Featured,
		'4': Projects,
		'5': Organizations,
		'6': Art,
		'7': Contact,
	}

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
	function handleNavClick(e: Event) {
		$showProject = false;
		e.preventDefault();
		const elem = e.currentTarget as HTMLElement;
		
		if (!elem.classList.contains('rendered')) {
			document.querySelector('.rendered').classList.remove('rendered');
			removeAllIndicators();
			elem.children[1].classList.add('rendered');
			if (elem.id == '4') {
				$startProjIdx = 0;
			}
			$currentRendered = elem.id;
		}
	}

	beforeUpdate(() => {
		const elem = document.getElementById($currentRendered);
		const rendered = document.querySelector('.rendered');
		if (rendered) {
			rendered.classList.remove('rendered');
			removeAllIndicators();
			elem.children[1].classList.add('rendered');
		}
	});
</script>

<main>
	<div class="header">
		<div class="home-container">
			<img src="img/logo.svg" alt="logo" height="30" width="30">
		</div>
		<div class="navigation">
			<div id='1' class="nav-btn-cont" on:mouseenter="{handleNavHover1}" on:mouseleave="{handleNavHover2}" on:click="{handleNavClick}">
				<a href="." class="nav-btn">About</a>
				<div class="rendered interaction-indicator"></div>
			</div>
			<div id='2' class="nav-btn-cont" on:mouseenter="{handleNavHover1}" on:mouseleave="{handleNavHover2}" on:click="{handleNavClick}">
				<a href="." class="nav-btn">Experience</a>
				<div class="interaction-indicator"></div>
			</div>
			<div id='3' class="nav-btn-cont" on:mouseenter="{handleNavHover1}" on:mouseleave="{handleNavHover2}" on:click="{handleNavClick}">
				<a href="." class="nav-btn">Featured</a>
				<div class="interaction-indicator"></div>
			</div>
			<div id='4' class="nav-btn-cont" on:mouseenter="{handleNavHover1}" on:mouseleave="{handleNavHover2}" on:click="{handleNavClick}">
				<a href="." class="nav-btn">Projects</a>
				<div class="interaction-indicator"></div>
			</div>
			<div id='5' class="nav-btn-cont" on:mouseenter="{handleNavHover1}" on:mouseleave="{handleNavHover2}" on:click="{handleNavClick}">
				<a href="." class="nav-btn">Organizations</a>
				<div class="interaction-indicator"></div>
			</div>
			<div id='6' class="nav-btn-cont" on:mouseenter="{handleNavHover1}" on:mouseleave="{handleNavHover2}" on:click="{handleNavClick}">
				<a href="." class="nav-btn">Art Gallery</a>
				<div class="interaction-indicator"></div>
			</div>
			<div id='7' class="nav-btn-cont" on:mouseenter="{handleNavHover1}" on:mouseleave="{handleNavHover2}" on:click="{handleNavClick}">
				<a href="." class="nav-btn">Contact</a>
				<div class="interaction-indicator"></div>
			</div>
		</div>
	</div>
	<div class="content-body">
		<Socials />
		<svelte:component this={PagesLut[$currentRendered]}/>
		<div class="project-container{$showProject ? '' : ' hidden'}">
			<ProjectEntry entryData={$projectDisplay}/>
		</div>
	</div>
	<ImageModal config={$imageModalData} />
</main>

<style lang="scss">
	$grey-primary: #252525;
	$grey-secondary: #383838;
	$font-color: rgb(231, 231, 231);
	$bud-green: #82b74bff;
    $bud-green__hover: rgb(138, 194, 78);
    $dark-moss-green: #405d27ff;
    $army-green: #32481eff;

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

		.content-body {
			z-index: 2;
			position: relative;

			height: calc(100% - 50px);
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
			.hidden {
				top: 100%;
			}
		}
	}
</style>