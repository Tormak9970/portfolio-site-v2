<script lang="ts" type="module">
    import { fade } from "svelte/transition";
	import ArtEntry from './_artEntry.svelte';
    import JumpList from "../_utils/JumpList.svelte";
    import { allowScroll, artScrollIdx, orientation, scrollDir } from "../../Stores";
    import { art } from '../../linkConfig';
    import MediaQuery from "../_utils/MediaQuery.svelte";
    import CardEntry from "./_cardEntry.svelte";
    import { afterPageLoad } from '@roxi/routify';
    import { onMount } from "svelte";
    import { throttle } from "../../utils";
    
    let preIdx = $artScrollIdx;

    interface ArtEnt {
        key:string,
        data:Art,
        isLast:boolean
    }

    const jumpNames:Map<number, string> = new Map([[0, "Foreword"]]);

    const pieces:ArtEnt[] = [
        {
            "key": "forword",
            "data": {
                "name": "Foreword",
                "img": undefined,
                "description": `I am by no means a professional artist, but I have always liked being creative and making different forms of art. 
                    I enjoy practicing art, and it is a good to take a break from development every now and again. 
                    Additionally, I find this practice invaluable when it comes to being a developer, 
                    as being able to impliment creativity into your work can really set you apart, and greatly improve whatever product you are designing.`
            },
            "isLast": false
        }
    ];
    const imgsMap:Map<number, HTMLImageElement> = new Map();

    function interceptScroll(e: WheelEvent) {
        const direction:boolean = e.deltaY > 0; // true = down, false = up
        
        if (!($artScrollIdx == 0 && !direction) && !($artScrollIdx == pieces.length-1 && direction) && Math.abs(e.deltaY) != 0) {
            if (direction) {
                preIdx++;
                $artScrollIdx++;
            } else {
                preIdx--;
                $artScrollIdx--;
            }
            $scrollDir = direction;
        } else {
            $allowScroll = true;
        }
    }
    function interceptScrollFromIdx(direction:boolean, tarIdx:number) {
        preIdx = tarIdx;
        $artScrollIdx = tarIdx;
        $scrollDir = direction;
    }
    function jumpToHandler(e: MouseEvent) {
        const target:HTMLElement = <HTMLElement>e.currentTarget;
        const curIdx = $artScrollIdx;
        const tarIdx:number = parseInt(target.id.substring(0, target.id.indexOf('-')));
        interceptScrollFromIdx(curIdx < tarIdx, tarIdx);
    }

    function processEntries([key, entr]:[string, Art], i:number) { 
        pieces.push({
            "key": key,
            "data": entr,
            "isLast": i+1 == art.size
        });
        jumpNames.set(i+1, entr.name);

        if (entr.img) {
            const img = new Image();
            img.onload = () => {
                imgsMap.set(i+1, img);
            }
            img.src = entr.img;
        }

        return entr; 
    }

    function manageScroll(e: WheelEvent) {
        if ($allowScroll) {
            $allowScroll = false;
            interceptScroll(e);
        }
    }

    $afterPageLoad(() => {
        if ($artScrollIdx != 0) {
            $artScrollIdx -= 1;
            interceptScrollFromIdx(false, $artScrollIdx+1);
        }
    });

    onMount(() => {
        Array.from(art).map(processEntries);
    })
</script>

<svelte:window on:wheel|stopPropagation="{throttle(manageScroll, 1000)}" />

<div id="art" in:fade>
    <div class="content{$orientation == 0 ? ' fancy' : ' card'}">
        <MediaQuery query="(orientation:landscape)" let:matches>
            {#if matches && $orientation == 0}
                {#key $artScrollIdx}
                    <ArtEntry entryData={pieces[$artScrollIdx].data} image={imgsMap.get($artScrollIdx)} isLast={pieces[$artScrollIdx].isLast}/>
                {/key}
            {:else}
                {#each pieces as artEntr, idx}
                    <CardEntry entryData={artEntr.data}/>
                {/each }
            {/if}
        </MediaQuery>
    </div>
    <MediaQuery query="(orientation:landscape)" let:matches>
        {#if matches}
            <JumpList len={art.size+1} tooltips={jumpNames} handler={jumpToHandler} scrollIdx={preIdx}/>
        {/if}
    </MediaQuery>
</div>

<style>
    #art {
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