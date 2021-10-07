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

	const editor = new EditorJs({
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
			}
		}
	});

    interface Project {
        name:string,
        time:string,
        status:string,
        difficulty:string,
        description:string,
        content:Object,
        link?:string,
        imgs:string[]
    }

    export let entryData:Project;


</script>

<div class="projEntry">
    <div class="proj-header">{entryData.name}</div>
    <div class="proj-layout-cont">
        <div class="img-markup-cont">
            {@html entryData.imgs}
        </div>
        <div id="entrContent"></div>
    </div>
    <!-- 
        images
        description
        takeaways
        releases
        check it out section
        learn more
     -->
</div>

<style lang="scss">
    $grey-primary: #252525;
    $grey-secondary: #383838;
    $bud-green: #82b74bff;
    $bud-green__hover: rgb(138, 194, 78);

    .projEntry {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        .proj-header { font-size: 27px; }
        .proj-header-2 { text-align: center; }
        .description { width: 100%; margin-top: 14px; font-size: 20px; text-align: center; }
        .msg { margin-top: 56px; font-size: 24px; }
    }
</style>