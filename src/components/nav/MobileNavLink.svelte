<script lang="ts">
  import { goto, isActive } from "@roxi/routify";

  const gotoFunction = $goto;

  type Props = {
    label: string;
    route: string;
  };

  let { label, route }: Props = $props();
</script>

<button
  id="1"
  class="nav-link"
  onclick={() => gotoFunction(route)}
  class:rendered={$isActive(route)}
>
  <div class="nav-btn">{label}</div>
</button>

<style>
  .nav-link {
    /* reset default button styling */
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    color: inherit;
    cursor: pointer;

    height: 40px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border-radius: 10px;
  }
  .nav-link .nav-btn {
    color: var(--foreground-light-text);
    text-decoration: none;
    margin: 7px 0px;
  }
  .nav-link .nav-btn:focus {
    color: var(--foreground-light-text);
  }
  .rendered {
    background-color: var(--foreground-light-hover);
  }
  .nav-link:hover {
    cursor: pointer;
  }
</style>
