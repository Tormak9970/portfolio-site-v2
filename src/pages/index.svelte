<script lang="ts">
    import { onMount } from "svelte";

    import { fade } from "svelte/transition";
    import { orientationQuery } from "../utils";

	import MediaQuery from "./_utils/MediaQuery.svelte";
    import NoisyDots from "./_utils/NoisyDots.svelte";

    let descIdx = 0;
    const descs = [
        {desc: "Developer", color: "#0f87d1"},
        {desc: "Artist", color: "#ff7700"},
        {desc: "Learner", color: "#3cd10f"},
    ]

    let descCont:HTMLDivElement;

    let descRuns = 0;
    const speed = 100;

    let blink = false;

    async function initAnim(): Promise<void> {
        descIdx = 0;
        descRuns = 0;
        
        await wait(speed);
        await showDescs();
    }

    async function typeDescs(): Promise<void> {
        if (descRuns < descs[descIdx].desc.length) {
            if (descCont) descCont.innerText = descs[descIdx].desc.substring(0, descRuns+1);
            descRuns++;
            
            await wait(speed);
            await typeDescs();
        }
    }

    async function delDescs(): Promise<void> {
        if (descRuns > 0) {
            if (descCont) descCont.innerText = descCont.innerText.substring(0, descCont.innerText.length - 1);
            descRuns--;
            
            await wait(speed);
            await delDescs();
        } else {
            await wait(speed);
            if (descCont) descCont.innerText = "";
            descIdx++;
        }
    }

    async function showDescs(): Promise<void> {
        await typeDescs();
        blink = true;
        await wait(1200);
        
        descRuns = descs[descIdx].desc.length;
        if (descIdx != descs.length - 1) {
            blink = false;
            await delDescs();
            blink = true;
            await wait(1200);
            blink = false
            await showDescs();
        } else {
            await wait(2000);
            await reset();
        }
    }

    async function reset(): Promise<void> {
        blink = false;
        await delDescs();
        blink = true;
        descIdx = 0;
        await wait(500);
        blink = false;
        initAnim();
    }

    function wait(ms:number) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    onMount(() => {
        initAnim();
    })
</script>

<div class="bg-cont">
    <div class="iframe-cont">
        <NoisyDots />
    </div>
    <MediaQuery query="{orientationQuery}" let:matches>
        {#if matches}
            <div id="aboutSection" class="landscape" in:fade>
                <div id="name">Travis Lane</div>
                <div class="desc-cont" style="--desc-color: {descs[descIdx]?.color ? descs[descIdx].color : '#0f87d1'}">
                    <div id="desc" bind:this="{descCont}"></div>
                    <div class="caret" class:animate="{blink}"></div>
                </div>
            </div>
        {:else}
            <div id="aboutSection" class="mobile" in:fade>
                <div id="name">Travis Lane</div>
                <div class="desc-cont" style="--desc-color: {descs[descIdx]?.color ? descs[descIdx].color : '#0f87d1'}">
                    <div id="desc" bind:this="{descCont}"></div>
                    <div class="caret" class:animate="{blink}"></div>
                </div>
            </div>
        {/if}
    </MediaQuery>
</div>

<style>
	@import "/theme.css";

    :root {
        --desc-color: "";
    }

    .bg-cont {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        position: relative;
    }

    .iframe-cont {
        width: 100%;
        height: 100%;

        position: absolute;
        top: 0;
        z-index: 1;
    }

    #aboutSection {
        z-index: 2;
    }

	.landscape {
		width: 80%;
		height: 80%;

		display: flex;
		flex-direction: column;
        align-items: center;
        justify-content: center;

        position: relative;
	}
    #name {
        --height: 64px;
        font-size: var(--height);

        position: absolute;
        bottom: 50%;
    }
    .desc-cont {
        color: var(--desc-color);
        --height: 48px;
        font-size: var(--height);

        position: absolute;
        top: 50%;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        height: 55.2px;
        width: 218.8px;
    }
    .desc-cont > .caret {
        background-color: var(--desc-color);
        --height: 48px;
        height: var(--height);
        width: 2px;
    }

    .animate {
        animation: blink .6s linear infinite alternate;
    }

    .mobile {
        width: 100%;
		height: 80%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    @keyframes blink {
        0% {opacity: 1;}
        40% {opacity: 1;}
        60% {opacity: 0;}
        100% {opacity: 0;}
    }
</style>