<script lang="ts">
	
</script>

<div id="aboutSection">
	<h2 class="about-header">About</h2>
    <div class="about-container">
        <div class="color-tester" style="background-color: rgb(138, 194, 78);"></div>
		<div class="color-tester" style="background-color: #82b74bff;"></div>
		<div class="color-tester" style="background-color: #405d27ff;"></div>
		<div class="color-tester" style="background-color: #32481eff;"></div>
    </div>
</div>

<style lang="scss">
	$grey-primary: #252525;
	$grey-secondary: #383838;
	$bud-green: #82b74bff;
    $bud-green__hover: rgb(138, 194, 78);
    $dark-moss-green: #405d27ff;
    $army-green: #32481eff;

	#aboutSection {
		width: 85%;
        max-width: 600px;
		height: 30%;
        min-height: 265px;

		display: flex;
		flex-direction: column;
        align-items: center;

        background-color: $grey-secondary;

        border-radius: 8px;

        box-shadow: #151515 1px 1px 10px 0px;

        margin-left: 20px;
	}

    .about-header {
        margin: 7px;

        padding: 0;

        font-size: 1.45em;

        align-self: flex-start;
    }
    .about-container {
        height: calc(100% - 49px);
        width: calc(100% - 20px);

        display: flex;
        flex-direction: column;
        align-items: center;

    }

    .color-tester {
        width: 50px;
        height: 50px;
    }
</style>