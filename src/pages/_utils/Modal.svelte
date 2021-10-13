<script lang="ts">

    type Dims = {
        height:number,
        width:number
    }

    interface Config {
        id:string,
        styles:string,
        dimensions:Dims
    }

	export let config:Config;
    export let showing:boolean;
</script>

<div id="{config.id}" class="modal-container {showing ? "" : " hidden"}">
    <div class="modal" style="{config.styles}">
        <slot name="content">

        </slot>
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

        position: absolute;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .modal {

        }
    }

    .hidden {

    }

</style>