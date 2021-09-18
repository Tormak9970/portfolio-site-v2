<script lang="ts">
	
</script>

<div id="featured">
	<div class="container">
        <div class="img-container">
            
        </div>
    </div>
    <div class="container">
        <p class="info">
            
        </p>
    </div>
</div>

<style lang="scss">
	$grey-primary: #252525;
	$grey-secondary: #383838;
	$bud-green: #82b74bff;
    $bud-green__hover: rgb(138, 194, 78);
    $dark-moss-green: #405d27ff;
    $army-green: #32481eff;

	#featured {
		width: 80%;
		height: 80%;

		display: flex;
		flex-direction: row;
        align-items: center;

        animation-name: fade-in;
        animation-fill-mode: both;
        animation-duration: 1.5s;

        .container {
            width: 50%;
            height: 100%;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .info {
                font-size: 30px;
            }
        }
	}

    @keyframes fade-in {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
</style>