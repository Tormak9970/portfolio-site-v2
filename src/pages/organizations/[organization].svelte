<script lang="ts">
    import { goto } from "@roxi/routify";

	import { organizations, projects } from '../../linkConfig';
    import { jumpTo as jumpToProj } from "../projects/index.svelte";
    import { jumpTo as jumpToArch } from "../archive/index.svelte";

	export let organization:string;

	let orgData = organizations.get(organization);
    
    function linkToProj(id:string) {
        if (projects.get(id)) {
            $goto('../projects');
            setTimeout(() => { jumpToProj(id); }, 10);
        } else {
            $goto('../archive');
        }
    }
</script>

<div class="orgEntry">
    <div class="header-cont">
		<div class="back-cont"></div>
		<h2 class="org-header">{orgData.name}</h2>
		<div class="cit-cont {orgData.link != "" ? "" : " hidden"}">
			<div class="cit-label">Visit:</div>
			<a class="org-link" href="{orgData.link}" rel="noreferrer noopener" target="_blank">
                <i class="fas fa-external-link-alt"></i>
            </a>
		</div>
	</div>
    <div class="org-layout-cont">
        <div class="org-main-img org-img-cont">
			<img src=".{orgData.img}" alt="">
		</div>
        <div id="entrContent" class="entr-cont">
            <h2>About</h2>
			{@html orgData.about}

            <h2>My Involvement</h2>
            {@html orgData.description}

            <h2>Associated Projects:</h2>
            <div class="projects">
                <ul>
                    {#each orgData.projects as proj}
                        <li>
                            <div class="proj-entr">
                                <div class="name">{proj.name}</div>
                                <div class="proj-link" on:click|stopPropagation="{() => { linkToProj(proj.linkId); }}">
                                    <i class="fas fa-link"></i>
                                </div>
                            </div>
                        </li>
                    {/each }
                </ul>
            </div>
		</div>
    </div>
</div>

<style>
	@import "/theme.css";

	.orgEntry {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		overflow: hidden;
	}
	.orgEntry .header-cont {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		align-items: center;
		justify-items: center;
	}
	.orgEntry .header-cont .back-cont {
		justify-self: flex-start;
		margin-left: 14px;
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 20px;
	}
	.orgEntry .header-cont .back-cont .cit-label {
		font-size: 16px;
		height: 100%;
		margin-right: 7px;
	}
	.orgEntry .header-cont .org-header {
		font-size: 27px;
		margin-bottom: 14px;
		margin-top: 14px;
		padding-bottom: 0;
		padding-top: 0;
	}
	.orgEntry .header-cont .cit-cont {
		justify-self: flex-end;
		margin-right: 14px;
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	.orgEntry .header-cont .cit-cont .cit-label {
		margin-right: 7px;
		font-size: 16px;
	}
	.orgEntry .header-cont .cit-cont .org-link {
		text-decoration: none;
		padding-top: 0px;
		display: flex;
		flex-direction: row;
		align-items: center;
		color: var(--highlight);
		cursor: pointer;
		font-size: 12px;
	}
	.orgEntry .header-cont .cit-cont .org-link:hover { color: var(--highlight-hover); }
	.orgEntry .header-cont .cit-cont .org-link:focus { color: var(--highlight-hover); }
	.orgEntry .header-cont .hidden { visibility: hidden; }
	.orgEntry .org-layout-cont {
		width: 100%;
		overflow-y: scroll;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.orgEntry .org-layout-cont .org-main-img {
		margin-top: 22px;
		margin-bottom: 0px;
		max-height: 200px;
        max-width: 400px;
		width: auto;
		padding: 10px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: var(--foreground);
		border-radius: 8px;
		box-shadow: black -6px -6px 16px 2px;
	}
	.orgEntry .org-layout-cont .org-main-img img {
		height: 100%;
		width: auto;
		border-radius: 8px;
	}
	@media (orientation: landscape) {
		.orgEntry .org-layout-cont .org-img-cont {
			width: calc(100% - 10px);
		}
	}
	@media (orientation: portrait) {
		.orgEntry .org-layout-cont .org-img-cont {
			width: calc(100% - 30px);
			margin: 10px;
		}
	}
	.orgEntry .org-layout-cont #entrContent {
		margin-top: 20px;
		max-width: 650px;
		background-color: var(--foreground);
		border-radius: 8px;
	}

    .projects {
        width: 100%;
        height: 100%;
        font-size: 16px;
    }
    .projects ul {
        width: 100%;

        margin-top: 0px;
        margin-bottom: 0px;
    }
    .projects ul li { width: 100%; }
    .projects ul li .proj-entr {
        height: 100%;

        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .projects ul li .proj-entr .name { margin-right: 7px; }

    .projects ul li .proj-entr .proj-link {
        height: 100%;

        display: flex;
        flex-direction: row;
        align-items: center;

        color: var(--highlight);

        cursor: pointer;
        font-size: 10px;
    }
    .projects ul li .proj-entr .proj-link :hover { color: var(--highlight-hover); }

	@media (orientation: landscape) {
		.orgEntry .org-layout-cont .entr-cont {
			width: calc(100% - 10px);
			padding: 7px 50px;
		}
	}
	@media (orientation: portrait) {
		.orgEntry .org-layout-cont .entr-cont {
			width: calc(100% - 30px);
			padding: 7px 10px;
		}
	}
</style>