<script lang="ts">
	
</script>

<div id="infoSection">
	<h2 class="info-header">Information</h2>
    <div class="info-container">
        <div class="info-left">

        </div>
        <div class="info-right">

        </div>
    </div>
</div>

<style lang="scss">
	$grey-primary: #252525;
	$grey-secondary: #383838;
	$bud-green: #82b74bff;
    $bud-green__hover: rgb(138, 194, 78);
    $dark-moss-green: #405d27ff;
    $army-green: #32481eff;

	#infoSection {
		width: 100%;
        max-width: 400px;
		height: 30%;
        min-height: 315px;

		display: flex;
		flex-direction: column;
        align-items: center;

        background-color: $grey-secondary;

        border-radius: 8px;

        box-shadow: #151515 1px 1px 10px 0px;
	}

    .info-header {
        margin: 7px;

        padding: 0;

        font-size: 1.45em;

        align-self: flex-start;
    }
    .info-container {
        height: calc(100% - 49px);
        width: calc(100% - 20px);

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

    }

    .info-container > div {
        width: calc(50% - 5px);
        height: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>