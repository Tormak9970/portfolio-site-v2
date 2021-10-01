<script lang="ts">
	export let len: number;
    export let handler:Function;

    function wrapper(e: MouseEvent) {
        handler(e);
    }
</script>

<div id="jumpToCont">
    {#each Array(len) as _, i}
        <div>
            <a id="{i}-jumpNav" on:click="{wrapper}">{i+1}</a>
        </div>
    {/each}
</div>

<!-- svelte-ignore unused-css-style-selector -->
<style lang="scss">
	$grey-primary: #252525;
	$grey-secondary: #383838;
	$bud-green: #82b74bff;
    $bud-green__hover: rgb(138, 194, 78);

    #jumpToCont {
        z-index: 2;

        position: absolute;

        display: flex;
        flex-direction: column;
        align-items: center;

        background-color: $grey-secondary;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;

        left: 0;
        top: 8%;

        
        box-shadow: #151515 1px 1px 10px 0px;

        div {
            margin: 2px 4px;
            cursor: pointer;

            a {
                width: 20px;
                height: 20px;

                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                text-decoration: none;

                font-size: 20px;
            }
        }

        :first-child {
            margin-top: 4px;
        }

        :last-child {
            margin-bottom: 4px;
        }
    }
</style>