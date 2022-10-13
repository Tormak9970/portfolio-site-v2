<script lang="ts">
    import { beforeUpdate, onMount } from "svelte";
    import { fly, FlyParams } from "svelte/transition";
    import { goto } from "@roxi/routify";

    import { scrollDir, allowScroll } from "../../Stores";

    import { jumpTo } from "../projects/index.svelte";
    import { getTransitions } from "../../utils";

    export let entryData:Organization;
    export let image:HTMLImageElement;
    export let isLast:boolean;

    let contentCont:HTMLDivElement;

    let inParams: FlyParams;
    let outParams: FlyParams;

    function linkToProj(id:string) {
        $goto('../projects');
        setTimeout(() => { jumpTo(id); }, 10);
    }

    function openOrgEntry() {
        $goto(`./:organization`, {organization: entryData.name.toLowerCase().replaceAll(" ", "-").replaceAll("'", "")});
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
            contentCont.insertBefore(image, contentCont.children[0]);
        }
    });
</script>

<div id="{entryData.name}" class="orgEntry" in:fly|local={inParams} out:fly|local={outParams} on:introend="{handleTransEnd}">
    <div class="content-container">
        <div class="imgs-cont" bind:this="{contentCont}">
            {#if !image}
                <img src="{entryData.img}" alt="{entryData.name}">
            {/if}
        </div>
        <div class="org-overview-cont">
            <div class="org-header">
                <h2>{entryData.name}</h2>
            </div>
            <p class="overview">
                {@html entryData.about}
            </p>
            <div class="org-link-cont">
                <div class="name">Learn more:</div>
                <div class="org-link" on:click|stopPropagation="{openOrgEntry}">
                    <i class="fas fa-external-link-alt"></i>
                </div>
            </div>
        </div>
    </div>

    <div class="msg">{isLast ? "" : "Scroll to continue..."}</div>
</div>

<style>
    .orgEntry {
        height: 81%;
        width: 80%;
        position: absolute;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .orgEntry .org-header {
        font-size: 27px;
    }
    .orgEntry .content-container {
        width: 100%;
        height: calc(100% - 87px);
        display: grid;
        grid-template-columns: minmax(600px, 3fr) minmax(400px, 2fr);
        column-gap: 14px;
        justify-items: center;
        align-items: center;
    }
    .orgEntry .content-container .imgs-cont {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .orgEntry .content-container .imgs-cont :global(img) {
        width: 100%;
        height: 70%;
        width: auto;
    }
    .orgEntry .content-container .org-overview-cont {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        height: 80%;
    }
    .orgEntry .content-container .org-overview-cont .overview {
        width: 100%;
        margin-top: 14px;
        font-size: 20px;
        text-align: center;
    }
    .orgEntry .content-container .org-overview-cont .org-link-cont {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .orgEntry .content-container .org-overview-cont .org-link-cont .name {
        height: 100%;
        margin-right: 7px;
        font-size: 20px;
    }
    .orgEntry .content-container .org-overview-cont .org-link-cont .org-link {
        padding-top: 3px;
        display: flex;
        flex-direction: row;
        align-items: center;
        color: var(--highlight);
        cursor: pointer;
        font-size: 14px;
    }
    .orgEntry .content-container .org-overview-cont .org-link-cont .org-link:hover {
        color: var(--highlight-hover);
    }
    .orgEntry .msg {
        margin-top: 56px;
        font-size: 24px;
    }
</style>