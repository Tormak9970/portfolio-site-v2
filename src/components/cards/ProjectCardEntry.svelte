<script lang="ts">
    import { goto } from '@roxi/routify';

    export let entryData:Project;

    function openProjectEntry() {
        $goto(`./:project`, {project: entryData.name.toLowerCase().replaceAll(" ", "-").replaceAll("'", "")});
    }
</script>

<div class="card-entr">
    <div class="name-cont">
        {entryData.name}
    </div>
    <div class="img-cont">
        <img src="{entryData.image}" alt="">
    </div>
    <div class="desc-cont">
        {@html entryData.description}
    </div>
    <div class="link-cont">
        <div class="name">Learn more:</div>
        <div class="proj-link" on:click|stopPropagation="{openProjectEntry}">
            <i class="fas fa-external-link-alt"></i>
        </div>
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
        border-radius: 4px;

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

    .link-cont {
        height: 100%;
        width: 100%;

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        margin-bottom: 5px;
    }
    .link-cont > .name {
        height: 100%;
        
        margin-right: 7px;
        font-size: 20px;
    }

    .link-cont > .proj-link {
        padding-top: 3px;
    
        display: flex;
        flex-direction: row;
        align-items: center;

        color: var(--highlight);

        cursor: pointer;
        font-size: 14px;
    }
    .link-cont:hover {
        color: var(--highlight-hover);
    }
</style>