<script lang="ts" type="module">
	import ArtEntry from './art/ArtEntry.svelte';

    interface ArtPiece {
        name:string,
        path:string,
        description:string,
        hidden:boolean,
        scrollType:string
    }

    interface ConfigPiece {
        name:string,
        path:string,
        description:string
    }

    let artPromise = loadEntries();

    function loadEntries() {
        return fetch('./config.json').then(response => { return response.json(); }).then(json => { return json['art']; });
    }

    const pieces:ArtPiece[] = [
        {
            "name": "Foreword",
            "path": undefined,
            "description": `I am by no means a professional artist, but I have always liked being creative and making different forms of art. 
                I enjoy practicing art, and it is a good to take a break from development every now and again. 
                Additionally, I find this practice invaluable when it comes to being a developer, 
                as being able to impliment creativity into your work can really set you apart, and greatly improve whatever product you are designing.`,
            "hidden": false,
            "scrollType": 'down-in'
        }
    ];

    let scrollIdx:number = 0;
    function interceptScroll(e: WheelEvent) {
        const direction:boolean = e.deltaY > 0 && Math.abs(e.deltaY) != 0; // true = up, false = down
        
        const artElem = document.getElementById('art');
        if (!(scrollIdx == 0 && !direction) && !(scrollIdx == artElem.children.length-1 && direction)) {
            if (direction) {
                pieces[scrollIdx+1].scrollType = 'down-in';
                pieces[scrollIdx+1].hidden = false;
                pieces[scrollIdx].scrollType = 'down-out';
                setTimeout(() => {
                    pieces[scrollIdx].hidden = true;
                    scrollIdx++;
                }, 1500);
            } else {
                pieces[scrollIdx-1].scrollType = 'up-in';
                pieces[scrollIdx-1].hidden = false;
                pieces[scrollIdx].scrollType = 'up-out';
                setTimeout(() => {
                    pieces[scrollIdx].hidden = true;
                    scrollIdx--;
                },  1500);
            }
        }
    }

    function processEntries(entr:ConfigPiece , i) {
        pieces.push({...entr, "hidden": true, scrollType: 'up-out'});
        return entr;
    }
</script>

<svelte:window on:wheel|stopPropagation="{interceptScroll}" />

<div id="art">
    <ArtEntry entryData={pieces[0]} hidden={pieces[0].hidden} scrollType={pieces[0].scrollType}/>

    {#await artPromise}
        <div class="loading-data">Loading art pieces...</div>
    {:then artData} 
        {#each artData.map(processEntries) as artEntr, idx}
            <ArtEntry entryData={artEntr} hidden={pieces[idx+1].hidden} scrollType={pieces[idx+1].scrollType}/>
        {/each }
    {/await}
</div>

<style lang="scss">
	$grey-primary: #252525;
	$grey-secondary: #383838;
	$bud-green: #82b74bff;
    $bud-green__hover: rgb(138, 194, 78);
    $dark-moss-green: #405d27ff;
    $army-green: #32481eff;

    #art {
		width: 80%;
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