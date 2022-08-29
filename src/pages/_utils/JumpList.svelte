<script lang="ts">
    import { orientation } from "../../Stores";


	export let len: number;
    export let tooltips: Map<number, string>;
    export let handler:Function;
    export let scrollIdx:number;

    let lastSelected:number = -1;
    let lastOrientSelected = 0;

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

        if (!isSameIdx && $orientation == 0) { handler(e); }
    }

    function setOrientation(e: Event) {
        const wrapperDiv:ParentNode = (<HTMLElement>e.currentTarget).parentNode;

        const newIdx = Array.from(wrapperDiv.parentNode.children).indexOf(<Element>wrapperDiv);
        const isSameIdx:boolean = newIdx == lastOrientSelected;

        if (!isSameIdx) { lastOrientSelected = newIdx; $orientation = newIdx; }
    }
</script>

<div id="jumpToCont">
    <div class="layout-toggle">
        <div class="option">
            <a id="fancy" class="tooltip{$orientation == 0 ? ' selected' : ''}" on:click="{setOrientation}">
                <i class="fas fa-bars"></i>
                <span class="tooltip-text">Fancy</span>
            </a>
        </div>
        <div class="option">
            <a id="card" class="tooltip{$orientation == 1 ? ' selected' : ''}" on:click="{setOrientation}">
                <i class="fas fa-grip-horizontal"></i>
                <span class="tooltip-text">Card</span>
            </a>
        </div>
    </div>
    {#if $orientation == 0}
        <div class="jump-nav-container">
            <svg xmlns="http://www.w3.org/2000/svg">
                <rect class="track" x="10px" y="2%" width="4px" rx="3px" height="96%" />
            </svg>
            {#each Array(len) as _, i}
                <svg class="stop-wrapper" style="top:{((96/len+96/len/len)*i+2)}%;">
                    <circle class="track-stop" cx="4" cy="4" r="4"/>
                </svg>
            {/each}
            <!-- {#each Array(len) as _, i}
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
            {/each} -->
        </div>
    {/if}
</div>

<!-- svelte-ignore unused-css-style-selector -->
<style>
    @import "/theme.css";
    
    #jumpToCont {
        z-index: 2;
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        left: 0;
        top: 8%;
        bottom: 8%;
    }
    #jumpToCont .layout-toggle {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: var(--foreground);
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        background-color: var(--foreground);
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        margin-bottom: 21px;
        box-shadow: #151515 1px 1px 10px 0px;
    }
    #jumpToCont .layout-toggle .option { margin: 1px 2px; cursor: pointer; }
    #jumpToCont .layout-toggle .option .selected { color: var(--highlight); fill: var(--highlight); }
    #jumpToCont .layout-toggle .option a {
        width: 20px;
        height: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        font-size: 16px;
    }
    #jumpToCont .layout-toggle .option a i { width: 16px; height: 16px; }
    #jumpToCont .layout-toggle .option a:hover { color: var(--highlight-hover); }
    #jumpToCont .layout-toggle .option .tooltip { position: relative; }
    #jumpToCont .layout-toggle .option .tooltip .tooltip-text {
        white-space: nowrap;
        visibility: hidden;
        background-color: var(--foreground-hover);
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
    }
    #jumpToCont .layout-toggle .option .tooltip .tooltip-text::after {
        content: " ";
        position: absolute;
        top: 50%;
        right: 100%;
        /* To the left of the tooltip */
        margin-top: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: transparent var(--foreground-hover) transparent transparent;
    }
    #jumpToCont .layout-toggle .option .tooltip:hover .tooltip-text { visibility: visible; opacity: 1; }
    #jumpToCont .layout-toggle :first-child { margin-top: 2px; }
    #jumpToCont .layout-toggle :last-child { margin-bottom: 2px; }
    #jumpToCont .jump-nav-container {
        display: flex;
        flex-direction: column;
        align-items: center;

        background-color: var(--foreground);
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        box-shadow: #151515 1px 1px 10px 0px;

        position: relative;
        height: calc(100% - 54px);
    }

    #jumpToCont .jump-nav-container svg { height: 100%; width: 24px; }
    #jumpToCont .jump-nav-container .stop-wrapper { position: absolute; height: 16px; width: 16px; left:8px; cursor:pointer; }
    #jumpToCont .jump-nav-container svg .track { fill: var(--fore-accent); }
    #jumpToCont .jump-nav-container svg .track-stop { fill: var(--fore-accent-hover); }
    #jumpToCont .jump-nav-container svg:hover .track-stop { fill: var(--fore-accent-selected); }
</style>