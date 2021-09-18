<script lang="ts">

	export let entryData:Object;
</script>

<div id="{entryData.name}" class="artEntry">
	<img src="{entryData.path}" alt="{entryData.name}">
    <div class="title">
        <label for="" class="piece-name"><b>Title:</b> {entryData.name}</label>
    </div>
    <div class="description">
        <p>{entryData.description}</p>
    </div>
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
    }
</style>