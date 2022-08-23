<script lang="ts" type="module">
    import { fade } from "svelte/transition";
	import ArtEntry from './_artEntry.svelte';
    import JumpList from "../_utils/JumpList.svelte";
    import { artScrollIdx, orientation } from "../../Stores";
    import { art } from '../../linkConfig';
    import MediaQuery from "../_utils/MediaQuery.svelte";
    import CardEntry from "./_cardEntry.svelte";
    import { afterPageLoad } from '@roxi/routify';

    interface ArtEnt {
        key:string,
        data:Art,
        hidden:boolean,
        scrollType:string,
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
            "hidden": false,
            "scrollType": 'down-in',
            "isLast": false
        }
    ];

    let isScrolling:boolean = false;
    function interceptScroll(e: WheelEvent) {
        if (!isScrolling) {
            const direction:boolean = e.deltaY > 0; // true = down, false = up
            
            const artElem = document.getElementById('art').children[0];
            if (!($artScrollIdx == 0 && !direction) && !($artScrollIdx == artElem.children.length-1 && direction) && Math.abs(e.deltaY) != 0) {
                isScrolling = true;
                if (direction) {
                    pieces[$artScrollIdx+1].scrollType = 'down-in';
                    pieces[$artScrollIdx+1].hidden = false;
                    pieces[$artScrollIdx].scrollType = 'down-out';
                    setTimeout(() => {
                        pieces[$artScrollIdx].hidden = true;
                        $artScrollIdx++;
                        isScrolling = false;
                    }, 1500);
                } else {
                    pieces[$artScrollIdx-1].scrollType = 'up-in';
                    pieces[$artScrollIdx-1].hidden = false;
                    pieces[$artScrollIdx].scrollType = 'up-out';
                    setTimeout(() => {
                        pieces[$artScrollIdx].hidden = true;
                        $artScrollIdx--;
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
                pieces[$artScrollIdx].scrollType = 'down-out';
                setTimeout(() => {
                    pieces[$artScrollIdx].hidden = true;
                    $artScrollIdx = tarIdx;
                    isScrolling = false;
                }, 1500);
            } else {
                pieces[tarIdx].scrollType = 'up-in';
                pieces[tarIdx].hidden = false;
                pieces[$artScrollIdx].scrollType = 'up-out';
                setTimeout(() => {
                    pieces[$artScrollIdx].hidden = true;
                    $artScrollIdx = tarIdx;
                    isScrolling = false;
                },  1500);
            }
        }
    }
    function jumpToHandler(e: MouseEvent) {
        const target:HTMLElement = <HTMLElement>e.currentTarget;
        const curIdx = $artScrollIdx;
        const tarIdx:number = parseInt(target.id.substr(0, target.id.indexOf('-')));
        interceptScrollFromIdx(curIdx < tarIdx, tarIdx);
    }

    function processEntries([key, entr]:[string, Art], i:number) { 
        pieces.push({
            "key": key,
            "data": entr, 
            "hidden": i+1 !== $artScrollIdx,
            "scrollType": i+1 == $artScrollIdx ? 'down-in' : 'up-out',
            "isLast": i+1 == art.size
        });
        jumpNames.set(i+1, entr.name);
        return entr; 
    }

    $afterPageLoad(() => {
        if ($artScrollIdx != 0) {
            $artScrollIdx -= 1;
            interceptScrollFromIdx(false, $artScrollIdx+1);
        }
    });
</script>

<svelte:window on:wheel|stopPropagation="{interceptScroll}" />

<div id="art" in:fade>
    <div class="content{$orientation == 0 ? ' fancy' : ' card'}">
        <MediaQuery query="(orientation:landscape)" let:matches>
            {#if matches && $orientation == 0}
                <ArtEntry entryData={pieces[0].data} hidden={pieces[0].hidden} scrollType={pieces[0].scrollType} isLast={false}/>
            {:else}
                <CardEntry entryData={pieces[0].data}/>
            {/if}
        </MediaQuery>
    
        {#each Array.from(art).map(processEntries) as artEntr, idx}
            <MediaQuery query="(orientation:landscape)" let:matches>
                {#if matches && $orientation == 0}
                    <ArtEntry entryData={artEntr} hidden={pieces[idx+1].hidden} scrollType={pieces[idx+1].scrollType} isLast={pieces[idx+1].isLast}/>
                {:else}
                    <CardEntry entryData={artEntr}/>
                {/if}
            </MediaQuery>
        {/each }
    </div>
    <MediaQuery query="(orientation:landscape)" let:matches>
        {#if matches}
            <JumpList len={art.size+1} tooltips={jumpNames} handler={jumpToHandler} scrollIdx={$artScrollIdx}/>
        {/if}
    </MediaQuery>
</div>

<style lang="scss">
	$grey-primary: #252525;
	$grey-secondary: #383838;
	$bud-green: #82b74bff;
    $bud-green__hover: rgb(138, 194, 78);

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