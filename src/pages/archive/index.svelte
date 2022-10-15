<script lang="ts" context="module">
    // svelte-ignore unused-export-let
    export let jumpTo = (id:string) => {}
</script>
<script lang="ts">
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import { archive } from "../../linkConfig";
    import CardEntry from "./_cardEntry.svelte";

    interface ProjectEnt {
        key:string,
        data:Project,
        isLast:boolean
    }

    let pieces:ProjectEnt[] = [];
    const jumpNames:Map<number, string> = new Map();
    const imgsMap:Map<number, HTMLImageElement> = new Map();

    function processEntries([key, entr]:[string, Project], i:number) { 
        pieces.push({
            "key": key,
            "data": entr,
            "isLast": i+1 == archive.size
        });
        jumpNames.set(i, entr.name);

        if (entr.img) {
            const img = new Image();
            img.onload = () => {
                imgsMap.set(i, img);
            }
            img.src = entr.img;
        }

        return entr; 
    }

    onMount(() => {
        Array.from(archive).map(processEntries);
        pieces = [...pieces];
    });
</script>

<div id="archive">
    <div class="content card" in:fade>
        {#each pieces as projEntr, idx}
            <CardEntry entryData={projEntr.data}/>
        {/each }
    </div>
</div>

<style>
	#archive {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
    }
    @media (orientation: landscape) {
        .content {
            width: 100%;
            height: 100%;
            position: relative;
            overflow-x: hidden;
        }
        .fancy {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
        }
        .card {
            display: grid;
            grid-template-columns: repeat(auto-fill, 330px);
            grid-auto-rows: max-content;
            grid-row-gap: 1em;
            grid-column-gap: 1em;
            overflow: scroll;
        }
    }
    @media (orientation: portrait) {
        .content {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            overflow: scroll;
            overflow-x: hidden;
        }
    }
</style>