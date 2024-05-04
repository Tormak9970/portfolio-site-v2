<script lang="ts">
  import { fade } from "svelte/transition";
  import NoisyDots from "../components/NoisyDots.svelte";
</script>

<div class="bg-cont" in:fade>
  <div class="dots-cont">
    <NoisyDots fillColor="#252525" />
  </div>
  <div class="home-container">
    <div class="name">Travis Lane</div>
  </div>
</div>

<style>
  :root {
    --desc-color: "";
  }

  .bg-cont {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    position: relative;
  }

  .dots-cont {
    width: 100%;
    height: 100%;

    position: absolute;
    opacity: 0.1;
    top: 0;
    z-index: 1;
  }

  .home-container {
    z-index: 2;

    width: 100%;
    height: 80%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .name {
    --height: 64px;
    font-weight: bold;
    font-size: var(--height);

    position: absolute;
    bottom: 50%;
  }

  @keyframes blink {
    0% {opacity: 1;}
    40% {opacity: 1;}
    60% {opacity: 0;}
    100% {opacity: 0;}
  }
</style>