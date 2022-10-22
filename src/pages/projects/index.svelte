<script lang="ts" context="module">
    // svelte-ignore unused-export-let
    export let jumpTo = (id:string) => {}
</script>
<script lang="ts">
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import { projects } from "../../linkConfig";
    import ProjEntry from "./_projEntry.svelte";
    import { projScrollIdx, orientation, scrollDir, allowScroll } from "../../Stores";
    import JumpList from "../_utils/JumpList.svelte";
    import MediaQuery from "../_utils/MediaQuery.svelte";
    import CardEntry from "./_cardEntry.svelte";
    import { afterPageLoad } from "@roxi/routify";
    import { throttle } from "../../utils";

    interface ProjectEnt {
        key:string,
        data:Project,
        isLast:boolean
    }

    let pieces:ProjectEnt[] = [];
    const jumpNames:Map<number, string> = new Map();
    const imgsMap:Map<number, HTMLImageElement> = new Map();

    function interceptScroll(e: WheelEvent) {
        const direction:boolean = e.deltaY > 0; // true = down, false = up
        
        if (!($projScrollIdx == 0 && !direction) && !($projScrollIdx == pieces.length-1 && direction) && Math.abs(e.deltaY) != 0) {
            if (direction) {
                $projScrollIdx++;
            } else {
                $projScrollIdx--;
            }
            $scrollDir = direction;
        } else {
            $allowScroll = true;
        }
    }
    function interceptScrollFromIdx(direction:boolean, tarIdx:number) {
        $projScrollIdx = tarIdx;
        $scrollDir = direction;
    }
    function jumpToHandler(e: MouseEvent) {
        const target:HTMLElement = <HTMLElement>e.currentTarget;
        const curIdx = $projScrollIdx;
        const tarIdx:number = parseInt(target.id.substring(0, target.id.indexOf('-')));
        interceptScrollFromIdx(curIdx < tarIdx, tarIdx);
    }

    jumpTo = (id:string) => {
        const project:Project = projects.get(id);
        if (project) {
            const curIdx = pieces.findIndex((val:ProjectEnt) => { return val.key == id; });
            const curHIdx = $projScrollIdx;
            
            $projScrollIdx = curIdx < curHIdx ? curIdx-1 : curIdx+1;
            $projScrollIdx--;
            $scrollDir = false;
        } else {
            throw Error(`Expected key ${id} to be in map but was not.`);
        }
    }

    function processEntries([key, entr]:[string, Project], i:number) { 
        pieces.push({
            "key": key,
            "data": entr,
            "isLast": i+1 == projects.size
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

    function manageScroll(e: WheelEvent) {
        if ($orientation == 0) {
            if ($allowScroll) {
                $allowScroll = false;
                interceptScroll(e);
            }
        }
    }

    $afterPageLoad(() => {
        if ($projScrollIdx != 0) {
            $projScrollIdx -= 1;
            if ($orientation == 0) interceptScrollFromIdx(false, $projScrollIdx+1);
        }
    });
    onMount(() => {
        Array.from(projects).reverse().map(processEntries);
        pieces = [...pieces];
    });
</script>
<svelte:window on:wheel|stopPropagation|preventDefault="{throttle(manageScroll, 1000)}" />

<div id="projects">
    <div class="content{$orientation == 0 ? ' fancy' : ' card'}" in:fade>
        <MediaQuery query="(orientation:landscape)" let:matches>
            {#if matches && $orientation == 0}
                {#key $projScrollIdx}
                    <ProjEntry entryData={pieces[$projScrollIdx].data} image={imgsMap.get($projScrollIdx)} isLast={pieces[$projScrollIdx].isLast}/>
                {/key}
            {:else}
                {#each pieces as projEntr, idx}
                    <CardEntry entryData={projEntr.data}/>
                {/each }
            {/if}
        </MediaQuery>
    </div>
    <MediaQuery query="(orientation:landscape)" let:matches>
        {#if matches}
            <JumpList len={projects.size} tooltips={jumpNames} handler={jumpToHandler} scrollIdx={$projScrollIdx}/>
        {/if}
    </MediaQuery>
</div>

<style>
	#projects {
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