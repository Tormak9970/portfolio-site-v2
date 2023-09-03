<script lang="ts">
  import { imageModalData, showImagePreviewModal } from "../Stores";

  function closeSelf() {
    $showImagePreviewModal = false;
  }

  function keyCheck(e: KeyboardEvent) {
    if ($showImagePreviewModal && e.key === "Escape") {
      $showImagePreviewModal = false;
    }
  }
</script>

<svelte:window on:keypress={keyCheck} />

<div class="modal-background" on:wheel|stopPropagation on:click={closeSelf}>
  <span class="close" on:click={closeSelf}>&times;</span>
  <div class="modal-body">
    <img src={$imageModalData.image} alt={$imageModalData.name} style="max-height: auto; max-width: 100%;" />
  </div>
</div>

<style>
  .modal-background {
    z-index: 100;
    width: 100%;
    height: 100%;

    position: fixed;

    left: 0;
    top: 0;
    overflow: hidden;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    background-color: rgba(0, 0, 0, 0.9);
  }
  .modal-background > .modal-body {
    width: 80%;
    max-width: 700px;
    animation-name: zoom;
    animation-duration: 0.6s;

    margin: auto;
  }

  @keyframes zoom {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }

  @media only screen and (max-width: 700px) {
    .modal-background > .modal-body {
      width: 100%;
    }
  }

  .modal-background > .close {
    position: absolute;

    top: 15px;
    right: 35px;

    color: var(--font-color);
    
    font-size: 40px;
    font-weight: bold;

    transition: 0.3s;
  }
  .modal-background > .close:hover,
  .modal-background > .close:focus {
    color: #fff8ec;
    text-decoration: none;
    cursor: pointer;
  }
</style>
