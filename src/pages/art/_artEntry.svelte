<script lang="ts">
    import { beforeUpdate, onMount } from "svelte";
    import { fly, FlyParams } from "svelte/transition";

    import { imageModalData, scrollDir, showing, allowScroll } from "../../Stores";
    
    import { getTransitions } from "../../utils";

    export let entryData:Art;
    export let image:HTMLImageElement;
    export let isLast:boolean;

    let contentCont:HTMLDivElement;

    let inParams: FlyParams;
    let outParams: FlyParams;

    function showModal() {
        $imageModalData = { "id": "artPreviewModal", "data": { "img": entryData.img, "name": entryData.name } };
        setTimeout(() => { $showing = true; }, 30);
    }

    function handleTransEnd(): void { $allowScroll = true; }

    beforeUpdate(() => {
        const transition = getTransitions($scrollDir);
        inParams = transition.in;
        outParams = transition.out;
    });

    onMount(() => {
        const transition = getTransitions($scrollDir);
        inParams = transition.in;
        outParams = transition.out;

        if (image) {
            image.alt = entryData.name;
            image.onclick = showModal;
            contentCont.insertBefore(image, contentCont.children[0]);
        }
    });
</script>

<div id="{entryData.name}" class="artEntry" in:fly|local={inParams} out:fly|local={outParams} on:introend="{handleTransEnd}">
    <div class="art-header">
        <h2>{entryData.name}</h2>
    </div>
    {#if entryData.img}
        <div class="content-container" bind:this="{contentCont}">
            <!-- <img src="{entryData.img}" alt="{entryData.name}" on:click="{showModal}"> -->
            <div class="description">
                <p>{entryData.description}</p>
            </div>
        </div>
    {:else}
        <div class="description">
            <p>{entryData.description}</p>
        </div>
    {/if}

    <div class="msg">{isLast ? "To be continued..." : "Scroll to continue..."}</div>
</div>

<style>
    .artEntry {
        width: 64%;

        position: absolute;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }

    .artEntry > .art-header { font-size: 27px; }
    .artEntry > .content-container {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
        column-gap: 14px;
    }
    .artEntry > .content-container > :global(img) { width: auto; max-width: 100%; height: auto; max-height: 100%; margin-top: 14px; border-radius: 5px; cursor: pointer; }
    .artEntry > .content-container > :global(img:hover) { opacity: 0.7; }
    .artEntry > .description { width: 100%; margin-top: 14px; font-size: 24px; text-align: center; }
    .artEntry > .msg { margin-top: 56px; font-size: 24px; }
</style>