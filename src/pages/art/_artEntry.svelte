<script lang="ts">
    import { beforeUpdate, onMount } from "svelte";
    import { fade, fly } from "svelte/transition";

    import { imageModalData, scrollDir, showing, allowScroll } from "../../Stores";
    
    import { getTransitions } from "../../utils";

    export let entryData:Art;
    export let isLast:boolean;

    let inParams;
    let outParams;

    function showModal() {
        $imageModalData = { "id": "artPreviewModal", "data": { "img": entryData.img, "name": entryData.name } };
        setTimeout(() => { $showing = true; }, 30);
    }

    beforeUpdate(() => {
        const transition = getTransitions($scrollDir);
        inParams = transition.in;
        outParams = transition.out;
    });

    onMount(() => {
        const transition = getTransitions($scrollDir);
        inParams = transition.in;
        outParams = transition.out;
    });
</script>

<div id="{entryData.name}" class="artEntry" in:fly={inParams} out:fly={outParams} on:introend="{() => { $allowScroll = true; }}">
    <div class="art-header">
        <h2>{entryData.name}</h2>
    </div>
    {#if entryData.img}
        <div class="content-container">
            <img src="{entryData.img}" alt="{entryData.name}" on:click="{showModal}">
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
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

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
    .artEntry > .content-container > img { width: 100%; height: auto; margin-top: 14px; border-radius: 5px; cursor: pointer; }
    .artEntry > .content-container > img:hover { opacity: 0.7; }
    .artEntry > .description { width: 100%; margin-top: 14px; font-size: 24px; text-align: center; }
    .artEntry > .msg { margin-top: 56px; font-size: 24px; }
</style>