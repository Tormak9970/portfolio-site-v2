<script lang="ts" type="module">
	import ArtEntry from './_artEntry.svelte';
    import JumpList from "../_utils/JumpList.svelte";

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

    function loadEntries(): Promise<ConfigPiece[]> { return fetch('./config.json').then(response => { return response.json(); }).then(json => { return json['art']; }); }
    const jumpNames:Map<number, string> = new Map([[0, "Foreword"]]);

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
    let isScrolling:boolean = false;
    function interceptScroll(e: WheelEvent) {
        if (!isScrolling) {
            const direction:boolean = e.deltaY > 0; // true = down, false = up
            
            const artElem = document.getElementById('art');
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

    function processEntries(entr:ConfigPiece , i) {
        pieces.push({...entr, "hidden": true, scrollType: 'up-out'});
        jumpNames.set(i+1, entr.name);
        return entr;
    }
</script>

<svelte:window on:wheel|stopPropagation="{interceptScroll}" />

<div id="art">
    <ArtEntry entryData={pieces[0]} hidden={pieces[0].hidden} scrollType={pieces[0].scrollType} isLast={false}/>

    {#await artPromise}
        <div class="loading-data">Loading art pieces...</div>
    {:then artData} 
        {#each artData.map(processEntries) as artEntr, idx}
            <ArtEntry entryData={artEntr} hidden={pieces[idx+1].hidden} scrollType={pieces[idx+1].scrollType} isLast={idx+1 == artData.length}/>
        {/each }
        <JumpList len={artData.length+1} tooltips={jumpNames} handler={jumpToHandler} scrollIdx={scrollIdx}/>
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