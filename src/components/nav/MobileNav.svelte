<script lang="ts">
  import SideSheet from "../utils/SideSheet.svelte";
  import MobileNavLink from "./MobileNavLink.svelte";

  type Props = {
    mobileNavOpen: boolean;
  };

  let { mobileNavOpen = $bindable() }: Props = $props();
</script>

<SideSheet onClose={() => (mobileNavOpen = false)}>
  <div
    class="nav-container"
    role="presentation"
    onclick={() => (mobileNavOpen = false)}
  >
    <MobileNavLink label="Home" route="./index" />
    <MobileNavLink label="About" route="./about" />
    <MobileNavLink label="Experience" route="./experience" />
    <MobileNavLink label="Projects" route="./projects" />
  </div>
</SideSheet>

<style>
  .nav-container {
    width: 100%;
  }
</style>
