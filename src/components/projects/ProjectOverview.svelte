<script lang="ts">
    interface Release {
        name:string,
        date:string,
        length:string,
        changes:string[],
        bugFixes?:string[]
    }
    
    interface Project {
        name:string,
        time:string,
        status:string,
        difficulty:string,
        description:string,
        takeaways:string[],
        releases?:Release[],
        link?:string,
        imgs:string[]
    }

    export let entryData:Project;
    export let hidden:boolean;
    export let scrollType:string;
    export let isLast:boolean;


</script>

<div class="projOview{` ${scrollType}`}{hidden ? " hidden" : ""}">
    <div class="proj-header">{entryData.name}</div>
    <div class="content-container">
        <div class="img-markup-cont">
            {@html entryData.imgs}
        </div>
        <div class="proj-overview-cont">
            <p class="overview">
                {entryData.description}
            </p>
        </div>
    </div>
    <div class="msg">{isLast ? "" : "Scroll to continue..."}</div>
</div>

<style lang="scss">
    $grey-primary: #252525;
    $grey-secondary: #383838;
    $bud-green: #82b74bff;
    $bud-green__hover: rgb(138, 194, 78);

    .projOview {
        width: 100%;

        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        animation-fill-mode: both;
        animation-direction: alternate;
        animation-duration: 1.5s;

        .proj-header { font-size: 27px; }
        .proj-header-2 { text-align: center; }
        .content-container {
            width: 100%;
            display: grid;
            grid-template-columns: minmax(400px, 1fr) minmax(400px, 2fr) minmax(200px, 1fr);
            column-gap: 14px;
            justify-items: center;
            align-items: center;
            
            .img-markup-cont {

            }
            .proj-overview-cont {
                .overview {
                    width: 100%; margin-top: 14px; font-size: 20px; text-align: center;
                }
            }
        }
        .msg { margin-top: 56px; font-size: 24px; }
    }

    .down-in { animation-name: down-fade-in; }
    .up-in { animation-name: up-fade-in; }
    .down-out { animation-name: down-fade-out; }
    .up-out { animation-name: up-fade-out; }

    .hidden { display: none; }

    @keyframes down-fade-in { 0% { opacity: 0; transform: translate(-50%, 50%); } 100% { opacity: 1; transform: translate(-50%, -50%); } }
    @keyframes down-fade-out { 0% { opacity: 1; transform: translate(-50%, -50%); } 100% { opacity: 0; transform: translate(-50%, -150%); } }

    @keyframes up-fade-in { 0% { opacity: 0; transform: translate(-50%, -150%); } 100% { opacity: 1; transform: translate(-50%, -50%); } }
    @keyframes up-fade-out { 0% { opacity: 1; transform: translate(-50%, -50%); } 100% { opacity: 0; transform: translate(-50%, 50%); } }
</style>