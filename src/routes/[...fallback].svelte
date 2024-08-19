<script lang="ts">
  import { url } from "@roxi/routify";
</script>

<div class="not-found-error">
  <div class="error">Page not found</div>
  <div class="message">
    Either I broke something, or you made a typo! Click
    <a href="{$url("/")}">here</a> to return to the home page.
  </div>
</div>

<style>
	.not-found-error {
    width: 90%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .error {
    font-size: 40px;
  }

  .message {
    max-width: 450px;
    font-size: 18px;
    text-align: center;
  }

  a {
    color: var(--link-color);
    font-weight: bold;
    text-decoration: none;
  }

	a:hover,
	a:focus {
    color: var(--link-color_clicked);
    text-decoration: underline;
  }
</style>