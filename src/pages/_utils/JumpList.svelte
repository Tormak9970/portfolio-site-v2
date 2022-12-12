<script lang="ts">
    import { orientation, lastOrientSelected } from "../../Stores";

	export let len: number;
    export let tooltips: Map<number, string>;
    export let handler:Function;
    export let scrollIdx:number;

    let selInd:SVGElement;

    $: {
        const elem = document.getElementById(`${scrollIdx}-jumpNav`);
        const wrapperDiv = elem?.parentNode;
        
        if (wrapperDiv && selInd) {
            const topPos = window.getComputedStyle(wrapperDiv as HTMLElement).top;
            const compPos = `${parseFloat(topPos.substring(0, topPos.length-2))+4}px`;

            const isSameElem:boolean = compPos == window.getComputedStyle(selInd).top;
            
            if (!isSameElem && $orientation == 0) {
                selInd.style.top = compPos;
            }
        }
    }

    function wrapper(e:MouseEvent) {
        const wrapperDiv:ParentNode = (<HTMLElement>e.currentTarget).parentNode;
        const topPos = window.getComputedStyle(wrapperDiv as HTMLElement).top;
        const compPos = `${parseFloat(topPos.substring(0, topPos.length-2))+4}px`;

        const isSameElem:boolean = compPos == window.getComputedStyle(selInd).top;
        
        if (!isSameElem && $orientation == 0) {
            selInd.style.top = compPos;
            handler(e);
        }
    }

    function setOrientation(e: Event) {
        const wrapperDiv:ParentNode = (<HTMLElement>e.currentTarget).parentNode;

        const newIdx = Array.from(wrapperDiv.parentNode.children).indexOf(<Element>wrapperDiv);
        const isSameIdx:boolean = newIdx == $lastOrientSelected;

        if (!isSameIdx) {
            $lastOrientSelected = newIdx;
            $orientation = newIdx;
        }
    }

    function updateOnResize(_:Event) {
        const elem = document.getElementById(`${scrollIdx}-jumpNav`);
        const wrapperDiv = elem?.parentNode;
        
        if (wrapperDiv && selInd) {
            const topPos = window.getComputedStyle(wrapperDiv as HTMLElement).top;
            const compPos = `${parseFloat(topPos.substring(0, topPos.length-2))+4}px`;
            
            if ($orientation == 0) {
                selInd.style.top = compPos;
            }
        }
    }
</script>

<svelte:window on:resize="{updateOnResize}" />

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
            <div class="calc-wrap">
                {#each Array(len) as _, i}
                    <div class="stop-wrapper" style="--init-top:{(len === 1 ? 0 : 96/(len-1)*i)+2}%;">
                        <a id="{i}-jumpNav" class="tooltip" on:click="{wrapper}">
                            <svg>
                                <circle class="track-stop" cx="4" cy="4" r="4"/>
                            </svg>
                            <span class="tooltip-text">{tooltips.get(i)}</span>
                        </a>
                    </div>
                {/each}
            </div>
            <svg class="sel-svg" bind:this="{selInd}">
                <circle class="sel-indicator" cx="4" cy="4" r="4"/>
            </svg>
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
    #jumpToCont .jump-nav-container .stop-wrapper { position: absolute; height: 16px; width: 16px; left:4px; top: calc(var(--init-top) - 8px); cursor:pointer; }
    #jumpToCont .jump-nav-container .stop-wrapper svg { height: 8px; width: 8px; }

    #jumpToCont .jump-nav-container svg .track { fill: var(--fore-accent); }
    #jumpToCont .jump-nav-container svg .track-stop { fill: var(--fore-accent-hover); }
    #jumpToCont .jump-nav-container .stop-wrapper:hover .track-stop { fill: var(--fore-accent-selected); }
    
    #jumpToCont .jump-nav-container .sel-svg {
        position: absolute;
        left: 8px;
        top: calc(2% - 4px);
        width: 8px;
        height: 8px;
        pointer-events: none;

        transition: top 0.7s ease-in-out;
    }
    #jumpToCont .jump-nav-container svg .sel-indicator { fill: var(--highlight); }

    #jumpToCont .jump-nav-container div a {
        width: 16px;
        height: 16px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        font-size: 16px;
    }
    #jumpToCont .jump-nav-container div .tooltip { position: relative; }
    #jumpToCont .jump-nav-container div .tooltip .tooltip-text {
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
    #jumpToCont .jump-nav-container div .tooltip .tooltip-text::after {
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
    #jumpToCont .jump-nav-container div .tooltip:hover .tooltip-text { visibility: visible; opacity: 1; }
</style>