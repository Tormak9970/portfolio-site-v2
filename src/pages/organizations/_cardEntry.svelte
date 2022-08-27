<script lang="ts">
    import { goto } from "@roxi/routify";
    import { jumpTo } from "../projects/index.svelte";

    export let entryData:Organization;

    function linkToProj(id:string) { $goto('../projects'); setTimeout(() => { jumpTo(id); }, 10); }
</script>

<div class="card-entr">
    <div class="name-cont">
        {entryData.name}
    </div>
    <div class="img-cont">
        <img src="{entryData.img}" alt="">
    </div>
    <div class="header-cont">About</div>
    <div class="desc-cont">
        {@html entryData.about}
    </div>
    <div class="header-cont">Involvement</div>
    <div class="desc-cont">
        {@html entryData.description}
    </div>
    <div class="header-cont">Projects</div>
    <div class="projects">
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

<style>
    @import "/theme.css";

    .card-entr {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        width: 90%;
        max-width: 330px;
        height: fit-content;

        background-color: var(--foreground);

        margin: 14px;
    }

    .name-cont {
        width: 90%;

        text-align: center;

        font-size: 20px;

        margin-bottom: 7px;
    }

    .img-cont {
        width: 90%;

        margin-bottom: 7px;
    }

    .img-cont > img { width: 100%; }

    .desc-cont {
        width: 90%;

        text-align: center;

        font-size: 16px;

        margin-bottom: 5px;
    }

    .projects {
        width: 90%;
        font-size: 16px;
        
        margin-bottom: 5px;
    }
    .projects ul {
        width: 100%;

        margin-top: 0px;
        margin-bottom: 0px;
    }
    .projects ul li .proj-entr {
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