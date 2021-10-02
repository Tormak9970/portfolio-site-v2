<script lang="ts">
    import { imageModalData, showing } from "../../Stores";

    export let entryData:ConfigPiece;
    export let hidden:boolean;
    export let scrollType:string;
    export let isLast:boolean;

    interface ConfigPiece {
        name:string,
        path:string,
        description:string
    }

    function showModal(e: MouseEvent) {
        $imageModalData = { "id": "artPreviewModal", "data": { "path": entryData.path, "name": entryData.name } };
        setTimeout(() => { $showing = true; }, 30);
    }
</script>

<div id="{entryData.name}" class="artEntry{` ${scrollType}`}{hidden ? " hidden" : ""}">
    <div class="art-header">
        <h2>{entryData.name}</h2>
    </div>
    {#if entryData.path}
        <div class="content-container">
            <img src="{entryData.path}" alt="{entryData.name}" on:click="{showModal}">
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

<style lang="scss">
	$grey-primary: #252525;
	$grey-secondary: #383838;
	$bud-green: #82b74bff;
    $bud-green__hover: rgb(138, 194, 78);

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

        animation-fill-mode: both;
        animation-direction: alternate;
        animation-duration: 1.5s;

        .art-header { font-size: 27px; }
        .content-container {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
            column-gap: 14px;
            
            img { width: 100%; height: auto; margin-top: 14px; border-radius: 5px; cursor: pointer; }
            img:hover { opacity: 0.7; }
        }
        .description { width: 100%; margin-top: 14px; font-size: 24px; text-align: center; }
        .msg { margin-top: 56px; font-size: 24px; }
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