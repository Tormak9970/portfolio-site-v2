<script lang="ts">
	import { url } from '@roxi/routify';
	import edjsHTML from "editorjs-html";

	import { projects } from '../../linkConfig';

	export let project:string;

	let entryData = projects.get(project);

	let isRelative:boolean;
	$: isRelative = false;

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
		isRelative = entryData.isRelative;
	}
</script>

<div class="projEntry">
    <div class="header-cont">
		<div class="back-cont"></div>
		<h2 class="proj-header">{entryData.name}</h2>
		<div class="cit-cont {entryData.link != "" ? "" : " hidden"}">
			<div class="cit-label">Visit:</div>
			{#if isRelative}
				<a class="proj-link" href="{$url(entryData.link)}">
					<i class="fas fa-external-link-alt"></i>
				</a>
			{:else}
				<a class="proj-link" href="{entryData.link}" rel="noreferrer noopener" target="_blank">
					<i class="fas fa-external-link-alt"></i>
				</a>
			{/if}
		</div>
	</div>
    <div class="proj-layout-cont">
        <div class="proj-main-img proj-img-cont">
			<img src=".{entryData.img}" alt="">
		</div>
		<div class="data-container entr-cont">
			<div class="data-entr"><b>Name:</b> {entryData.name}</div>
			<div class="data-entr"><b>Time:</b> {entryData.time}</div>
			<div class="data-entr"><b>Status:</b> {entryData.status}</div>
			<div class="data-entr"><b>Difficulty:</b> {entryData.difficulty}</div>
		</div>
        <div id="entrContent" class="entr-cont">
			{@html output ? output : ''}
		</div>
    </div>
</div>

<style>
	@import "/theme.css";

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
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		align-items: center;
		justify-items: center;
	}
	.projEntry .header-cont .back-cont {
		justify-self: flex-start;
		margin-left: 14px;
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 20px;
	}
	.projEntry .header-cont .back-cont .cit-label {
		font-size: 16px;
		height: 100%;
		margin-right: 7px;
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
		margin-right: 14px;
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	.projEntry .header-cont .cit-cont .cit-label {
		margin-right: 7px;
		font-size: 16px;
	}
	.projEntry .header-cont .cit-cont .proj-link {
		text-decoration: none;
		padding-top: 0px;
		display: flex;
		flex-direction: row;
		align-items: center;
		color: var(--highlight);
		cursor: pointer;
		font-size: 12px;
	}
	.projEntry .header-cont .cit-cont .proj-link:hover { color: var(--highlight-hover); }
	.projEntry .header-cont .cit-cont .proj-link:focus { color: var(--highlight-hover); }
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