<script lang="ts">
	import edjsHTML from "editorjs-html";
  
  import LoadingAnimation from "./utils/LoadingAnimation.svelte";

	import { loadConfig, projects } from '../loadConfig';
    import GoBackButton from "./utils/GoBackButton.svelte";

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

<div class="details-container">
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
      <div class="link-container" on:click={openProjectLink}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 269 269" width="12px" height="12px">
          <path d="M108.688 0C94.4162 0 82.8859 12.0181 82.8859 26.8937C82.8859 41.7693 94.4162 53.7874 108.688 53.7874H175.37L13.0592 223.05C2.98027 233.555 2.98027 250.616 13.0592 261.121C23.1381 271.626 39.5063 271.626 49.5852 261.121L211.896 91.8588V161.362C211.896 176.238 223.426 188.256 237.698 188.256C251.97 188.256 263.5 176.238 263.5 161.362V26.8937C263.5 12.0181 251.97 0 237.698 0"/>
        </svg>
        Check it out
      </div>
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

		/* background-color: var(--foreground); */
		border: 1px solid var(--border);

    border-radius: 4px;
	}
	.image-container img {
		width: 100%;
		height: auto;
		border-radius: 4px;
	}

  .link-container {
    margin-top: 10px;
    width: 100%;
    display: flex;
    align-items: center;
    transition: text-decoration 0.15s ease-in-out;
  }
  .link-container svg {
    margin-right: 5px;
    margin-top: 2px;
    fill: var(--link-color);
    transition: fill 0.15s ease-in-out;
  }

  .link-container:hover {
    text-decoration: underline;
    cursor: pointer;
  }
  .link-container:hover svg {
    fill: var(--link-color_clicked);
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
</style>