<script lang="ts">
	import MyInfo from "./Info.svelte";

	export let name: string;
</script>

<main>
	<div class="container" style="margin-right: 15px;">
		<MyInfo/>
	</div>
	<div class="container" style="margin-left: 15px;">
		<div class="color-tester" style="background-color: rgb(138, 194, 78);"></div>
		<div class="color-tester" style="background-color: #82b74bff;"></div>
		<div class="color-tester" style="background-color: #405d27ff;"></div>
		<div class="color-tester" style="background-color: #32481eff;"></div>
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
		width: calc(50% - 45px);

		margin: 30px;
	}

	.color-tester {
		width: 50px;
		height: 50px;
	}
</style>