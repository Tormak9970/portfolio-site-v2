<script lang="ts">
    export let id:string;
    export let showing:boolean;

    export function show(stat:boolean) {
        showing = stat;
    }
</script>

<div id="{id}" class="modal-container {showing ? "" : " hidden"}">
    <slot>

    </slot>
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

        position: absolute;
        top: 0;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        background-color: rgba(0.0, 0.0, 0.0, 0.7);
    }

    .hidden { display: none; }

</style>