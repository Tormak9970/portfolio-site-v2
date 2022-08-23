<script lang="ts" type="module">
    import { fade } from "svelte/transition";
	import ExperienceEntry from './_experienceEntry.svelte';
    import JumpList from "../_utils/JumpList.svelte";
    import { expScrollIdx, orientation } from "../../Stores";
    import { experience } from '../../linkConfig';
    import MediaQuery from "../_utils/MediaQuery.svelte";
    import CardEntry from "./_cardEntry.svelte";
    import { afterPageLoad } from '@roxi/routify';

    interface ExperienceEnt {
        key:string,
        data:Experience,
        hidden:boolean,
        scrollType:string,
        isLast:boolean
    }

    const jumpNames:Map<number, string> = new Map();

    const pieces:ExperienceEnt[] = [];

    let isScrolling:boolean = false;
    function interceptScroll(e: WheelEvent) {
        if (!isScrolling) {
            const direction:boolean = e.deltaY > 0; // true = down, false = up
            
            const artElem = document.getElementById('experience').children[0];
            if (!($expScrollIdx == 0 && !direction) && !($expScrollIdx == artElem.children.length-1 && direction) && Math.abs(e.deltaY) != 0) {
                isScrolling = true;
                if (direction) {
                    pieces[$expScrollIdx+1].scrollType = 'down-in';
                    pieces[$expScrollIdx+1].hidden = false;
                    pieces[$expScrollIdx].scrollType = 'down-out';
                    setTimeout(() => {
                        pieces[$expScrollIdx].hidden = true;
                        $expScrollIdx++;
                        isScrolling = false;
                    }, 1500);
                } else {
                    pieces[$expScrollIdx-1].scrollType = 'up-in';
                    pieces[$expScrollIdx-1].hidden = false;
                    pieces[$expScrollIdx].scrollType = 'up-out';
                    setTimeout(() => {
                        pieces[$expScrollIdx].hidden = true;
                        $expScrollIdx--;
                        isScrolling = false;
                    },  1500);
                }
            }
        }
    }
    function interceptScrollFromIdx(direction:boolean, tarIdx:number) {
        if (!isScrolling) {
            isScrolling = true;
            if (direction) {
                pieces[tarIdx].scrollType = 'down-in';
                pieces[tarIdx].hidden = false;
                pieces[$expScrollIdx].scrollType = 'down-out';
                setTimeout(() => {
                    pieces[$expScrollIdx].hidden = true;
                    $expScrollIdx = tarIdx;
                    isScrolling = false;
                }, 1500);
            } else {
                pieces[tarIdx].scrollType = 'up-in';
                pieces[tarIdx].hidden = false;
                pieces[$expScrollIdx].scrollType = 'up-out';
                setTimeout(() => {
                    pieces[$expScrollIdx].hidden = true;
                    $expScrollIdx = tarIdx;
                    isScrolling = false;
                },  1500);
            }
        }
    }
    function jumpToHandler(e: MouseEvent) {
        const target:HTMLElement = <HTMLElement>e.currentTarget;
        const curIdx = $expScrollIdx;
        const tarIdx:number = parseInt(target.id.substr(0, target.id.indexOf('-')));
        interceptScrollFromIdx(curIdx < tarIdx, tarIdx);
    }

    function processEntries([key, entr]:[string, Experience], i:number) { 
        pieces.push({
            "key": key,
            "data": entr, 
            "hidden": i !== $expScrollIdx,
            "scrollType": i == 0 ? 'down-in' : 'up-out',
            "isLast": i+1 == experience.size
        });
        jumpNames.set(i, entr.position);
        return entr; 
    }

    $afterPageLoad(() => {
        if ($expScrollIdx != 0) {
            $expScrollIdx -= 1;
            interceptScrollFromIdx(false, $expScrollIdx+1);
        }
    });
</script>

<svelte:window on:wheel|stopPropagation="{interceptScroll}" />

<div id="experience" in:fade>
    <div class="content{$orientation == 0 ? ' fancy' : ' card'}">
        {#each Array.from(experience).map(processEntries) as expEntr, idx}
            <MediaQuery query="(orientation:landscape)" let:matches>
                {#if matches && $orientation == 0}
                    <ExperienceEntry entryData={expEntr} hidden={pieces[idx].hidden} scrollType={pieces[idx].scrollType} isLast={pieces[idx].isLast}/>
                {:else}
                    <CardEntry entryData={expEntr}/>
                {/if}
            </MediaQuery>
        {/each }
    </div>
    <MediaQuery query="(orientation:landscape)" let:matches>
        {#if matches}
            <JumpList len={experience.size} tooltips={jumpNames} handler={jumpToHandler} scrollIdx={$expScrollIdx}/>
        {/if}
    </MediaQuery>
</div>

<style lang="scss">
	$grey-primary: #252525;
	$grey-secondary: #383838;
	$bud-green: #82b74bff;
    $bud-green__hover: rgb(138, 194, 78);

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