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
    <div class="org-header">
        <h2>{entryData.name}</h2>
    </div>
    {#if entryData.img}
        <div class="content-container" bind:this="{contentCont}">
            {#if !image}
                <img src="{entryData.img}" alt="{entryData.name}">
            {/if}
            <div class="description">
                <div class="org-header-2">
                    <h2>About</h2>
                </div>
                <p>{@html entryData.about}</p>
                <div class="org-header-2">
                    <h2>Involvement</h2>
                </div>
                <p>{@html entryData.description}</p>
            </div>
            <div class="projects">
                <div class="org-header-2">
                    <h2>Projects</h2>
                </div>
                <ul>
                    {#each entryData.projects as proj}
                        <li>
                            <div class="proj-entr">
                                <div class="name">{proj.name}</div>
                                <div class="proj-link" on:click|stopPropagation="{() => { linkToProj(proj.linkId); }}">
                                    <i class="fas fa-link"></i>
                                </div>
                            </div>
                        </li>
                    {/each }
                </ul>
            </div>
        </div>
    {:else}
        <div class="description">
            <p>{@html entryData.description}</p>
        </div>
    {/if}

    <div class="msg">{isLast ? "" : "Scroll to continue..."}</div>
</div>

<style>
    .orgEntry {
        width: 100%;

        position: absolute;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .orgEntry .org-header { font-size: 27px; }
    .orgEntry .org-header-2 { text-align: center; }
        
    .orgEntry .content-container {
        width: 100%;
        display: grid;
        grid-template-columns: minmax(400px, 1fr) minmax(400px, 2fr) minmax(200px, 1fr);
        column-gap: 14px;
        justify-items: center;
        align-items: center;
    }
    .orgEntry .content-container :global(img) { width: 80%; height: auto; margin-top: 14px; }
        
    .orgEntry .description { width: 100%; margin-top: 14px; font-size: 20px; text-align: center; }
    .orgEntry .msg { margin-top: 56px; font-size: 24px; }
    .projects {
        margin-top: 14px;
        width: 100%;
        height: 100%;
        font-size: 20px;
    }
    .projects ul {
        width: 100%;

        margin-top: 0px;
        margin-bottom: 0px;
    }
    .projects ul li { width: 100%; }
    .projects ul li .proj-entr {
        height: 100%;

        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .projects ul li .proj-entr .name { margin-right: 7px; }

    .projects ul li .proj-entr .proj-link {
        height: 100%;

        display: flex;
        flex-direction: row;
        align-items: center;

        color: var(--highlight);

        cursor: pointer;
        font-size: 14px;
    }
    .projects ul li .proj-entr .proj-link :hover { color: var(--highlight-hover); }
</style>