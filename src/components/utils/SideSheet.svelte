<script lang="ts">
  import { easeEmphasizedAccel, easeEmphasizedDecel } from "../../lib/easing";
  import { onMount, type Snippet } from "svelte";
  import { Tween } from "svelte/motion";
  import type { Unsubscriber } from "svelte/store";

  let heightUnsub: Unsubscriber;

  type Props = {
    width?: number;
    padding?: string;
    children: Snippet;
    onClose: () => void;
  };

  let { width = 200, padding = "1rem", children, onClose }: Props = $props();

  let leaving = $state(false);

  const actualWidth = new Tween(0, {
    duration: 400,
    easing: easeEmphasizedDecel,
  });

  /**
   * Handles opening the sheet.
   */
  const open = (node: HTMLDialogElement) => {
    node.inert = true;
    node.showModal();
    node.inert = false;
  };

  const close = async () => {
    if (leaving) return;
    leaving = true;
    await actualWidth.set(0, {
      duration: 200,
      easing: easeEmphasizedAccel,
    });
    onClose();
  };

  onMount(() => {
    actualWidth.set(width);
  });
</script>

<dialog
  class="m3-container"
  class:leaving
  style:width="{actualWidth.current}px"
  use:open
  oncancel={(e) => {
    e.preventDefault();
    close();
  }}
  onclick={(e) => {
    if (e.currentTarget === e.target) {
      close();
    }
  }}
>
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    style:padding
    class="sheet-container"
    onclick={(e) => {
      e.stopImmediatePropagation();
    }}
  >
    {@render children()}
  </div>
</dialog>

<style>
  :root {
    --m3-bottom-sheet-shape: 1rem;
  }

  .m3-container {
    min-height: 100%;

    background-color: var(--background);

    border-radius: var(--m3-bottom-sheet-shape) 0 0 var(--m3-bottom-sheet-shape);
    border: none;

    padding: 0;

    margin-right: 0;
    margin-top: 0;
    margin-bottom: 0;
  }
  dialog::backdrop {
    background-color: rgb(0 0 0 / 0.5);
    animation: backdrop 400ms;
  }
  dialog:global(.leaving)::backdrop {
    background-color: transparent;
    animation: backdropReverse 200ms;
  }
  .sheet-container {
    width: calc(100% - 2rem);
    height: calc(100vh - 2rem);

    overflow: hidden;
  }

  @keyframes backdrop {
    0% {
      background-color: transparent;
    }
    100% {
      background-color: rgb(0 0 0 / 0.5);
    }
  }
  @keyframes backdropReverse {
    0% {
      background-color: rgb(0 0 0 / 0.5);
    }
    100% {
      background-color: transparent;
    }
  }
</style>
