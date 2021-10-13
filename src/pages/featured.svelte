<script lang="ts">
	import { featured } from "../linkConfig";
    import ProjectOverview from "./projects/_projectOverview.svelte";
</script>

<div id="featured">
	<ProjectOverview entryData={featured} hidden={false} scrollType="" isLast={true}/>
</div>

<style lang="scss">
	$grey-primary: #252525;
	$grey-secondary: #383838;
	$bud-green: #82b74bff;
    $bud-green__hover: rgb(138, 194, 78);
    $dark-moss-green: #405d27ff;
    $army-green: #32481eff;

	#featured {
		width: 100%;
		height: 100%;

		display: flex;
		flex-direction: column;
        align-items: center;

        position: relative;

        overflow: hidden;

        animation-name: fade-in;
        animation-fill-mode: both;
        animation-duration: 1.5s;
	}

    @keyframes fade-in {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
</style>