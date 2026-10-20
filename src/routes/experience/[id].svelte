<script lang="ts">
  import ExperienceDetails from "../../components/ExperienceDetails.svelte";

  type Props = {
    id: string;
  };

  let { id }: Props = $props();
</script>

<ExperienceDetails {id} />
