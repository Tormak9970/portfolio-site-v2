<script lang="ts">
  import ProjectDetails from "../../components/ProjectDetails.svelte";

  type Props = {
    id:string
  }

	let { id }: Props = $props()
</script>

<ProjectDetails id={id} />