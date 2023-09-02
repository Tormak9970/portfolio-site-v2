<script lang="ts">
  import { fade } from "svelte/transition";
  import { beforeUrlChange } from "@roxi/routify";

  let showThank: boolean;

  $: showThank = false;

  let showCrumb: boolean;

  $: showCrumb = false;

  function copyToClipboard() {
    copyTextToClipboard("Tormak9970@gmail.com");
  }

  function copyTextToClipboard(text: string) {
    if (!navigator.clipboard) {
      showBreadcrumb("Your browser does not support the clipboard api :(");
      return;
    }
    navigator.clipboard.writeText(text).then(
      function () {
        showBreadcrumb("Copied to clipboard.");
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  }

  function showBreadcrumb(msg: string) {
    document.getElementById("breadCrumbCont").innerHTML = msg;
    showCrumb = true;
    setTimeout(() => {
      showCrumb = false;
    }, 3000);
  }

  // @ts-ignore
  $beforeUrlChange(() => {
    showThank = false;
    return true;
  });

  function handleSubmit(e: Event) {
    e.preventDefault();
    const form = <HTMLFormElement>e.currentTarget;
    const data = new FormData(form);
    // @ts-ignore
    let numErrored = 0;

    for (const [key, value] of data) {
      if (value == "" && key != "g-recaptcha-response") {
        numErrored++;
        const elem = document.getElementById(key);
        elem.style.outline = "1px solid #e24a4a";
      }
    }

    if (numErrored > 0) {
      showBreadcrumb("Please complete the highlighted fields.");
    } else {
      sendMimicPost(data);
      form.reset();
      showThank = true;
    }
  }

  function sendMimicPost(data: FormData) {
    fetch("https://formsubmit.co/Tormak9970@gmail.com", {
      method: "POST",
      headers: {
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "content-type": "application/x-www-form-urlencoded",
      },
      mode: "cors",
      body: `email=${data.get("email")}&_subject=${data.get(
        "_subject"
      )}&body=${data.get("body")}&_captcha=false`,
    });
  }

  function highlightHandler(e: Event) {
    (e.currentTarget as HTMLElement).style.outline = "";
  }
</script>

<div id="infoSection" in:fade>
  <h2 class="info-header">Get in touch</h2>
  <div class="info-container">
    <div class="blurb">
      <p>
        The best way to get in touch with me is via email. You can either use
        the form below or email me at <i
          class="email-link"
          on:click|stopPropagation={copyToClipboard}>Tormak9970@gmail.com</i
        >
      </p>
    </div>

    {#if showThank}
      <div class="thank-cont" in:fade>
        <h1>Thank you!</h1>
        <p>
          Thanks for reaching out! I will try to get back to you as soon as
          possible!
        </p>
      </div>
    {:else}
      <div class="form-wrapper" in:fade>
        <form
          action="https://formsubmit.co/Tormak9970@gmail.com"
          method="POST"
          id="contactForm"
          on:submit|stopPropagation={handleSubmit}
        >
          <label for="email">Email Adress</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="foo@bar.com"
            on:focus={highlightHandler}
          />

          <label for="_subject">Subject</label>
          <input
            id="_subject"
            type="text"
            name="_subject"
            placeholder="What's on your mind?"
            on:focus={highlightHandler}
          />

          <label for="body">Message</label>
          <textarea
            id="body"
            name="body"
            cols="30"
            rows="10"
            on:focus={highlightHandler}
          />

          <div id="recaptchaCont" />

          <button type="submit">Submit</button>
        </form>
      </div>
    {/if}
  </div>
  <div class="breadcrump-cont{showCrumb ? '' : ' hidden'}">
    <div id="breadCrumbCont">Placeholder</div>
  </div>
</div>

<style>
  @import "/theme.css";

  #infoSection {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #infoSection .info-header {
    margin: 7px;

    padding: 0;

    font-size: 1.45em;
  }

  #infoSection .info-container {
    height: calc(100% - 49px);
    width: calc(100% - 20px);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
  #infoSection .info-container .blurb {
    max-width: 400px;
    width: calc(100% - 20px);
    text-align: center;
  }
  #infoSection .info-container .blurb .email-link {
    font-style: normal;
    text-decoration: underline;

    color: var(--highlight);

    cursor: pointer;
  }
  #infoSection .info-container .blurb .email-link:hover {
    color: var(--highlight-hover);
  }
  #infoSection .info-container .form-wrapper {
    max-width: 400px;
    width: calc(100% - 20px);

    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 10px;

    background-color: var(--foreground);

    border-radius: 4px;
  }
  #infoSection .info-container .form-wrapper #contactForm {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  #infoSection .info-container .form-wrapper #contactForm label {
    width: calc(100% - 10px);
    font-size: 18px;
  }
  #infoSection .info-container .form-wrapper #contactForm input {
    width: calc(100% - 10px);

    margin-bottom: 7px;

    background-color: var(--background);

    border-radius: 4px;

    outline: none;
    border: none;

    color: var(--font-color);
  }
  #infoSection .info-container .form-wrapper #contactForm input:focus {
    outline: 1px solid var(--highlight);
  }
  #infoSection .info-container .form-wrapper #contactForm textarea {
    width: calc(100% - 10px);

    margin-bottom: 7px;

    background-color: var(--background);

    border-radius: 4px;

    outline: none;
    border: none;

    color: var(--font-color);

    resize: none;
  }
  #infoSection .info-container .form-wrapper #contactForm textarea:focus {
    outline: 1px solid var(--highlight);
  }
  #infoSection .info-container .form-wrapper #contactForm button {
    height: 24px;
    width: 80px;

    cursor: pointer;
    background-color: var(--highlight);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border-radius: 4px;

    outline: none;
    border: none;

    color: var(--font-color);
  }
  #infoSection .info-container .form-wrapper #contactForm button:hover {
    background-color: var(--highlight-hover);
  }
  #infoSection .info-container .form-wrapper #contactForm button:focus {
    outline: none;
  }

  #infoSection .info-container .thank-cont {
    max-width: 400px;
    width: calc(100% - 20px);

    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #infoSection .info-container .thank-cont p {
    font-size: 16px;
    text-align: center;
  }

  #infoSection .breadcrump-cont {
    position: absolute;

    padding: 6px 10px;
    border-radius: 4px;

    background-color: var(--foreground);

    box-shadow: #151515 1px 1px 10px 0px;

    bottom: 40px;

    transition: bottom 0.4s;
  }
  #infoSection .breadcrump-cont #breadCrumbCont {
    font-size: 14px;
  }

  #infoSection .hidden {
    bottom: -40px;
  }
</style>
