<script lang="ts">
    export let entryData:Experience;
    export let hidden:boolean;
    export let scrollType:string;
    export let isLast:boolean;
</script>

<div id="{entryData.name}" class="experienceEntry{` ${scrollType}`}{hidden ? " hidden" : ""}">
    <div class="experience-header">
        <h2>{entryData.name}</h2>
    </div>
    {#if entryData.img}
        <div class="content-container">
            <div class="img-cont">
                <img src="{entryData.img}" alt="{entryData.name}">
            </div>
            <div>
                <div class="description">
                    <div>Position: {entryData.position}</div>
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

<style lang="scss">
	$grey-primary: #252525;
	$grey-secondary: #383838;
	$bud-green: #82b74bff;
    $bud-green__hover: rgb(138, 194, 78);

    .experienceEntry {
        width: 64%;

        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        display: flex;
        flex-direction: column;
        justify-content: flex-stexperience;
        align-items: center;

        animation-fill-mode: both;
        animation-direction: alternate;
        animation-duration: 1.5s;

        .experience-header { font-size: 27px; }
        .description { width: 100%; margin-top: 14px; font-size: 24px; text-align: center; }
        .content-container {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
            column-gap: 14px;
            
            .img-cont {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                img { max-width: 100%; height: auto; margin-top: 14px; }
            }
        }
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