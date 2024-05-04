<script lang="ts">
  export let label: string;
  export let width = "50px";
  export let height = "30px";
  export let onClick: (e: MouseEvent) => void;
  export let disabled = false;
  export let highlight = false;
</script>

<button class="button" class:highlight={highlight} class:disabled={disabled} style="width: {width}; height: {height};" on:click={onClick}>
  <div style="user-select: none;">{label}</div>
</button>

<style>
  .button {
    padding: 3px 6px;
    min-width: 40px;
        
    background-color: var(--foreground);
    border: 1px solid transparent;
    border-radius: 4px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 16px;
    cursor: pointer;

    color: var(--font-color);

    transition: background-color 0.15s ease-in-out, border 0.15s ease-in-out;
  }

  .button:hover {
    background-color: var(--foreground-hover);
  }

  .button:focus {
    outline: none;
  }

  .disabled {
    pointer-events: none;
    opacity: 0.7;
  }

  .highlight { background-color: var(--highlight); }
  .highlight:hover { background-color: var(--highlight-hover); }
</style>
