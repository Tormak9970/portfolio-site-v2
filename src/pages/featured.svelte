<script lang="ts">
    import { fade } from "svelte/transition";
	import { featured } from "../linkConfig";
    import ProjEntry from "./projects/_projEntry.svelte";
    import MediaQuery from "./_utils/MediaQuery.svelte";
    import CardEntry from "./projects/_cardEntry.svelte";
</script>

<div id="featured" in:fade>
    <MediaQuery query="(orientation:landscape)" let:matches>
        {#if matches}
            <ProjEntry entryData={featured} image={null} isLast={true}/>
        {:else}
            <CardEntry entryData={featured}/>
        {/if}
    </MediaQuery>
</div>

<style>
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