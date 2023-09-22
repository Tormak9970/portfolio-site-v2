<script lang="ts">
  import ProjectDetails from "../../components/ProjectDetails.svelte";

	export let projectKey:string;
</script>

<ProjectDetails projectKey={projectKey} shouldUseArchive />