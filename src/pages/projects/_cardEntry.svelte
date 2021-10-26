<script lang="ts">
    import { projectDisplay, showProject } from "../../Stores";

    export let entryData:Project;

    function openProjectEntry() { $projectDisplay = entryData; $showProject = true; }
</script>

<div class="card-entr">
    <div class="name-cont">
        {entryData.name}
    </div>
    <div class="img-cont">
        <img src="{entryData.imgs[0]}" alt="">
    </div>
    <div class="desc-cont">
        {@html entryData.description}
    </div>
    <div class="link-cont">
        <div class="name">Learn more:</div>
        <div class="proj-link" on:click|stopPropagation="{openProjectEntry}">
            <i class="fas fa-external-link-alt"></i>
        </div>
    </div>
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

        width: 90%;
        max-width: 330px;
        height: fit-content;

        background-color: $grey-secondary;

        margin: 14px;

        .name-cont {
            width: 90%;

            text-align: center;

            font-size: 20px;

            margin-bottom: 7px;
        }

        .img-cont {
            width: 90%;

            margin-bottom: 7px;

            img {
                width: 100%;
            }
        }
        
        .desc-cont {
            width: 90%;

            margin-bottom: 7px;

            text-align: center;

            font-size: 16px;
        }
        
        .link-cont {
            height: 100%;
            width: 100%;

            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;

            .name {
                height: 100%;
                
                margin-right: 7px;
                font-size: 20px;
            }

            .proj-link {
                padding-top: 3px;
            
                display: flex;
                flex-direction: row;
                align-items: center;

                color: $bud-green;

                cursor: pointer;
                font-size: 14px;

                &:hover {
                    color: $bud-green__hover;
                }
            }
        }
    }
</style>