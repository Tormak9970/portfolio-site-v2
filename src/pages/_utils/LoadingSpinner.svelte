<script lang="ts">
    import {fade} from 'svelte/transition';
    
    export let width=100;
    export let height=100;
</script>

<div class="loading-spinner-cont" transition:fade>
    <div style="top: 48%;">Loading</div>
    <svg width="{width}" height="{height}" viewBox="0 0 100 100" >
        <g id="layer1">
            <circle
                style="fill:none;fill-opacity:1;stroke:#315808c8;stroke-width:4;stroke-linecap:round;stroke-linejoin:round"
                id="path37"
                cx="50"
                cy="50"
                r="46" />
            <path 
                class="path"
                style="fill:none;fill-opacity:1;stroke:#82b74b;stroke-width:4;stroke-linecap:round;stroke-linejoin:round;"
                d="M 50 4 a 46,46 0 1,1 0,92 a 46,46 0 1,1 0,-92"
                pathLength="100" />
        </g>
    </svg>
</div>

<style>
    .loading-spinner-cont {
        position: relative;
        height: 100px;
    }
    .loading-spinner-cont > * {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .loading-spinner-cont > .path { animation: dash 3s linear infinite; }

    @keyframes dash {
        0% { stroke-dashoffset: 0%; stroke-dasharray: 0% 100%; }
        14% { stroke-dasharray: 22% 78%; stroke-dashoffset: 0%; }
        32% { stroke-dashoffset: -44.5%; }
        50% { stroke-dashoffset: -89; }
        68% { stroke-dashoffset: -133.5%; }
        86% { stroke-dasharray: 22% 78%; stroke-dashoffset: -178%; }
        100% { stroke-dasharray: 0% 100%; stroke-dashoffset: -200%; }
    }
</style>