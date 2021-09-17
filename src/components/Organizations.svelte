<script lang="ts">
	
</script>

<div id="organizations">
	<h2 class="organizations-header">Organizations</h2>
    <div class="organizations-container">
        
    </div>
</div>

<style lang="scss">
	$grey-primary: #252525;
	$grey-secondary: #383838;
	$bud-green: #82b74bff;
    $bud-green__hover: rgb(138, 194, 78);
    $dark-moss-green: #405d27ff;
    $army-green: #32481eff;

	#organizations {
		width: 100%;
        max-width: 500px;
		height: 40%;
        min-height: 385px;

		display: flex;
		flex-direction: column;
        align-items: center;

        background-color: $grey-secondary;

        border-radius: 8px;

        box-shadow: #151515 1px 1px 10px 0px;
	}

    .organizations-header {
        margin: 7px;

        padding: 0;

        font-size: 1.45em;

        align-self: flex-start;
    }
    .organizations-container {
        height: calc(100% - 49px);
        width: calc(100% - 20px);

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

    }
</style>