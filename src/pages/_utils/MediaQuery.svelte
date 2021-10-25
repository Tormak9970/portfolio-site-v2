<script>
    import { onMount } from "svelte";

    export let query;

    let mql;
    let queryLstn;
    let wasMounted = false;
    let matches = false;

    onMount(() => { wasMounted = true; return () => { removeActiveListener(); }; });

    $: {
        if (wasMounted) { removeActiveListener(); addNewListener(query); }
    }

    function addNewListener(query) {
        mql = window.matchMedia(query);
        queryLstn = (v) => matches = v.matches;
        mql.addEventListener("change", queryLstn)
        matches = mql.matches;
    }

    function removeActiveListener() { if (mql && queryLstn) mql.removeListener(queryLstn); }
</script>

<slot {matches} />