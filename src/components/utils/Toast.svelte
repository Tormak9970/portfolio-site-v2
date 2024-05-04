<script lang="ts">
  export let show: boolean = false;
  export let message: string;
</script>

<div class="toast-container" class:hidden={!show}>
  <div class="toast">{message}</div>
</div>

<style>
  .toast-container {
    position: absolute;

    padding: 6px 10px;
    border-radius: 4px;

    background-color: var(--foreground);

    bottom: 40px;

    transition: bottom 0.2s;
  }
  .toast {
    font-size: 14px;
  }

  .hidden {
    bottom: -40px;
  }
</style>