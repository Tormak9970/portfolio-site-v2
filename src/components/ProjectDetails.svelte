<script lang="ts">
  import { fade } from "svelte/transition"
	import edjsHTML from "editorjs-html";
  
  import LoadingAnimation from "./utils/LoadingAnimation.svelte";

	import { loadConfig, projects } from '../loadConfig';
  import GoBackButton from "./utils/GoBackButton.svelte";
  import DiagonalLink from "./utils/DiagonalLink.svelte";

	export let id:string;

  let configLoadPromise = loadConfig();
	let entry: Project;

  configLoadPromise.then(() => {
    entry = projects.get(id);
  });

	function imageParser({data}) {
		return `<img class="image-tool__image-picture" src="/images/projects/${data.file.url}">`;
	}

	const edjsParser = edjsHTML({
		image: imageParser
	});

	$: data = entry?.content;

	let output: any[];

	$: {
		if (data && data.time && data.blocks?.length > 0 && data.version) {
			output = edjsParser.parse(data).join("");
		} else {
			output = null;
		}
	}

  function openProjectLink() {
    window.open(entry.link, '_blank', 'noopener noreferrer');
  }
</script>

<div class="details-container" in:fade>
  <div class="details">
    {#await configLoadPromise}
      <LoadingAnimation />
    {:then} 
      <div class="header-container">
        <GoBackButton url="/projects" />
        <h2 class="header">{entry.name}</h2>
      </div>
      <div class="image-container">
        <img src=".{entry.image}" alt="">
      </div>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <DiagonalLink label="Check it out" url={entry.link} />
      <div class="writeup">
        {@html output ? output : ''}
      </div>
    {/await}
  </div>
</div>

<style>
  .details-container {
    width: calc(100% - 20px);
    padding: 0px 5px;
    margin: 0px 5px;
		height: 100%;

		display: flex;
		flex-direction: column;
		align-items: center;

    overflow-y: scroll;
  }

	.details {
		width: 95%;
    max-width: 600px;

		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}
  
	.header-container {
		width: 100%;

    margin-top: 14px;
		
    display: flex;
    align-items: center;
    justify-content: center;

    position: relative;
	}
  
	.header-container .header {
		font-size: 27px;
		margin: 0;
		padding: 0;
	}
  
  /* TODO: fix */
	.image-container {
    width: calc(100% - 22px);
		max-width: 800px;

		margin-top: 22px;
		padding: 10px;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		border: 1px solid var(--border);

    border-radius: 4px;

    margin-bottom: 10px;
	}
	.image-container img {
		width: 100%;
		height: auto;
		border-radius: 4px;
	}
  
	.writeup :global(.cdx-block) { background-color: var(--foreground); }
	.writeup :global(.image-tool__caption) { display: none; }
	.writeup :global(.embed-project-link) { color: var(--font-color); }
	.writeup :global(.embed-project-link):hover { color: var(--highlight-hover); }
	.writeup :global(.embed-project-link):focus { color: var(--highlight-hover); }

  .writeup { width: 100%; }

	:global(.image-tool__image-picture) {
		max-width: 100%;
	}

	.writeup :global(a) { color: var(--link-color); }
	.writeup :global(a):hover { color: var(--link-color_clicked); }
	.writeup :global(a):focus { color: var(--link-color_clicked); }
</style>