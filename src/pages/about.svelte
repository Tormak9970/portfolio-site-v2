<script lang="ts">
    import { fade } from "svelte/transition";
	import MediaQuery from "./_utils/MediaQuery.svelte";
</script>

<MediaQuery query="(orientation:landscape)" let:matches>
    {#if matches}
        <div id="aboutSection" class="landscape" in:fade>
            <div class="container">
                <div class="img-container">
                    <!-- svelte-ignore a11y-img-redundant-alt -->
                    <img src="img/logo.svg" width="384" height="384" alt="temporary profile picture">
                </div>
            </div>
            <div class="container">
                <p class="bio">
                    Hi, my name is Travis<br/><br/>
                        I am a web developer and software engineer. I enjoy learning new concepts through 
                    self guided projects, and sharing my knowledge with others. Currently I am attending 
                    <a href="https://vt.edu/" rel="noopenner norefferer" target="_blank">Virginia Polytechnic Institute and State University</a>, pursuing an education in 
                    Computer Science.
                    <br/>
                        My interest in Computer Science started in highschool, and I have continued to expand my knowledge 
                    and skills since. I believe that CS is both a powerful tool for solving problems, as well as an inspiring 
                    outlet for creative expression. After all, the best solutions to any problem are inspiring.
                    <br/>
                        Along side being a developer, I also like to make art in my free time. I enjoy mixing my two 
                    passions in a fusion of technology and art.
                </p>
            </div>
        </div>
    {:else}
        <div id="aboutSection" class="mobile" in:fade>
            <div class="container">
                <div class="img-container">
                    <!-- svelte-ignore a11y-img-redundant-alt -->
                    <img src="img/icons/maskable_icon_x192.webp" width="192" height="192" alt="temporary profile picture">
                </div>
            </div>
            <div class="bio-cont">
                <p class="bio">
                    Hi, my name is Travis<br/><br/>
                        I am a web developer and software engineer. I enjoy learning new concepts through 
                    self guided projects, and sharing my knowledge with others. Currently I am attending 
                    <a href="https://vt.edu/" rel="noopenner norefferer" target="_blank">Virginia Polytechnic Institute and State University</a>, pursuing an education in 
                    Computer Science.
                    <br/>
                        My interest in Computer Science started in highschool, and I have continued to expand my knowledge 
                    and skills since. I believe that CS is both a powerful tool for solving problems, as well as an inspiring 
                    outlet for creative expression. After all, the best solutions to any problem are inspiring.
                    <br/>
                        Along side being a developer, I also like to make art in my free time. I enjoy mixing my two 
                    passions in a fusion of technology and art.
                </p>
            </div>
        </div>
    {/if}
</MediaQuery>

<style lang="scss">
	$grey-primary: #252525;
	$grey-secondary: #383838;
	$bud-green: #82b74bff;
    $bud-green__hover: rgb(138, 194, 78);
    $dark-moss-green: #405d27ff;
    $army-green: #32481eff;

	.landscape {
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
                font-size: 24px;

                a {
                    color: rgb(0, 187, 255);

                    text-decoration: none;

                    &:focus {
                        color: rgb(0, 94, 255);

                        text-decoration: none;
                    }
                }
            }

            img {
                // border-radius: 50%; // will add back once I have a non placeholder img
            }
        }
	}

    .mobile {
        width: 100%;
		height: 80%;

		display: flex;
		flex-direction: column;
        align-items: center;

        .container {
            width: 50%;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            img {
                // border-radius: 50%; // will add back once I have a non placeholder img
                width: 100%;
            }
        }

        .bio-cont {
            width: 80%;
            text-align: center;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .bio {
                font-size: 18px;

                a {
                    color: rgb(0, 187, 255);

                    text-decoration: none;

                    &:focus {
                        color: rgb(0, 94, 255);

                        text-decoration: none;
                    }
                }
            }
        }
    }
</style>