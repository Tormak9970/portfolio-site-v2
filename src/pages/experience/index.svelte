<script lang="ts" type="module">
    import { fade } from "svelte/transition";
	import ExperienceEntry from './_experienceEntry.svelte';
    import JumpList from "../_utils/JumpList.svelte";
    import { allowScroll, expScrollIdx, orientation, scrollDir } from "../../Stores";
    import { experience } from '../../linkConfig';
    import MediaQuery from "../_utils/MediaQuery.svelte";
    import CardEntry from "./_cardEntry.svelte";
    import { afterPageLoad } from '@roxi/routify';
    import { onMount } from "svelte";
    import { throttle } from "../../utils";

    interface ExperienceEnt {
        key:string,
        data:Experience,
        isLast:boolean
    }

    const jumpNames:Map<number, string> = new Map();

    const pieces:ExperienceEnt[] = [];

    function interceptScroll(e: WheelEvent) {
        const direction:boolean = e.deltaY > 0; // true = down, false = up
        
        if (!($expScrollIdx == 0 && !direction) && !($expScrollIdx == pieces.length-1 && direction) && Math.abs(e.deltaY) != 0) {
            if (direction) {
                $expScrollIdx++;
            } else {
                $expScrollIdx--;
            }
            $scrollDir = direction;
        } else {
            $allowScroll = true;
        }
    }
    function interceptScrollFromIdx(direction:boolean, tarIdx:number) {
        $expScrollIdx = tarIdx;
        $scrollDir = direction;
    }
    function jumpToHandler(e: MouseEvent) {
        const target:HTMLElement = <HTMLElement>e.currentTarget;
        const curIdx = $expScrollIdx;
        const tarIdx:number = parseInt(target.id.substring(0, target.id.indexOf('-')));
        interceptScrollFromIdx(curIdx < tarIdx, tarIdx);
    }

    function manageScroll(e: WheelEvent) {
        if ($orientation == 0) {
            if ($allowScroll) {
                $allowScroll = false;
                interceptScroll(e);
            }
        }
    }

    function processEntries([key, entr]:[string, Experience], i:number) { 
        pieces.push({
            "key": key,
            "data": entr,
            "isLast": i+1 == experience.size
        });
        jumpNames.set(i, entr.position);
        return entr; 
    }

    $afterPageLoad(() => {
        if ($expScrollIdx != 0) {
            $expScrollIdx -= 1;
            if ($orientation == 0) interceptScrollFromIdx(false, $expScrollIdx+1);
        }
    });

    onMount(() => {
        Array.from(experience).map(processEntries);
    });
</script>

<svelte:window on:wheel|stopPropagation|preventDefault="{throttle(manageScroll, 1000)}" />

<div id="experience">
    <div class="content{$orientation == 0 ? ' fancy' : ' card'}" in:fade>
        <MediaQuery query="(orientation:landscape)" let:matches>
            {#if matches && $orientation == 0}
                {#key $expScrollIdx}
                    <ExperienceEntry entryData={pieces[$expScrollIdx].data} isLast={pieces[$expScrollIdx].isLast}/>
                {/key}
            {:else}
                {#each pieces as expEntr, idx}
                    <CardEntry entryData={expEntr.data}/>
                {/each }
            {/if}
        </MediaQuery>
    </div>
    <MediaQuery query="(orientation:landscape)" let:matches>
        {#if matches}
            <JumpList len={experience.size} tooltips={jumpNames} handler={jumpToHandler} scrollIdx={$expScrollIdx}/>
        {/if}
    </MediaQuery>
</div>

<style>
    #experience {
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