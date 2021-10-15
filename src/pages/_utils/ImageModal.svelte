<script lang="ts">
    import { showing } from "../../Stores";

    interface ConfigPiece {
        name:string,
        path:string
    }

    interface Config {
        id: string;
        data: ConfigPiece;
    }

    export let config: Config;

    function closeSelf(e: MouseEvent) {
        $showing = false;
    }
    function catchScroll(e: WheelEvent) {}
</script>

<div id={config.id} class="modal-container{$showing ? ' show' : ''}" on:wheel|stopPropagation="{catchScroll}">
    <span class="close" on:click="{closeSelf}">&times;</span>
    <div class="modal show">
        <img src="{config.data.path}" alt="{config.data.name}" style="max-height: auto; max-width: 100%;"/>
    </div>
</div>

<style lang="scss">
    $grey-primary: #252525;
    $grey-secondary: #383838;
    $bud-green: #82b74bff;
    $bud-green__hover: rgb(138, 194, 78);

    .modal-container {
        z-index: 100;
        width: 100%;
        height: 100%;

        position: fixed;
        display: none;

        left: 0;
        top: 0;
        overflow: hidden; 
        background-color: rgb(0, 0, 0);
        background-color: rgba(0, 0, 0, 0.9); 

        .modal {
            width: 80%;
            max-width: 700px;
            animation-name: zoom;
            animation-duration: 0.6s;

            margin: auto;

            @keyframes zoom { from { transform: scale(0); } to { transform: scale(1); } }

            @media only screen and (max-width: 700px) { .modal { width: 100%; } }
        }

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
    }

    .show {
        display: flex;
    }
</style>
