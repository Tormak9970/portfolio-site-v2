<script lang="ts">
import { afterPageLoad } from "@roxi/routify";

import { onMount } from "svelte";


    function copyToClipboard(e: Event) { copyTextToClipboard('Tormak9970@gmail.com'); }

    function fallbackCopyTextToClipboard(text) {
        let textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            document.execCommand('copy');
            showBreadcrumb();
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }

        document.body.removeChild(textArea);
    }
    function copyTextToClipboard(text) {
        if (!navigator.clipboard) {
            fallbackCopyTextToClipboard(text);
            return;
        }
        navigator.clipboard.writeText(text).then(function() {
            showBreadcrumb();
        }, function(err) {
            console.error('Async: Could not copy text: ', err);
        });
    }

    function showBreadcrumb() {

    }

    $afterPageLoad(() => {
        grecaptcha.render('recaptchaCont', {
            sitekey: "6Lem6_ocAAAAAJzNSej4eQTt-NrXSyNKPv_ezWWp",

        })
    });

    function handleSubmit(e: Event) {
        e as SubmitEvent;
        const data = new FormData(<HTMLFormElement>e.currentTarget);
        const captcha = grecaptcha.getResponse();

        if (captcha != '') {
            // check other fields' validity
            grecaptcha.reset();
            return true;
        } else {
            // display "fill out captcha" here
            return false;
        }
    }
</script>

<div id="infoSection">
	<h2 class="info-header">Get in touch</h2>
    <div class="info-container">
        <div class="blurb">
            <p>The best way to get in touch with me is via email. You can either use the form below or email me at <i class="email-link" on:click|stopPropagation="{copyToClipboard}">Tormak9970@gmail.com</i></p>
        </div>

        <div class="form-wrapper">
            <form action="https://formsubmit.co/Tormak9970@gmail.com" method="POST" id="contactForm" on:submit|stopPropagation="{handleSubmit}">
                <label for="email">Email Adress</label>
                <input type="email" name="email" placeholder="foo@bar.com">

                <label for="_subject">Subject</label>
                <input type="text" name="_subject" placeholder="What's on your mind?">

                <label for="body">Message</label>
                <textarea name="body" id="formContent" cols="30" rows="10"></textarea>

                <input type="hidden" name="_next" value="https://tormak.dev/contact">
                <input type="hidden" name="_captcha" value="false">

                <div id="recaptchaCont"></div>

                <button type="submit">Submit</button>
            </form>
        </div>
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
        }
	}
</style>