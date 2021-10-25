<script lang="ts">
    import { projectDisplay, showProject } from "../../Stores";

    export let entryData:Project;
    export let type:string;

    function openProjectEntry() { $projectDisplay = entryData; $showProject = true; }
</script>

<div class="card-entr">
    
</div>

<style lang="scss">
    $grey-primary: #252525;
    $grey-secondary: #383838;
    $bud-green: #82b74bff;
    $bud-green__hover: rgb(138, 194, 78);

    .card-entr {

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }
</style>