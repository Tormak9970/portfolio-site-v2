<script lang="ts">
    import { showing } from "../../Stores";


    type Dims = {
        h: string;
        w: string;
    }

    interface ConfigPiece {
        name:string,
        path:string
    }

    interface Config {
        id: string;
        data: ConfigPiece;
        maxes: Dims;
    }

    export let config: Config;

    function closeSelf(e: MouseEvent) {
        $showing.set(false);
    }
    function catchScroll(e: WheelEvent) {}
</script>

<div id={config.id} class="modal-container {$showing ? '' : 'hidden'}" on:wheel|stopPropagation="{catchScroll}">
    <div class="modal">
        <span class="close" on:click="{closeSelf}">&times;</span>
        <img src="{config.data.path}" alt="{config.data.name}" style="{config.maxes.h ? `max-height: ${config.maxes.h};` : ''}{config.maxes.w ? ` max-width: ${config.maxes.w};` : ''}"/>
    </div>
</div>

<style lang="scss">
    $grey-primary: #252525;
    $grey-secondary: #383838;
    $bud-green: #82b74bff;
    $bud-green__hover: rgb(138, 194, 78);

    .modal-container {
        width: 100%;
        height: 100%;

        position: fixed;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        z-index: 3; 
        left: 0;
        top: 0;
        overflow: none; 
        background-color: rgb(0, 0, 0); /* Fallback color */
        background-color: rgba(0, 0, 0, 0.9); 

        .modal {
            width: 80%;
            max-width: 700px;
            animation-name: zoom;
            animation-duration: 0.6s;

            display: flex;
            flex-direction: column;
            align-items: center;

            @keyframes zoom {
                from {
                    transform: scale(0);
                }
                to {
                    transform: scale(1);
                }
            }

            /* The Close Button */
            .close {
                position: absolute;
                top: 15px;
                right: 35px;
                color: #f1f1f1;
                font-size: 40px;
                font-weight: bold;
                transition: 0.3s;
            }

            .close:hover,
            .close:focus {
                color: #bbb;
                text-decoration: none;
                cursor: pointer;
            }

            @media only screen and (max-width: 700px) {
                .modal {
                    width: 100%;
                }
            }
        }
    }

    .hidden {
        display: none;
    }
</style>
