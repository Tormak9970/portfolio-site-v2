<script lang="ts">
	
</script>

<div id="socials">
	<div class="socials-entr">
        <a href="https://github.com/Tormak9970" target="_blank" rel="noopener noreferrer" class="social-btn">
            <i class="fa fa-github-square"></i>
        </a>
    </div>
</div>

<style lang="scss">
	$grey-primary: #252525;
	$grey-secondary: #383838;
	$bud-green: #82b74bff;
    $bud-green__hover: rgb(138, 194, 78);
    $dark-moss-green: #405d27ff;
    $army-green: #32481eff;

	#socials {

        background-color: $grey-secondary;

		display: flex;
		flex-direction: column;
        align-items: center;

        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
        
        position: absolute;
        right: 0;
        top: 24%;

        box-shadow: #151515 1px 1px 10px 0px;

        .socials-entr {
            margin: 4px;

            .social-btn {
                width: 40px;
                height: 40px;

                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                text-decoration: none;
            }

            .fa-github-square {
                color: $bud-green;
                font-size: 40px;
            }
        }
        .socials-entr:hover {
            .fa-github-square {
                color: $bud-green__hover;
            }
        }
	}
</style>