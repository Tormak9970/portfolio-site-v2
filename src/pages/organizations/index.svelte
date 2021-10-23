<script lang="ts" type="module">
	import OrgsEntry from "./_orgsEntry.svelte";
    import JumpList from "../_utils/JumpList.svelte";
    import { organizations } from "../../linkConfig";

    type OrganizationsEnt = {
        key:string,
        data:Organization,
        hidden:boolean,
        scrollType:string,
        isLast:boolean
    }

    const pieces:OrganizationsEnt[] = [];
    const jumpNames:Map<number, string> = new Map();

    let scrollIdx:number = 0;
    let isScrolling:boolean = false;
    function interceptScroll(e: WheelEvent) {
        if (!isScrolling) {
            const direction:boolean = e.deltaY > 0; // true = down, false = up
            
            const orgsElem = document.getElementById('orgs');
            if (!(scrollIdx == 0 && !direction) && !(scrollIdx == orgsElem.children.length-2 && direction) && Math.abs(e.deltaY) != 0) {
                isScrolling = true;
                if (direction) {
                    pieces[scrollIdx+1].scrollType = 'down-in';
                    pieces[scrollIdx+1].hidden = false;
                    pieces[scrollIdx].scrollType = 'down-out';
                    setTimeout(() => {
                        pieces[scrollIdx].hidden = true;
                        scrollIdx++;
                        isScrolling = false;
                    }, 1500);
                } else {
                    pieces[scrollIdx-1].scrollType = 'up-in';
                    pieces[scrollIdx-1].hidden = false;
                    pieces[scrollIdx].scrollType = 'up-out';
                    setTimeout(() => {
                        pieces[scrollIdx].hidden = true;
                        scrollIdx--;
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
                pieces[scrollIdx].scrollType = 'down-out';
                setTimeout(() => {
                    pieces[scrollIdx].hidden = true;
                    scrollIdx = tarIdx;
                    isScrolling = false;
                }, 1500);
            } else {
                pieces[tarIdx].scrollType = 'up-in';
                pieces[tarIdx].hidden = false;
                pieces[scrollIdx].scrollType = 'up-out';
                setTimeout(() => {
                    pieces[scrollIdx].hidden = true;
                    scrollIdx = tarIdx;
                    isScrolling = false;
                },  1500);
            }
        }
    }
    function jumpToHandler(e: MouseEvent) {
        const target:HTMLElement = <HTMLElement>e.currentTarget;
        const curIdx = scrollIdx;
        const tarIdx:number = parseInt(target.id.substr(0, target.id.indexOf('-')));
        interceptScrollFromIdx(curIdx < tarIdx, tarIdx);
    }

    function processEntries([key, entr]:[string, Organization], i:number) { 
        pieces.push({
            "key": key,
            "data": entr, 
            "hidden": i !== 0, 
            "scrollType": i == 0 ? 'down-in' : 'up-out',
            "isLast": i+1 == organizations.size
        });
        jumpNames.set(i, entr.name);
        return entr; 
    }
</script>

<svelte:window on:wheel|stopPropagation="{interceptScroll}" />

<div id="orgs">
    {#each Array.from(organizations).map(processEntries) as orgEntr, idx}
        <OrgsEntry entryData={orgEntr} hidden={pieces[idx].hidden} scrollType={pieces[idx].scrollType} isLast={pieces[idx].isLast}/>
    {/each}
    <JumpList len={organizations.size} tooltips={jumpNames} handler={jumpToHandler} scrollIdx={scrollIdx}/>
</div>

<style lang="scss">
	$grey-primary: #252525;
	$grey-secondary: #383838;
	$bud-green: #82b74bff;
    $bud-green__hover: rgb(138, 194, 78);
    $dark-moss-green: #405d27ff;
    $army-green: #32481eff;

    #orgs {
		width: 100%;
		height: 100%;

        position: relative;

        overflow: hidden;
    }
</style>