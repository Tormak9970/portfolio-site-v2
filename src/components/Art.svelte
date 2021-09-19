<script lang="ts" type="module">
	import ArtEntry from './art/ArtEntry.svelte';

    interface ArtPiece {
        name:String,
        path:String,
        description:String,
        hidden:boolean
    }

    interface ConfigPiece {
        name:String,
        path:String,
        description:String
    }

    let artPromise = loadEntries();

    function loadEntries() {
        return fetch('./config.json').then(response => { return response.json(); }).then(json => { return json['art']; });
    }

    const pieces:ArtPiece[] = [];

    let scrollIdx:number = 0;
    function interceptScroll(e: WheelEvent) {
        const direction:boolean = e.deltaY > 0 && Math.abs(e.deltaY) != 0; // true = up, false = down
        
        const foreword = document.querySelector('.foreword');
        const artGall = document.querySelector('.art-gallery');
        if (!(scrollIdx == 0 && !direction) && !(scrollIdx == artGall.children.length && direction)) {
            if (scrollIdx == 1 && !direction) {
                setTimeout(() => {
                    artGall.classList.add('true-hide');
                }, 700);
                foreword.classList.remove('true-hide');
                foreword.classList.remove('hidden');
                foreword.classList.add('visible');
                scrollIdx--;
            } else if (scrollIdx == 0 && direction) {
                foreword.classList.add('hidden');
                foreword.classList.remove('visible');
                setTimeout(() => {
                    foreword.classList.add('true-hide');
                }, 700);
                artGall.classList.remove('hidden');
                artGall.classList.remove('true-hide');
                pieces[0].hidden = false;
                scrollIdx++;
            } else {
                pieces[scrollIdx-1].hidden = true;
                if (direction) scrollIdx++; else scrollIdx--;
                pieces[scrollIdx-1].hidden = false;
            }
        }
    }

    function processEntries(entr:ConfigPiece , i) {
        pieces.push({...entr, "hidden": true});
        return entr;
    }
</script>

<svelte:window on:wheel|stopPropagation="{interceptScroll}" />

<div id="art">
    <div class="foreword visible">
        <div class="art-header">
            <h2>Foreword</h2>
        </div>
        <p>
            I am by no means a professional artist, but I have always liked being creative and making different forms of art. 
            I enjoy practicing art, and it is a good to take a break from development every now and again. 
            Additionally, I find this practice invaluable when it comes to being a developer, 
            as being able to impliment creativity into your work can really set you apart, and greatly improve whatever product you are designing.
        </p>

        <div class="msg">Scroll to continue...</div>
    </div>

    <div class="art-gallery hidden true-hide">
        {#await artPromise}
            <div class="loading-data">Loading art pieces...</div>
        {:then artData} 
            {#each artData.map(processEntries) as artEntr, idx}
                <ArtEntry entryData={artEntr} hidden={pieces[idx].hidden}/>
            {/each }
        {/await}
    </div>
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

		display: flex;
		flex-direction: column;
        align-items: center;

        animation-name: fade-in;
        animation-fill-mode: both;
        animation-duration: 1.5s;

        overflow: hidden;

        .art-header {
            font-size: 27px;
        }
        .foreword {
            width: 80%;
            
            font-size: 24px;
            text-align: center;

            transform: translateY(0%);
        }  
        .msg {
            margin-top: 56px;
            font-size: 24px;
        }

        .visible {
            opacity: 1;
            transform: translateY(20%);
            transition: opacity 0.7s, transform 0.7s;
        }

        .hidden {
            opacity: 0;
            transform: translateY(0%);
            transition: opacity 0.7s, transform 0.7s;
        }

        .true-hide {
            display: none;
        }
    }

    @keyframes fade-in {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
</style>