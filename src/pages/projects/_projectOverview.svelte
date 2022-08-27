<script lang="ts">
    import { goto } from '@roxi/routify';
    import { organizations } from "../../linkConfig";

    export let entryData:Project;
    export let hidden:boolean;
    export let scrollType:string;
    export let isLast:boolean;

    function openProjectEntry() {
        $goto(`./:project`, {project: entryData.name.toLowerCase().replaceAll(" ", "-").replaceAll("'", "")});
    }
</script>

<div class="projOview{` ${scrollType}`}{hidden ? " hidden" : ""}">
    <div class="content-container">
        <div class="imgs-cont">
            <img src="{(entryData.org != "none") ? organizations.get(entryData.org).img : "./img/orgs/Logo-black-round.png"}" class="{(entryData.org != "none") ? "" : "round"}" alt="">
            <div class="proj-main-img">
                <img src="{entryData.img}" alt="">
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
    .projOview {
        height: 81%;
        width: 80%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        animation-fill-mode: both;
        animation-direction: alternate;
        animation-duration: 1.5s;
    }
    .projOview .proj-header {
        font-size: 27px;
    }
    .projOview .content-container {
        width: 100%;
        height: calc(100% - 87px);
        display: grid;
        grid-template-columns: minmax(600px, 3fr) minmax(400px, 2fr);
        column-gap: 14px;
        justify-items: center;
        align-items: center;
    }
    .projOview .content-container .imgs-cont {
        width: 100%;
        height: 100%;
        position: relative;
    }
    .projOview .content-container .imgs-cont :nth-child(1) {
        position: absolute;
        top: 0;
        left: 0;
        width: 200px;
        height: auto;
    }
    .projOview .content-container .imgs-cont .proj-main-img {
        position: absolute;
        top: 100px;
        left: 120px;
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
    }
    .projOview .content-container .imgs-cont .proj-main-img img {
        position: static;
        width: 100%;
        height: auto;
        border-radius: 8px;
    }
    .projOview .content-container .imgs-cont .round {
        border-radius: 50%;
    }
    .projOview .content-container .proj-overview-cont {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }
    .projOview .content-container .proj-overview-cont .overview {
        width: 100%;
        margin-top: 14px;
        font-size: 20px;
        text-align: center;
    }
    .projOview .content-container .proj-overview-cont .proj-link-cont {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .projOview .content-container .proj-overview-cont .proj-link-cont .name {
        height: 100%;
        margin-right: 7px;
        font-size: 20px;
    }
    .projOview .content-container .proj-overview-cont .proj-link-cont .proj-link {
        padding-top: 3px;
        display: flex;
        flex-direction: row;
        align-items: center;
        color: var(--highlight);
        cursor: pointer;
        font-size: 14px;
    }
    .projOview .content-container .proj-overview-cont .proj-link-cont .proj-link:hover {
        color: var(--highlight-hover);
    }
    .projOview .msg {
        margin-top: 56px;
        font-size: 24px;
    }


    .down-in { animation-name: down-fade-in; }
    .up-in { animation-name: up-fade-in; }
    .down-out { animation-name: down-fade-out; }
    .up-out { animation-name: up-fade-out; }

    .hidden { display: none; }

    @keyframes down-fade-in { 0% { opacity: 0; transform: translate(-50%, 50%); } 100% { opacity: 1; transform: translate(-50%, -50%); } }
    @keyframes down-fade-out { 0% { opacity: 1; transform: translate(-50%, -50%); } 100% { opacity: 0; transform: translate(-50%, -150%); } }

    @keyframes up-fade-in { 0% { opacity: 0; transform: translate(-50%, -150%); } 100% { opacity: 1; transform: translate(-50%, -50%); } }
    @keyframes up-fade-out { 0% { opacity: 1; transform: translate(-50%, -50%); } 100% { opacity: 0; transform: translate(-50%, 50%); } }
</style>