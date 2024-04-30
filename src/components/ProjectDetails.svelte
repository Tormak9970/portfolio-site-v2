<script lang="ts">
	import { url } from '@roxi/routify';

	import edjsHTML from "editorjs-html";

	import { projects } from '../linkConfig';

	export let projectKey:string;

	let entryData = projects.get(projectKey);

	function imageParser({data}) {
		return `<img class="image-tool__image-picture" src=".${data.file.url}">`;
	}

	const edjsParser = edjsHTML({
		image: imageParser
	});

	$: data = entryData.content;

	let output: any[];

	$: {
		if (data.time && data.blocks?.length > 0 && data.version) {
			output = edjsParser.parse(data).join("");
		} else {
			output = null;
		}
	}
</script>

<div class="projEntry">
  <div class="header-cont">
		<div class="cit-cont">
      <a class="back-cont proj-link" href="{$url("/projects")}">
        Back
      </a>
    </div>
		<h2 class="proj-header">{entryData.name}</h2>
		<div class="cit-cont" style="margin-right: 14px;" class:hidden={entryData.link === ""}>
			<a class="proj-link" href="{entryData.link}" rel="noreferrer noopener" target="_blank">
        Visit
      </a>
		</div>
	</div>
  <div class="proj-layout-cont">
    <div class="proj-main-img proj-img-cont">
			<img src=".{entryData.image}" alt="">
		</div>
		<div class="data-container entr-cont">
			<div class="data-entr"><b>Name:</b> {entryData.name}</div>
		</div>
    <div id="entrContent" class="entr-cont">
			{@html output ? output : ''}
		</div>
  </div>
</div>

<style>
	.projEntry {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		overflow: hidden;
	}
	.projEntry .header-cont {
		width: 100%;
		
    display: flex;
    justify-content: space-between;

    max-width: 700px;
	}
	.projEntry .header-cont .back-cont {
		margin-left: 14px;
	}
	.projEntry .header-cont .proj-header {
		font-size: 27px;
		margin-bottom: 14px;
		margin-top: 14px;
		padding-bottom: 0;
		padding-top: 0;
	}
	.projEntry .header-cont .cit-cont {
		justify-self: flex-end;
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	.proj-link {
		text-decoration: none;
		display: flex;
		flex-direction: row;
		align-items: center;

		color: var(--font-color);
		font-size: 18px;

    padding: 3px 6px;
    border-radius: 4px;

    background-color: var(--highlight);
    
    cursor: pointer;
	}
	.proj-link:hover { background-color: var(--highlight-hover); }
	.proj-link:focus { background-color: var(--highlight-hover); }
	.projEntry .header-cont .hidden { visibility: hidden; }
	.projEntry .proj-layout-cont {
		width: 100%;
		overflow-y: scroll;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.projEntry .proj-layout-cont .proj-main-img {
		margin-top: 22px;
		margin-bottom: 0px;
		max-width: 400px;
		height: auto;
		padding: 10px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: var(--foreground);
		border-radius: 4px;
	}
	.projEntry .proj-layout-cont .proj-main-img img {
		position: static;
		width: 100%;
		height: auto;
		border-radius: 4px;
	}
	@media (orientation: landscape) {
		.projEntry .proj-layout-cont .proj-img-cont {
			width: calc(100% - 10px);
		}
	}
	@media (orientation: portrait) {
		.projEntry .proj-layout-cont .proj-img-cont {
			width: calc(100% - 30px);
			margin: 10px;
		}
	}
	.projEntry .proj-layout-cont .data-container {
		margin-top: 20px;
		max-width: 650px;
		background-color: var(--foreground);
		border-radius: 4px;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-around;
	}
	.projEntry .proj-layout-cont .data-container .data-entr { margin: 2px 0px; }
	.projEntry .proj-layout-cont .data-container:first-child { margin-top: 4px; }
	.projEntry .proj-layout-cont .data-container:last-child { margin-bottom: 4px; }
	.projEntry .proj-layout-cont #entrContent {
		margin-top: 20px;
		max-width: 650px;
		background-color: var(--foreground);
		border-radius: 4px;
	}
	.projEntry .proj-layout-cont #entrContent :global(.cdx-block) { background-color: var(--foreground); }
	.projEntry .proj-layout-cont #entrContent :global(.image-tool__caption) { display: none; }
	.projEntry .proj-layout-cont #entrContent :global(.embed-project-link) { color: var(--font-color); }
	.projEntry .proj-layout-cont #entrContent :global(.embed-project-link):hover { color: var(--highlight-hover); }
	.projEntry .proj-layout-cont #entrContent :global(.embed-project-link):focus { color: var(--highlight-hover); }
	@media (orientation: landscape) {
		.projEntry .proj-layout-cont .entr-cont {
			width: calc(100% - 10px);
			padding: 7px 50px;
		}
	}
	@media (orientation: portrait) {
		.projEntry .proj-layout-cont .entr-cont {
			width: calc(100% - 30px);
			padding: 7px 10px;
		}
	}
	:global(.image-tool__image-picture) {
		max-width: 100%;
	}
</style>