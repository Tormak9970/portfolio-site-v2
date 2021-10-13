<script lang="ts">
	
</script>

<div id="aboutSection">
	<div class="container">
        <div class="img-container">
            <!-- svelte-ignore a11y-img-redundant-alt -->
            <img src="img/profile pic temp.png" alt="temporary profile picture">
        </div>
    </div>
    <div class="container">
        <p class="bio">
            I am an aspiring software engineer and game developer. I enjoy learning new concepts through 
            self guided projects, and sharing my knowledge with others. Additionally, I am one of the SWTOR Slicers collaborators, 
            develop new datamining and extraction tools for Star Wars The Old Republic, and do community development for 
            TORCommunity.com. My interest in programming started in highschool, and I have continued to expand my knowledge 
            and skills since. Along side being a developer, I also like to make art in my free time. I enjoy mixing my two 
            passions in a fusion of technology and art.
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

	#aboutSection {
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

            .bio {
                font-size: 24px;
            }

            img {
                border-radius: 50%;
            }
        }
	}

    @keyframes fade-in {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
</style>