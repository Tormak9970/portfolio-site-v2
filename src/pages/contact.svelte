<script lang="ts">
    import { fade } from "svelte/transition";
    import { afterPageLoad, beforeUrlChange } from "@roxi/routify";

    let showThank:boolean;

    $: showThank = false;

    let showCrumb:boolean;

    $: showCrumb = false;

    function copyToClipboard() { copyTextToClipboard('Tormak9970@gmail.com'); }

    function fallbackCopyTextToClipboard(text: string) {
        let textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            // @ts-ignore
            document.execCommand('copy');
            showBreadcrumb("Copied to clipboard.");
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }

        document.body.removeChild(textArea);
    }
    function copyTextToClipboard(text: string) {
        if (!navigator.clipboard) {
            fallbackCopyTextToClipboard(text);
            return;
        }
        navigator.clipboard.writeText(text).then(function() {
            showBreadcrumb("Copied to clipboard.");
        }, function(err) {
            console.error('Async: Could not copy text: ', err);
        });
    }

    function showBreadcrumb(msg: string) { document.getElementById('breadCrumbCont').innerHTML = msg; showCrumb = true; setTimeout(() => { showCrumb = false; }, 3000); }

    // @ts-ignore
    $afterPageLoad(() => { grecaptcha.render('recaptchaCont', { sitekey: "6Lem6_ocAAAAAJzNSej4eQTt-NrXSyNKPv_ezWWp" }); });
    $beforeUrlChange(() => { showThank = false; return true; });

    function handleSubmit(e: Event) {
        e.preventDefault();
        const form = <HTMLFormElement>e.currentTarget;
        const data = new FormData(form);
        // @ts-ignore
        const captcha = grecaptcha.getResponse();

        if (captcha != '') {
            // check other fields' validity
            // @ts-ignore
            grecaptcha.reset();

            let numErrored = 0;

            for (const [key, value] of data) {
                if (value == '' && key != 'g-recaptcha-response') {
                    numErrored++;
                    const elem = document.getElementById(key);
                    elem.style.outline = '1px solid #e24a4a';
                }
            }

            if (numErrored > 0) {
                showBreadcrumb("Please complete the highlighted fields.");
            } else {
                sendMimicPost(data);
                form.reset();
                showThank = true;
            }
        } else {
            // display "fill out captcha" here
            showBreadcrumb("Please complete the reCaptcha");
        }
    }

    function sendMimicPost(data: FormData) {
        fetch('https://formsubmit.co/Tormak9970@gmail.com', {
            method: 'POST',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'content-type': 'application/x-www-form-urlencoded'
            },
            mode: 'cors',
            body: `email=${data.get('email')}&_subject=${data.get('_subject')}&body=${data.get('body')}&_captcha=false`
        })
    }

    function highlightHandler(e: Event) { (e.currentTarget as HTMLElement).style.outline = ''; }
</script>

<div id="infoSection" in:fade>
	<h2 class="info-header">Get in touch</h2>
    <div class="info-container">
        <div class="blurb">
            <p>The best way to get in touch with me is via email. You can either use the form below or email me at <i class="email-link" on:click|stopPropagation="{copyToClipboard}">Tormak9970@gmail.com</i></p>
        </div>

        {#if showThank}
            <div class="thank-cont" in:fade>
                <h1>Thank you!</h1>
                <p>Thanks for reaching out! I will try to get back to you as soon as possible!</p>
            </div>
        {:else}
            <div class="form-wrapper" in:fade>
                <form action="https://formsubmit.co/Tormak9970@gmail.com" method="POST" id="contactForm" on:submit|stopPropagation="{handleSubmit}">
                    <label for="email">Email Adress</label>
                    <input id="email" type="email" name="email" placeholder="foo@bar.com" on:focus="{highlightHandler}">

                    <label for="_subject">Subject</label>
                    <input id="_subject" type="text" name="_subject" placeholder="What's on your mind?" on:focus="{highlightHandler}">

                    <label for="body">Message</label>
                    <textarea id="body" name="body" cols="30" rows="10" on:focus="{highlightHandler}"></textarea>

                    <div id="recaptchaCont"></div>

                    <button type="submit">Submit</button>
                </form>
            </div>
        {/if}
    </div>
    <div class="breadcrump-cont{showCrumb ? '' : ' hidden'}">
        <div id="breadCrumbCont">Placeholder</div>
    </div>
</div>

<style lang="scss">
	$font-color: rgb(231, 231, 231);
	$grey-primary: #252525;
	$grey-secondary: #383838;
	$bud-green: #82b74bff;
    $bud-green__hover: rgb(138, 194, 78);
    $warning-red: #e24a4a;

	#infoSection {
		width: 100%;
        height: 100%;

		display: flex;
		flex-direction: column;
        align-items: center;

        .info-header {
            margin: 7px;

            padding: 0;

            font-size: 1.45em;
        }
        .info-container {
            height: calc(100% - 49px);
            width: calc(100% - 20px);

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;

            .blurb {
                max-width: 400px;
                width: calc(100% - 20px);
                text-align: center;

                .email-link {
                    font-style: normal;
                    text-decoration: underline;
                    
                    color: $bud-green;

                    cursor: pointer;
                }
                .email-link:hover { color: $bud-green__hover; }
            }

            .form-wrapper {
                max-width: 400px;
                width: calc(100% - 20px);

                display: flex;
                flex-direction: column;
                align-items: center;

                padding: 10px;

                background-color: $grey-secondary;

                border-radius: 8px;

                box-shadow: #151515 1px 1px 10px 0px;

                #contactForm {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;

                    label { width: calc(100% - 10px); font-size: 18px; }
                    input {
                        width: calc(100% - 10px);

                        margin-bottom: 7px;

                        background-color: $grey-primary;

                        border-radius: 4px;

                        outline: none;
                        border: 1px solid black;

                        color: $font-color;

                        &:focus { outline: 1px solid $bud-green; }
                    }

                    textarea {
                        width: calc(100% - 10px);

                        margin-bottom: 7px;

                        background-color: $grey-primary;

                        border-radius: 4px;

                        outline: none;
                        border: 1px solid black;

                        color: $font-color;
                        
                        resize: none;

                        &:focus { outline: 1px solid $bud-green; }
                    }

                    button {
                        height: 24px;
                        width: 80px;

                        cursor: pointer;
                        background-color: $bud-green;

                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;

                        border-radius: 4px;

                        outline: none;
                        border: none;

                        color: $font-color;

                        &:hover { background-color: $bud-green__hover; }
                        &:focus { outline: none;}
                    }
                }
            }

            .thank-cont {
                max-width: 400px;
                width: calc(100% - 20px);

                display: flex;
                flex-direction: column;
                align-items: center;

                p {
                    font-size: 16px;
                    text-align: center;
                }
            }
        }

        .breadcrump-cont {
            position: absolute;

            padding: 6px 10px;
            border-radius: 4px;

            background-color: $grey-secondary;

            box-shadow: #151515 1px 1px 10px 0px;

            bottom: 40px;

            transition: bottom 0.4s;

            #breadCrumbCont {
                font-size: 14px;
            }
        }

        .hidden {
            bottom: -40px;
        }
	}
</style>