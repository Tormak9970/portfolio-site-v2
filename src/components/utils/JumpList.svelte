<script lang="ts">
	export let len: number;
    export let tooltips: Map<number, string>;
    export let handler:Function;
    export let scrollIdx:number;

    let lastSelected:number = -1;
    function setLast(i:number) {
        if (lastSelected != i) {
            lastSelected = i;
            return 'selected';
        } else {
            return '';
        }
    };

    function wrapper(e:MouseEvent) {
        const wrapperDiv:ParentNode = (<HTMLElement>e.currentTarget).parentNode;

        const newIdx = Array.from(wrapperDiv.parentNode.children).indexOf(<Element>wrapperDiv);
        const isSameIdx:boolean = newIdx == lastSelected;

        if (!isSameIdx) {
            handler(e);
            console.log(tooltips.get(newIdx));
        }
    }
</script>

<div id="jumpToCont">
    {#each Array(len) as _, i}
        <div>
            <a id="{i}-jumpNav" class="tooltip {i == scrollIdx ? setLast(i) : ''}" on:click="{wrapper}">
                {#if i == scrollIdx}
                    <i class="fas fa-circle"></i>
                {:else}
                    <i class="far fa-circle"></i>
                {/if}
                <span class="tooltip-text">{tooltips.get(i)}</span>
            </a>
        </div>
    {/each}
</div>

<!-- svelte-ignore unused-css-style-selector -->
<style lang="scss">
	$grey-primary: #252525;
	$grey-secondary: #383838;
	$bud-green: #82b74bff;
    $bud-green__hover: rgb(138, 194, 78);
    $tooltip-color: rgb(71, 71, 71);

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
            margin: 1px 2px;
            cursor: pointer;

            .selected {
                color: $bud-green;
            }

            a {
                width: 20px;
                height: 20px;

                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                text-decoration: none;

                font-size: 16px;

                i {
                    width: 16px;
                    height: 16px;
                }

                &:hover { color: $bud-green__hover; }
            }
            .tooltip {
                position: relative;

                .tooltip-text {
                    white-space: nowrap;
                    visibility: hidden;
                    background-color: $tooltip-color;
                    color: #fff;
                    text-align: center;
                    padding: 2px 6px;
                    border-radius: 6px;

                    /* Position the tooltip text */
                    position: absolute;
                    z-index: 1;
                    top: -2px;
                    left: 105%;
                    margin-left: 5px;

                    /* Fade in tooltip */
                    opacity: 0;
                    transition: opacity 0.3s;
                    
                    &::after {
                        content: " ";
                        position: absolute;
                        top: 50%;
                        right: 100%; /* To the left of the tooltip */
                        margin-top: -5px;
                        border-width: 5px;
                        border-style: solid;
                        border-color: transparent $tooltip-color transparent transparent;
                    }
                }

                &:hover { .tooltip-text { visibility: visible; opacity: 1; } }
            }
        }

        :first-child { margin-top: 2px; }
        :last-child { margin-bottom: 2px; }
    }
</style>