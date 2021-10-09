<script lang="ts">
    import EditorJs from '@editorjs/editorjs';
	import Header from '@editorjs/header';
	import Code from '@editorjs/code';
	import Image from '@editorjs/image';
	import Link from '@editorjs/link';
	import List from '@editorjs/nested-list';
	import Delimiter from '@editorjs/delimiter';
	import Paragraph from '@editorjs/paragraph';
	import Embed from '@editorjs/embed';
	import Raw from '@editorjs/raw';
	
	import { showProject } from '../../Stores';

    export let entryData:Project;

	let editor:EditorJs;

	$: if ($showProject) {
		editor = new EditorJs({
			readOnly: true,
			holder : 'entrContent',
			tools: {
				header: {
					class: Header,
					inlineToolbar : true
				},
				code: {
					class: Code,
					inlineToolbar : true
				},
				image: {
					class: Image,
					inlineToolbar : true
				},
				link: {
					class: Link,
					inlineToolbar : true
				},
				list: {
					class: List,
					inlineToolbar : true
				},
				delimiter: {
					class: Delimiter,
					inlineToolbar : true
				},
				paragraph: {
					class: Paragraph,
					inlineToolbar : true
				},
				embed: {
					class: Embed,
					inlineToolbar : true
				},
				raw: {
					class: Raw,
					inlineToolbar : true
				},
			},
			data: entryData.content
		});
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
			<div class="cit-label">Check it out:</div>
			<a class="proj-link" href="{entryData.link}" rel="noreferrer noopener" target="_blank">
				<i class="fas fa-external-link-alt"></i>
			</a>
		</div>
	</div>
    <div class="proj-layout-cont">
        <div class="proj-main-img">
			<img src="{entryData.imgs[0]}" alt="">
		</div>
        <div id="entrContent"></div>
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
				padding-bottom: 0;
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
				width: 400px;
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

			#entrContent {
				margin-top: 20px;
				width: 650px;
				padding: 7px 50px;
				background-color:  $grey-secondary;

				border-radius: 8px;

				:global(.cdx-block) { background-color: $grey-secondary; }
				:global(.image-tool__caption) { display: none; }
			}
		}
    }
</style>