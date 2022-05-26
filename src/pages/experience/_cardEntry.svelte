<script lang="ts">
    export let entryData:Experience;
</script>

<div class="card-entr">
    <div class="name-cont">
        {entryData.position}
    </div>
    <div class="img-cont">
        <img src="{entryData.img}" alt="">
    </div>
    <div class="desc-cont">Company: {entryData.company}</div>
    <div class="desc-cont">
        {@html entryData.description}
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

            text-align: center;

            font-size: 16px;

            margin-bottom: 5px;
        }
    }
</style>