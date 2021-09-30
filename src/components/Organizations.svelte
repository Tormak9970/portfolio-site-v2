<script lang="ts" type="module">
	import OrgsEntry from "./organizations/OrgsEntry.svelte";

    type OrgsPiece = {
        name:string,
        path:string,
        description:string,
        hidden:boolean,
        scrollType:string
    }

	type ConfigProj = {
		name:string,
		link:string
	}

    type ConfigPiece = {
        name:string,
        path:string,
		about:string,
        description:string,
		projects:ConfigProj[]
    }

    let orgsPromise = loadEntries();

    function loadEntries(): Promise<ConfigPiece[]> {
        return fetch('./config.json').then(response => { return response.json(); }).then(json => { return json['organizations']; });
    }

    const pieces:OrgsPiece[] = [];

    let scrollIdx:number = 0;
    let isScrolling:boolean = false;
    function interceptScroll(e: WheelEvent) {
        if (!isScrolling) {
            const direction:boolean = e.deltaY > 0; // true = down, false = up
            
            const artElem = document.getElementById('orgs');
            if (!(scrollIdx == 0 && !direction) && !(scrollIdx == artElem.children.length-1 && direction) && Math.abs(e.deltaY) != 0) {
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

    function processEntries(entr:ConfigPiece , i) { pieces.push({...entr, "hidden": i != 0, scrollType: i == 0 ? 'down-in' : 'up-out'}); return entr; }
</script>

<svelte:window on:wheel|stopPropagation="{interceptScroll}" />

<div id="orgs">
    {#await orgsPromise}
        <div class="loading-data">Loading Organization pieces...</div>
    {:then orgData} 
        {#each orgData.map(processEntries) as artEntr, idx}
            <OrgsEntry entryData={artEntr} hidden={pieces[idx].hidden} scrollType={pieces[idx].scrollType} isLast={idx+1 == orgData.length}/>
        {/each}
    {/await}
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

        animation-name: fade-in;
        animation-fill-mode: both;
        animation-direction: alternate;
        animation-duration: 1.5s;

        overflow: hidden;
    }


    @keyframes fade-in {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
</style>