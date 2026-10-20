<script lang="ts">
  import type { Snippet } from "svelte";

  type Props = {
    query: string;
    children?: Snippet<[boolean]>;
  };

  let { query, children }: Props = $props();

  let matches = $state(false);

  $effect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => (matches = e.matches);

    matches = mql.matches;
    mql.addEventListener("change", onChange);

    return () => mql.removeEventListener("change", onChange);
  });
</script>

{@render children?.(matches)}
