<script lang="ts">
    import { currentRendered } from "../../stores";
    import { jumpTo } from "../projects/index.svelte";

    export let entryData:Organization;
    export let hidden:boolean;
    export let scrollType:string;
    export let isLast:boolean;

    function linkToProj(id:string) {
        $currentRendered = '4';
        setTimeout(() => { jumpTo(id); }, 10);
    }
</script>

<div id="{entryData.name}" class="orgEntry{` ${scrollType}`}{hidden ? " hidden" : ""}">
    <div class="org-header">
        <h2>{entryData.name}</h2>
    </div>
    {#if entryData.path}
        <div class="content-container">
            <img src="{entryData.path}" alt="{entryData.name}">
            <div class="description">
                <div class="org-header-2">
                    <h2>About</h2>
                </div>
                <p>{@html entryData.about}</p>
                <div class="org-header-2">
                    <h2>Involvement</h2>
                </div>
                <p>{@html entryData.description}</p>
            </div>
            <div class="projects">
                <div class="org-header-2">
                    <h2>Projects</h2>
                </div>
                <ul>
                    {#each entryData.projects as proj}
                        <li>
                            <div class="proj-entr">
                                <div class="name">{proj.name}</div>
                                <div class="proj-link" on:click|stopPropagation="{() => { linkToProj(proj.link); }}">
                                    <i class="fas fa-link"></i>
                                </div>
                            </div>
                        </li>
                    {/each }
                </ul>
            </div>
        </div>
    {:else}
        <div class="description">
            <p>{@html entryData.description}</p>
        </div>
    {/if}

    <div class="msg">{isLast ? "" : "Scroll to continue..."}</div>
</div>

<style lang="scss">
	$grey-primary: #252525;
	$grey-secondary: #383838;
	$bud-green: #82b74bff;
    $bud-green__hover: rgb(138, 194, 78);

    .orgEntry {
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

        .org-header { font-size: 27px; }
        .org-header-2 { text-align: center; }
        .content-container {
            width: 100%;
            display: grid;
            grid-template-columns: minmax(400px, 1fr) minmax(400px, 2fr) minmax(200px, 1fr);
            column-gap: 14px;
            justify-items: center;
            align-items: center;
            
            img { width: 80%; height: auto; margin-top: 14px; }
        }
        .description { width: 100%; margin-top: 14px; font-size: 20px; text-align: center; }
        .msg { margin-top: 56px; font-size: 24px; }
        .projects {
            margin-top: 14px;
            width: 100%;
            height: 100%;
            font-size: 20px;

            ul {
                width: 100%;

                li {
                    width: 100%;

                    .proj-entr {
                        height: 100%;

                        display: flex;
                        flex-direction: row;
                        align-items: center;

                        .name {
                            margin-right: 7px;
                        }

                        .proj-link {
                            height: 100%;
                        
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
            }
        }
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