<script lang="ts">
    import { fade } from "svelte/transition";
	import { featured } from "../linkConfig";
    import ProjectOverview from "./projects/_projectOverview.svelte";
    import MediaQuery from "./_utils/MediaQuery.svelte";
    import CardEntry from "./projects/_cardEntry.svelte";
</script>

<div id="featured" in:fade>
    <MediaQuery query="(orientation:landscape)" let:matches>
        {#if matches}
            <ProjectOverview entryData={featured} hidden={false} scrollType="" isLast={true}/>
        {:else}
            <CardEntry entryData={featured}/>
        {/if}
    </MediaQuery>
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
	}
</style>