<script lang="ts" type="module">
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
	import OrgsEntry from "./_orgsEntry.svelte";
    import JumpList from "../_utils/JumpList.svelte";
    import { organizations } from "../../linkConfig";
    import { allowScroll, orgScrollIdx, orientation, scrollDir } from "../../Stores";
    import MediaQuery from "../_utils/MediaQuery.svelte";
    import CardEntry from "./_cardEntry.svelte";
    import { afterPageLoad } from "@roxi/routify";
    import { orientationQuery, throttle } from "../../utils";

    type OrganizationsEnt = {
        key:string,
        data:Organization,
        isLast:boolean
    }

    let pieces:OrganizationsEnt[] = [];
    const jumpNames:Map<number, string> = new Map();
    const imgsMap:Map<number, HTMLImageElement> = new Map();

    function interceptScroll(e: WheelEvent) {
        const direction:boolean = e.deltaY > 0; // true = down, false = up
        
        if (!($orgScrollIdx == 0 && !direction) && !($orgScrollIdx == pieces.length-1 && direction) && Math.abs(e.deltaY) != 0) {
            if (direction) {
                $orgScrollIdx++;
            } else {
                $orgScrollIdx--;
            }
            $scrollDir = direction;
        } else {
            $allowScroll = true;
        }
    }
    function interceptScrollFromIdx(direction:boolean, tarIdx:number) {
        $orgScrollIdx = tarIdx;
        $scrollDir = direction;
    }
    function jumpToHandler(e: MouseEvent) {
        const target:HTMLElement = <HTMLElement>e.currentTarget;
        const curIdx = $orgScrollIdx;
        const tarIdx:number = parseInt(target.id.substring(0, target.id.indexOf('-')));
        interceptScrollFromIdx(curIdx < tarIdx, tarIdx);
    }

    function processEntries([key, entr]:[string, Organization], i:number) { 
        pieces.push({
            "key": key,
            "data": entr,
            "isLast": i+1 == organizations.size
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
                setTimeout(() => $allowScroll = true, 300);
                interceptScroll(e);
            }
        }
    }

    $afterPageLoad(() => {
        if ($orgScrollIdx != 0) {
            $orgScrollIdx -= 1;
            if ($orientation == 0) interceptScrollFromIdx(false, $orgScrollIdx+1);
        }
    });

    onMount(() => {
        Array.from(organizations).map(processEntries);
        pieces = [...pieces];
    });
</script>

<svelte:window on:wheel|stopPropagationon|preventDefault="{manageScroll}" />

<div id="orgs">
    <div class="content{$orientation == 0 ? ' fancy' : ' card'}" in:fade>
        <MediaQuery query="{orientationQuery}" let:matches>
            {#if matches && $orientation == 0}
                {#key $orgScrollIdx}
                    <OrgsEntry entryData={pieces[$orgScrollIdx].data} image={imgsMap.get($orgScrollIdx)} isLast={pieces[$orgScrollIdx].isLast}/>
                {/key}
            {:else}
                {#each pieces as orgEntr, idx}
                    <CardEntry entryData={orgEntr.data}/>
                {/each }
            {/if}
        </MediaQuery>
    </div>
    
    <MediaQuery query="{orientationQuery}" let:matches>
        {#if matches}
            <JumpList len={organizations.size} tooltips={jumpNames} handler={jumpToHandler} scrollIdx={$orgScrollIdx}/>
        {/if}
    </MediaQuery>
</div>

<style>
    #orgs {
        width: 100%;
        height: 100%;

        position: relative;

        overflow: hidden;
    }

    @media (orientation: landscape) and (min-width:1200px) {
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

    @media (orientation: portrait) or (max-width: 1199px) {
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