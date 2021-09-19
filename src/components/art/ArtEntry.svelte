<script lang="ts">

	export let entryData:Object;
	export let hidden:boolean;
</script>

<div id="{entryData.name}" class="artEntry{hidden ? " hidden" : ""}">
	<img src="{entryData.path}" alt="{entryData.name}">
    <div class="title">
        <label for="" class="piece-name"><b>Title:</b> {entryData.name}</label>
    </div>
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
        width: 60%;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        animation-name: entr-fade-in;
        animation-fill-mode: both;
        animation-direction: alternate;
        animation-duration: 0.7s;

        img {
            width: 100%;
            height: auto;
        }

        .title {
            margin-top: 14px;
        }

        .description {
            margin-top: 14px;
        }
        .msg {
            margin-top: 56px;
            font-size: 24px;
        }
    }

    .hidden {
        display: none;
    }

    @keyframes entr-fade-in {
        0% { opacity: 0; transform: translateY(10%); }
        100% { opacity: 1; transform: translateY(0%); }
    }
</style>