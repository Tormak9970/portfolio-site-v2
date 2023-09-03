<script lang="ts">
	function navigateToUrl(url:string) {
        window.open(url, '_blank', 'noopener noreferrer');
    }
</script>

<div id="socials">
	<div class="socials-entr">
        <div on:click="{() => { navigateToUrl("https://github.com/Tormak9970"); }}" class="social-btn">
            <i class="fa fa-github-square"></i>
        </div>
    </div>
</div>

<style>
	#socials {
    z-index: 10;

    background-color: var(--foreground);

		display: flex;
		flex-direction: column;
    align-items: center;

    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    
    position: absolute;
    right: 0;
    top: 24%;

    box-shadow: #151515 1px 1px 10px 0px;
	}

    #socials > .socials-entr { margin: 4px; }
    #socials > .socials-entr > .social-btn {
        width: 40px;
        height: 40px;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        text-decoration: none;
    }
    #socials > .socials-entr > .social-btn > .fa-github-square {
        color: var(--highlight);
        font-size: 40px;
    }
    #socials > .socials-entr:hover { cursor: pointer; }
    #socials > .socials-entr:hover > .social-btn > .fa-github-square { color: var(--highlight-hover);  }
</style>