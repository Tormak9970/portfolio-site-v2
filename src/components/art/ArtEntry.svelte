<script lang="ts">

    interface ConfigPiece {
        name:string,
        path:string,
        description:string
    }

	export let entryData:ConfigPiece;
	export let hidden:boolean;
    export let scrollType:string;
</script>

<div id="{entryData.name}" class="artEntry{` ${scrollType}`}{hidden ? " hidden" : ""}">
    <div class="art-header">
        <h2>{entryData.name}</h2>
    </div>
	{#if entryData.path}
        <img src="{entryData.path}" alt="{entryData.name}">
    {/if}
    <div class="description">
        <p>{entryData.description}</p>
    </div>

    <div class="msg">Scroll to continue...</div>
</div>

<style lang="scss">
	$grey-primary: #252525;
	$grey-secondary: #383838;
	$bud-green: #82b74bff;
    $bud-green__hover: rgb(138, 194, 78);
    $dark-moss-green: #405d27ff;
    $army-green: #32481eff;

    .artEntry {
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

        .art-header { font-size: 27px; }

        img {
            width: 100%;
            height: auto;

            margin-top: 14px;
        }

        .description {
            width: 100%;

            margin-top: 14px;
            
            font-size: 24px;
            text-align: center;
        }
        .msg {
            margin-top: 56px;
            font-size: 24px;
        }
    }

    .down-in { animation-name: down-fade-in; }
    .up-in { animation-name: up-fade-in; }
    .down-out { animation-name: down-fade-out; }
    .up-out { animation-name: up-fade-out; }

    .hidden {
        display: none;
    }

    @keyframes down-fade-in { // working
        0% { opacity: 0; transform: translate(-50%, 50%); }
        100% { opacity: 1; transform: translate(-50%, -50%); }
    }
    @keyframes down-fade-out {
        0% { opacity: 1; transform: translate(-50%, -50%); }
        100% { opacity: 0; transform: translate(-50%, -150%); }
    }

    @keyframes up-fade-in {
        0% { opacity: 0; transform: translate(-50%, -150%); }
        100% { opacity: 1; transform: translate(-50%, -50%); }
    }
    @keyframes up-fade-out {
        0% { opacity: 1; transform: translate(-50%, -50%); }
        100% { opacity: 0; transform: translate(-50%, 50%); }
    }
</style>