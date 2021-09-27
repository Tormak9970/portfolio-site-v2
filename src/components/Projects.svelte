<script lang="ts" context="module">
    import ProjectEntry from "./projects/ProjectEntry.svelte";

    import { Project, projects } from "../LinkProj";

	export let startIdx:number;

    interface ProjectEntries {
        data:Project,
        hidden:boolean,
        scrollType:string,
        isLast:boolean
    }

    const projectEntries:ProjectEntries[] = [];

    /**
     * Jumps display to the project with the specified id.
     * @param id The id of the project to jump to.
     */
    export function jumpTo(id:string) {
        const project:Project = projects.get(id);
        if (project) {

        } else {
            throw Error(`Expected key ${id} to be in map but was not.`);
        }
    }

    let scrollIdx:number = 0;
    let isScrolling:boolean = false;
    function interceptScroll(e: WheelEvent) {
        if (!isScrolling) {
            const direction:boolean = e.deltaY > 0; // true = down, false = up
            
            const artElem = document.getElementById('orgs');
            if (!(scrollIdx == 0 && !direction) && !(scrollIdx == artElem.children.length-1 && direction) && Math.abs(e.deltaY) != 0) {
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

    function processEntries([key, entr]:[string, Project], i:number) { 
        projectEntries.push({
            "data": entr, 
            "hidden": i != startIdx, 
            "scrollType": i == 0 ? 'down-in' : 'up-out',
            "isLast": i+1 == projects.size
        }); 
        return entr; 
    }
</script>

<div id="projects">
    {#each Array.from(projects).map(processEntries) as artEntr, idx}
        <ProjectEntry entryData={artEntr} hidden={projectEntries[idx].hidden} scrollType={projectEntries[idx].scrollType} isLast={idx+1 == projects.size}/>
    {/each}
</div>

<style lang="scss">
	$grey-primary: #252525;
	$grey-secondary: #383838;
	$bud-green: #82b74bff;
    $bud-green__hover: rgb(138, 194, 78);

	#projects {
		width: 90%;
		height: 80%;

		display: flex;
		flex-direction: column;
        align-items: center;
	}
</style>