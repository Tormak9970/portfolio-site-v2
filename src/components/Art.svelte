<script lang="ts" type="module">
	import ArtEntry from './art/ArtEntry.svelte';

    let artPromise = loadEntries();

    function loadEntries() {
        return fetch('./config.json').then(response => { return response.json(); }).then(json => { return json['art']; });
    }
</script>

<div id="art">
	<div class="art-header">

    </div>
    <div class="forword">

    </div>
    <div class="art-gallery">
        {#await artPromise}
            <div class="loading-data">Loading art pieces...</div>
        {:then artData} 
            {#each artData as artEntr}
                <ArtEntry entryData={artEntr}/>
            {/each }
        {/await}
    </div>
</div>

<style lang="scss">
	$grey-primary: #252525;
	$grey-secondary: #383838;
	$bud-green: #82b74bff;
    $bud-green__hover: rgb(138, 194, 78);
    $dark-moss-green: #405d27ff;
    $army-green: #32481eff;

    #art {



        .art-header {

        }
        .forword {

        }
        .art-gallery {
            
        }
    }
</style>