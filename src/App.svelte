<script lang="ts">
	import Contact from "./components/Contact.svelte";
	import About from "./components/About.svelte";
	import Experience from "./components/Experience.svelte";
	import Organizations from "./components/Organizations.svelte";
	import Projects from "./components/Projects.svelte";
	import Featured from "./components/Featured.svelte";

	function handleNavHover1(e: Event) {
		const intInds = document.querySelectorAll('.interaction-indicator');

		for (const elem of intInds) {
			if (!elem.classList.contains('rendered')) {
				elem.style.display = "hidden";
				elem.style.width = "0px";
			}
		}

		const navCont = e.currentTarget;
		const intInd = navCont.children[1];
		if (!intInd.classList.contains('rendered')) {
			intInd.style.backgroundColor = "#82b74bff";
			intInd.style.width = "100%";
		}
	}

	function handleNavHover2(e: Event) {
		const navCont = e.currentTarget;
		const intInd = navCont.children[1];
		if (!intInd.classList.contains('rendered')) {
			intInd.style.display = "hidden";
			intInd.style.width = "0px";
		}
	}

	function handleNavClick(e: Event) {
		document.querySelector('.rendered').classList.remove('rendered');
		e.currentTarget.children[1].classList.add('rendered');
	}

	export let name: string;
</script>

<main>
	<div class="header">
		<div class="home-container">

		</div>
		<div class="navigation">
			<div class="nav-btn-cont" on:mouseenter="{handleNavHover1}" on:mouseleave="{handleNavHover2}" on:click="{handleNavClick}">
				<a href="#" class="nav-btn">About</a>
				<div class="rendered interaction-indicator" style="width: 100%; background-color: rgb(231, 231, 231);"></div>
			</div>
			<div class="nav-btn-cont" on:mouseenter="{handleNavHover1}" on:mouseleave="{handleNavHover2}" on:click="{handleNavClick}">
				<a href="#" class="nav-btn">Experience</a>
				<div class="interaction-indicator"></div>
			</div>
			<div class="nav-btn-cont" on:mouseenter="{handleNavHover1}" on:mouseleave="{handleNavHover2}" on:click="{handleNavClick}">
				<a href="#" class="nav-btn">Featured</a>
				<div class="interaction-indicator"></div>
			</div>
			<div class="nav-btn-cont" on:mouseenter="{handleNavHover1}" on:mouseleave="{handleNavHover2}" on:click="{handleNavClick}">
				<a href="#" class="nav-btn">Projects</a>
				<div class="interaction-indicator"></div>
			</div>
			<div class="nav-btn-cont" on:mouseenter="{handleNavHover1}" on:mouseleave="{handleNavHover2}" on:click="{handleNavClick}">
				<a href="#" class="nav-btn">Organizations</a>
				<div class="interaction-indicator"></div>
			</div>
			<div class="nav-btn-cont" on:mouseenter="{handleNavHover1}" on:mouseleave="{handleNavHover2}" on:click="{handleNavClick}">
				<a href="#" class="nav-btn">Contact</a>
				<div class="interaction-indicator"></div>
			</div>
		</div>
	</div>
	<div class="content-body">

	</div>
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
				}
				.nav-btn-cont:hover {
					cursor: pointer;
				}
				.rendered {
					width: 100%;
					background-color: $font-color;
				}
			}
		}

		.content-body {
			height: calc(100% - 50px);
			width: 100%;

			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
	}
</style>