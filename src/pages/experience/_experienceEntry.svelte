<script lang="ts">
    import { beforeUpdate } from "svelte";
    import { fly, FlyParams } from "svelte/transition";

    import { scrollDir, allowScroll } from "../../Stores";
    import { getTransitions } from "../../utils";

    export let entryData:Experience;
    export let isLast:boolean;

    let inParams: FlyParams;
    let outParams: FlyParams;

    function handleTransEnd(): void { $allowScroll = true; }

    beforeUpdate(() => {
        const transition = getTransitions($scrollDir);
        inParams = transition.in;
        outParams = transition.out;
    });
</script>

<div id="{entryData.company.toLocaleLowerCase().concat("-").concat(entryData.position.toLocaleLowerCase()).replaceAll(" ", "-")}" class="experienceEntry" in:fly={inParams} out:fly={outParams} on:introend="{handleTransEnd}">
    <div class="experience-header">
        <h2>{entryData.position}</h2>
    </div>
    {#if entryData.img}
        <div class="content-container">
            <div class="img-cont">
                <img src="{entryData.img}" alt="{entryData.position}">
            </div>
            <div>
                <div class="description">
                    <div>Company: {entryData.company}</div>
                </div>
                <div class="description">
                    <p>{entryData.description}</p>
                </div>
            </div>
        </div>
    {:else}
        <div>
            <div class="description">
                <div>Position: {entryData.position}</div>
            </div>
            <div class="description">
                <p>{entryData.description}</p>
            </div>
        </div>
    {/if}

    <div class="msg">{isLast ? "To be continued..." : "Scroll to continue..."}</div>
</div>

<style>
    .experienceEntry {
        width: 64%;

        position: absolute;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }

    .experienceEntry .experience-header { font-size: 27px; }
    .experienceEntry .description { width: 100%; margin-top: 14px; font-size: 24px; text-align: center; }
    .experienceEntry .content-container {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
        column-gap: 14px;
    }
    .experienceEntry > .content-container > .img-cont {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .experienceEntry > .content-container > .img-cont > img { max-width: 100%; height: auto; margin-top: 14px; }
    .experienceEntry > .msg { margin-top: 56px; font-size: 24px; }
</style>