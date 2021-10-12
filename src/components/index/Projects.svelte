<script lang="ts" context="module">
    // svelte-ignore unused-export-let
    export let jumpTo = (id:string) => {}
</script>
<script lang="ts">
    import { projects } from "../../LinkProj";
    import ProjectOverview from "./projects/ProjectOverview.svelte";
    import { startProjIdx } from "../../Stores";
    import JumpList from "./utils/JumpList.svelte";

    interface ProjectEnt {
        key:string,
        data:Project,
        hidden:boolean,
        scrollType:string,
        isLast:boolean
    }

    const pieces:ProjectEnt[] = [];
    let scrollIdx:number = 0;
    let isScrolling:boolean = false;
    const jumpNames:Map<number, string> = new Map();

    jumpTo = (id:string) => {
        console.log(id);
        const project:Project = projects.get(id);
        if (project) {
            const curIdx = pieces.findIndex((val:ProjectEnt, i:number) => { return val.key == id; });
            const curHIdx = pieces.findIndex((val:ProjectEnt, i:number) => { return !val.hidden; });
            pieces[curHIdx].hidden = true;
            
            scrollIdx = curIdx < curHIdx ? curIdx-1 : curIdx+1;
            interceptScrollFromJump(false);
        } else {
            throw Error(`Expected key ${id} to be in map but was not.`);
        }
    }

    function interceptScroll(e: WheelEvent) {
        if (!isScrolling) {
            const direction:boolean = e.deltaY > 0; // true = down, false = up
            
            const projElem = document.getElementById('projects');
            if (!(scrollIdx == 0 && !direction) && !(scrollIdx == projElem.children.length-1 && direction) && Math.abs(e.deltaY) != 0) {
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
    function interceptScrollFromJump(direction:boolean) {
        if (!isScrolling) {
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
    function jumpToHandler(e: MouseEvent) {
        const target:HTMLElement = <HTMLElement>e.currentTarget;
        const curIdx = scrollIdx;
        const tarIdx:number = parseInt(target.id.substr(0, target.id.indexOf('-')));
        interceptScrollFromIdx(curIdx < tarIdx, tarIdx);
    }

    function processEntries([key, entr]:[string, Project], i:number) { 
        pieces.push({
            "key": key,
            "data": entr, 
            "hidden": i !== $startProjIdx, 
            "scrollType": i == 0 ? 'down-in' : 'up-out',
            "isLast": i+1 == projects.size
        });
        jumpNames.set(i, entr.name);
        return entr; 
    }
</script>
<svelte:window on:wheel|stopPropagation="{interceptScroll}" />

<div id="projects">
    {#each Array.from(projects).map(processEntries) as artEntr, idx}
        <ProjectOverview entryData={artEntr} hidden={pieces[idx].hidden} scrollType={pieces[idx].scrollType} isLast={pieces[idx].isLast}/>
    {/each}
    <JumpList len={projects.size} tooltips={jumpNames} handler={jumpToHandler} scrollIdx={scrollIdx}/>
</div>

<style lang="scss">
	$grey-primary: #252525;
	$grey-secondary: #383838;
	$bud-green: #82b74bff;
    $bud-green__hover: rgb(138, 194, 78);

	#projects {
		width: 100%;
		height: 100%;

		display: flex;
		flex-direction: column;
        align-items: center;

        position: relative;

        overflow: hidden;
	}
</style>