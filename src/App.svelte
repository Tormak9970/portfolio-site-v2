<script lang="ts">
	import MyInfo from "./components/Info.svelte";
	import About from "./components/About.svelte";
	import Experience from "./components/Experience.svelte";
	import Organizations from "./components/Organizations.svelte";
	import Projects from "./components/Projects.svelte";
	import Featured from "./components/Featured.svelte";

	export let name: string;
</script>

<main>
	<div class="container" style="margin-right: 0px; width: 27%;">
		<MyInfo/>
		<Experience/>
	</div>
	<div class="container" style="margin-left: 0px; margin-right: 0px; width: 35%;">
		<About/>
		<Projects/>
	</div>
	<div class="container" style="margin-left: 10px; width: 34%">
		<Featured/>
		<Organizations/>
	</div>
</main>

<style lang="scss">
	$grey-primary: #252525;
	$grey-secondary: #383838;
	$bud-green: #82b74bff;
    $bud-green__hover: rgb(138, 194, 78);
    $dark-moss-green: #405d27ff;
    $army-green: #32481eff;

	main {
		width: 100%;
		height: 100%;

		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.container {
		height: calc(100% - 60px);
		width: calc(33% - 30px);

		margin: 30px;
	}
</style>