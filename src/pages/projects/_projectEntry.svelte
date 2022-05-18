<script lang="ts">
    import { showProject } from '../../Stores';
	import { url } from '@roxi/routify';

	import edjsHTML from "editorjs-html";

    export let entryData:Project;

	let isRelative:boolean;
	$: isRelative = false;

	function imageParser({data}) {
		return `<img class="image-tool__image-picture" src="${data.file.url}">`;
	}

	const edjsParser = edjsHTML({
		image: imageParser
	});

	let output: any[];

	$: if ($showProject) {
		let data = entryData.content;
		if (data.time && data.blocks?.length > 0 && data.version) {
			output = edjsParser.parse(data).join("");
		} else {
			output = null;
		}
		isRelative = entryData.isRelative;
	}

	function goBack(): void { $showProject = false; }
</script>

<div class="projEntry">
    <div class="header-cont">
		<div class="back-cont" on:click|stopPropagation="{goBack}">
			<i class="fas fa-arrow-left"></i>
		</div>
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
			<img src="{entryData.imgs[0]}" alt="">
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

<style lang="scss">
	$grey-primary: #252525;
	$grey-secondary: #383838;
	$grey-secondary__hover: rgb(71, 71, 71);
	$font-color: rgb(231, 231, 231);
	$bud-green: #82b74bff;
    $bud-green__hover: rgb(138, 194, 78);

    .projEntry {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

		overflow: hidden;

        .header-cont {
			width: 100%;
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			align-items: center;
			justify-items: center;

			.back-cont {
				justify-self: flex-start;
				margin-left: 14px;
				height: 100%;

				display: flex;
				flex-direction: row;
				align-items: center;

				font-size: 20px;

				.cit-label {
					font-size: 16px;
					height: 100%;
					margin-right: 7px;
				}

				.fa-arrow-left {
					color: $font-color;
					cursor: pointer;

					&:hover {
						color: $bud-green;
					}
				}
			}

			.proj-header {
				font-size: 27px;
				margin-bottom: 14px;
    			margin-top: 14px;
				padding-bottom: 0;
				padding-top: 0;
			}

			.cit-cont {
				justify-self: flex-end;
				margin-right: 14px;
				height: 100%;

				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;

				.cit-label {
					margin-right: 7px;
					font-size: 20px;
				}

				.proj-link {
					text-decoration: none;
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

					&:focus {
						color: $bud-green__hover;
					}
				}
			}

			.hidden { visibility: hidden; }
		}
        .proj-layout-cont {
			width: 100%;
			overflow-y: scroll;
			
			display: flex;
			flex-direction: column;
			align-items: center;

			.proj-main-img {
				margin-top: 22px;
				margin-bottom: 0px;

				max-width: 400px;
				height: auto;

				padding: 10px;

				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				background-color: $grey-secondary;

				border-radius: 8px;

				box-shadow: black -6px -6px 16px 2px;

				img {
					position: static;
					width: 100%;
					height: auto;
					
					border-radius: 8px;
				}
			}

			@media (orientation:landscape) { .proj-img-cont { width: calc(100% - 10px); } }
			@media (orientation:portrait) { .proj-img-cont { width: calc(100% - 30px); margin: 10px; } }

			.data-container {
				margin-top: 20px;

				max-width: 650px;

				background-color:  $grey-secondary;

				border-radius: 8px;

				display: flex;
				flex-direction: column;
				align-items: flex-start;
				justify-content: space-around;

				.data-entr { margin: 2px 0px; }

				:first-child { margin-top: 4px; }
            	:last-child { margin-bottom: 4px; }
			}

			#entrContent {
				margin-top: 20px;

				max-width: 650px;

				background-color:  $grey-secondary;

				border-radius: 8px;

				:global(.cdx-block) { background-color: $grey-secondary; }
				:global(.image-tool__caption) { display: none; }
				:global(.embed-project-link) {
					color: $font-color;

					&:hover { color: $bud-green__hover; }
					&:focus { color: $bud-green__hover; }
				}
			}

			@media (orientation:landscape) { .entr-cont { width: calc(100% - 10px); padding: 7px 50px; } }
			@media (orientation:portrait) { .entr-cont { width: calc(100% - 30px); padding: 7px 10px; } }
		}
    }
</style>