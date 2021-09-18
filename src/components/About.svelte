<script lang="ts">
	
</script>

<div id="aboutSection">
	<div class="container">
        <div class="img-container">
            <img src="img/profile pic temp.png" alt="temporary profile picture">
        </div>
    </div>
    <div class="container">
        <p class="bio">
            I am an aspiring software engineer and game developer. I enjoy learning new concepts through 
            self guided projects, and sharing my knowledge with others. I am one of SWTOR Slicers collaborators, and 
            develop new datamining and extraction tools for Star Wars The Old Republic, and do community development for 
            TORCommunity.com. I got interested in programming in highschool, and I have continued to expand my knowledge 
            and skills since. Along side being a developer, I also like to make art in my free time. I enjoy mixing my two 
            passions in a fusion of technology and art.
        </p>
    </div>
    <!-- <div class="about-container">
        <div class="color-tester" style="background-color: rgb(138, 194, 78);"></div>
		<div class="color-tester" style="background-color: #82b74bff;"></div>
		<div class="color-tester" style="background-color: #405d27ff;"></div>
		<div class="color-tester" style="background-color: #32481eff;"></div>
    </div> -->
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

        .container {
            width: 50%;
            height: 100%;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .bio {
                font-size: 30px;
            }

            img {
                border-radius: 50%;
            }
        }
	}
</style>