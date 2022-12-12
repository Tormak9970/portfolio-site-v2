<script lang="ts">
    import { beforeUpdate, onMount } from "svelte";
    import { fly, FlyParams } from "svelte/transition";
    import { goto } from '@roxi/routify';

    import { scrollDir, allowScroll } from "../../Stores";

    import { organizations } from "../../linkConfig";
    import { getTransitions } from "../../utils";

    export let entryData:Project;
    export let image:HTMLImageElement;
    export let isLast:boolean;

    let contentCont:HTMLDivElement;

    let inParams: FlyParams;
    let outParams: FlyParams;

    function openProjectEntry() {
        $goto(`./:project`, {project: entryData.name.toLowerCase().replaceAll(" ", "-").replaceAll("'", "")});
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
            contentCont.appendChild(image);
        }
    });
</script>

<div class="projEntry" in:fly|local={inParams} out:fly|local={outParams} on:introend="{handleTransEnd}">
    <div class="content-container">
        <div class="imgs-cont">
            <div class="positioner">
                <img src="{(entryData.org != "none") ? organizations.get(entryData.org).img : "/img/orgs/Logo-black-round.png"}" class="{(entryData.org != "none") ? "" : "round"}" alt="">
                <div class="proj-main-img" bind:this="{contentCont}">
                    {#if !image}
                        <img src="{entryData.img}" alt="{entryData.name}">
                    {/if}
                </div>
            </div>
        </div>
        <div class="proj-overview-cont">
            <div class="proj-header">
                <h2>{entryData.name}</h2>
            </div>
            <p class="overview">
                {@html entryData.description}
            </p>
            <div class="proj-link-cont">
                <div class="name">Learn more:</div>
                <div class="proj-link" on:click|stopPropagation="{openProjectEntry}">
                    <i class="fas fa-external-link-alt"></i>
                </div>
            </div>
        </div>
    </div>
    <div class="msg">{isLast ? "" : "Scroll to continue..."}</div>
</div>

<style>
    .projEntry {
        height: 81%;
        width: 80%;
        position: absolute;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .projEntry .proj-header {
        font-size: 27px;
    }
    .projEntry .content-container {
        width: 100%;
        height: calc(100% - 87px);
        display: grid;
        grid-template-columns: minmax(600px, 3fr) minmax(400px, 2fr);
        column-gap: 14px;
        justify-items: center;
        align-items: center;
    }
    .projEntry .content-container .imgs-cont {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .projEntry .content-container .imgs-cont .positioner {
        width: 100%;
        height: auto;
        position: relative;
    }
    .projEntry .content-container .imgs-cont .positioner :nth-child(1) {
        position: absolute;
        top: 0;
        left: 0;
        width: 200px;
        height: auto;
        z-index: 1;
    }
    .projEntry .content-container .imgs-cont .positioner .proj-main-img {
        position: relative;
        float: left;
        margin-top: 100px;
        margin-left: 120px;
        width: 400px;
        height: auto;
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: var(--foreground);
        border-radius: 8px;
        box-shadow: black -6px -6px 16px 2px;
        z-index: 2;
    }
    .projEntry .content-container .imgs-cont .positioner .proj-main-img :global(img) {
        position: static;
        width: 100%;
        height: auto;
        border-radius: 8px;
    }
    .projEntry .content-container .imgs-cont .positioner .round {
        border-radius: 50%;
    }
    .projEntry .content-container .proj-overview-cont {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }
    .projEntry .content-container .proj-overview-cont .overview {
        width: 100%;
        margin-top: 14px;
        font-size: 20px;
        text-align: center;
    }
    .projEntry .content-container .proj-overview-cont .proj-link-cont {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .projEntry .content-container .proj-overview-cont .proj-link-cont .name {
        height: 100%;
        margin-right: 7px;
        font-size: 20px;
    }
    .projEntry .content-container .proj-overview-cont .proj-link-cont .proj-link {
        padding-top: 3px;
        display: flex;
        flex-direction: row;
        align-items: center;
        color: var(--highlight);
        cursor: pointer;
        font-size: 14px;
    }
    .projEntry .content-container .proj-overview-cont .proj-link-cont .proj-link:hover {
        color: var(--highlight-hover);
    }
    .projEntry .msg {
        margin-top: 56px;
        font-size: 24px;
    }
</style>