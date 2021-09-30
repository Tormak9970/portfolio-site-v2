<script lang="ts" context="module">
    // svelte-ignore unused-export-let
    export let jumpTo = (id:string) => {}
</script>
<script lang="ts">
    import { Project, projects } from "../LinkProj";
    import ProjectOverview from "./projects/ProjectOverview.svelte";
    import { startProjIdx } from "../Stores";

    interface ProjectEnt {
        key:string,
        data:Project,
        hidden:boolean,
        scrollType:string,
        isLast:boolean
    }

    const projectEntries:ProjectEnt[] = [];
    let scrollIdx:number = 0;
    let isScrolling:boolean = false;

    jumpTo = (id:string) => {
        console.log(id);
        const project:Project = projects.get(id);
        if (project) {
            const curIdx = projectEntries.findIndex((val:ProjectEnt, i:number) => { return val.key == id; });
            const curHIdx = projectEntries.findIndex((val:ProjectEnt, i:number) => { return !val.hidden; });
            projectEntries[curHIdx].hidden = true;
            
            scrollIdx = curIdx < curHIdx ? curIdx-1 : curIdx+1;
            interceptScrollFromIdx(false);
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
                    projectEntries[scrollIdx+1].scrollType = 'down-in';
                    projectEntries[scrollIdx+1].hidden = false;
                    projectEntries[scrollIdx].scrollType = 'down-out';
                    setTimeout(() => {
                        projectEntries[scrollIdx].hidden = true;
                        scrollIdx++;
                        isScrolling = false;
                    }, 1500);
                } else {
                    projectEntries[scrollIdx-1].scrollType = 'up-in';
                    projectEntries[scrollIdx-1].hidden = false;
                    projectEntries[scrollIdx].scrollType = 'up-out';
                    setTimeout(() => {
                        projectEntries[scrollIdx].hidden = true;
                        scrollIdx--;
                        isScrolling = false;
                    },  1500);
                }
            }
        }
    }
    function interceptScrollFromIdx(direction:boolean) {
        if (!isScrolling) {
            isScrolling = true;
            if (direction) {
                projectEntries[scrollIdx+1].scrollType = 'down-in';
                projectEntries[scrollIdx+1].hidden = false;
                projectEntries[scrollIdx].scrollType = 'down-out';
                setTimeout(() => {
                    projectEntries[scrollIdx].hidden = true;
                    scrollIdx++;
                    isScrolling = false;
                }, 1500);
            } else {
                projectEntries[scrollIdx-1].scrollType = 'up-in';
                projectEntries[scrollIdx-1].hidden = false;
                projectEntries[scrollIdx].scrollType = 'up-out';
                setTimeout(() => {
                    projectEntries[scrollIdx].hidden = true;
                    scrollIdx--;
                    isScrolling = false;
                },  1500);
            }
        }
    }

    function processEntries([key, entr]:[string, Project], i:number) { 
        projectEntries.push({
            "key": key,
            "data": entr, 
            "hidden": i !== $startProjIdx, 
            "scrollType": i == 0 ? 'down-in' : 'up-out',
            "isLast": i+1 == projects.size
        }); 
        return entr; 
    }
</script>
<svelte:window on:wheel|stopPropagation="{interceptScroll}" />

<div id="projects">
    {#each Array.from(projects).map(processEntries) as artEntr, idx}
        <ProjectOverview entryData={artEntr} hidden={projectEntries[idx].hidden} scrollType={projectEntries[idx].scrollType} isLast={projectEntries[idx].isLast}/>
    {/each}
</div>

<style lang="scss">
	$grey-primary: #252525;
	$grey-secondary: #383838;
	$bud-green: #82b74bff;
    $bud-green__hover: rgb(138, 194, 78);

	#projects {
		width: 100%;
		height:90%;

		display: flex;
		flex-direction: column;
        align-items: center;

        position: relative;

        overflow: hidden;
	}
</style>