<script lang="ts">
    import { afterPageLoad, beforeUrlChange } from "@roxi/routify";

    import { init } from "../components/pong/index";
    import { navCheck, showProject } from "../Stores";
    import Modal from "./_utils/Modal.svelte";
    
    let showGame:boolean;
    $: showGame = false;
    let settingsModal:Modal;
    let optionModal:Modal;
    let sakModal:Modal;

    async function start() {
        showGame = true;
        init(setOptions, setSettings, setSAK, settingsModal, optionModal, sakModal);
    }

    const setOptions = (stat:boolean) => { optionModal.show(stat); };
    const setSettings = (stat:boolean) => { settingsModal.show(stat); };
    const setSAK = (stat:boolean) => { sakModal.show(stat); };

    $afterPageLoad(() => { $showProject = false; });
    $beforeUrlChange((event, route) => {
        if (route.path.indexOf('/projects') > -1 && !$navCheck) $showProject = true;
        return true;
    });
</script>

<div id="pongContainer">
	<div class="game-container{showGame ? '' : ' hidden'}">
        <div class="header">
            <div class="score-container">
              <h2 id="p1-score" style="color: $font-color;">P1: 0</h2>
            </div>
            <div id="title" class="title-div" style="width: 100px; height: 50px;">
              <h2 class="title-header">Pong</h2>
            </div>
            <div class="score-container">
              <h2 id="p2-score" style="color: $font-color;">P2: 0</h2>
            </div>
        </div>
        <div id="canvas-container" class="canvas-container">
            <canvas id="gameBoard" style="position: absolute; background: black; z-index: 1;"></canvas>
        </div>

        <Modal id="settingsModal" bind:this={settingsModal} showing='{false}'>
            <div class="settings-modal-content">
                <div id="p1-up-div" class="settings-button-div">
                    <h3 style="color:$font-color">Player 1 paddle up mapping</h3>
                    <button type="button" class="p1-up-button" id="p1PaddleUpButton">W</button>
                </div>
                <div id="p1-down-div" class="settings-button-div">
                    <h3 style="color:$font-color">Player 1 paddle down mapping</h3>
                    <button type="button" class="p1-down-button" id="p1PaddleDownButton">S</button>
                </div>
                <div id="p2-up-div" class="settings-button-div">
                    <h3 style="color:$font-color">Player 2 paddle up mapping</h3>
                    <button type="button" class="p2-up-button" id="p2PaddleUpButton">ArrowUp</button>
                </div>
                <div id="p2-down-div" class="settings-button-div">
                    <h3 style="color:$font-color">Player 2 paddle down mapping</h3>
                    <button type="button" class="p2-down-button" id="p2PaddleDownButton">ArrowDown</button>
                </div>
        
                <div id="reset-div" class="settings-button-div">
                    <h3 style="color:$font-color">Reset Game mapping</h3>
                    <button type="button" class="reset-button" id="resetButton">Space</button>
                </div>
                <div id="pause-div" class="settings-button-div">
                    <h3 style="color:$font-color">Pause Game mapping</h3>
                    <button type="button" class="pause-button" id="pauseButton">Esc</button>
                </div>
                <div class="back-button-div">
                    <button type="button" class="back-button" id="backButton">Back</button>
                </div>
            </div>
        </Modal>
    
        <Modal id="optionModal" bind:this={optionModal} showing='{true}'>
            <div class="option-modal-content">
                <button type="button" class="playButton" id="playButton">PLAY</button>
                <button type="button" class="supportButton" id="supportButton">SUPPORT</button>
                <button type="button" class="settingsButton" id="settingsButton">SETTINGS</button>
            </div>
        </Modal>
    
        <Modal id="sakModal" bind:this={sakModal} showing='{false}'>
            <div class="sak-div">
                <div class="sak-div-content">
                    <h2 class="sak-header">Press Any Key.</h2>
                </div>
            </div>
        </Modal>
    </div>
    <div class="start-cont{!showGame ? '' : ' hidden'}">
        <div class="btn" on:click|stopPropagation="{start}">
            <div>Click to Start</div>
        </div>
    </div>
</div>

<style lang="scss">
	$grey-primary: #252525;
	$grey-secondary: #383838;
	$font-color: rgb(231, 231, 231);
	$bud-green: #82b74bff;
    $bud-green__hover: rgb(138, 194, 78);

    #pongContainer {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .game-container {
            height: 645px;

            position: relative;

            .header {
                height: 45px;
                width: 600px;
                background: $bud-green;
                display: flex;
                column-gap: 7em;
                flex-direction: row;
                align-items: center;
                justify-content: space-around;

                .title-div {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                }
                .title-header {
                    color: $font-color;
                    font-family: 'Source Sans Pro', sans-serif;
                }
                .score-container { font-family: 'Source Sans Pro', sans-serif; }
            }

            .settings-modal-content {
                left: 38%;
                background-color: transparent;
                margin: 5%; /* 15% from the top and centered */
                padding: 20px;
                border: 1px solid $bud-green;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                border-radius: 10px;
                height: 490px;

                .p1-up-button {
                    width: 100px;
                    padding: 10px;
                    color: $font-color;
                    background-color: transparent;
                    border: 1px solid $bud-green;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: all .3s ease-in-out;
                }

                .p1-down-button {
                    width: 100px;
                    padding: 10px;
                    color: $font-color;
                    background-color: transparent;
                    border: 1px solid $bud-green;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: all .3s ease-in-out;
                }

                .p2-up-button {
                    width: 100px;
                    padding: 10px;
                    color: $font-color;
                    background-color: transparent;
                    border: 1px solid $bud-green;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: all .3s ease-in-out;
                }

                .p2-down-button {
                    width: 100px;
                    padding: 10px;
                    color: $font-color;
                    background-color: transparent;
                    border: 1px solid $bud-green;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: all .3s ease-in-out;
                }

                .reset-button {
                    width: 100px;
                    padding: 10px;
                    color: $font-color;
                    background-color: transparent;
                    border: 1px solid $bud-green;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: all .3s ease-in-out;
                }

                .pause-button {
                    width: 100px;
                    padding: 10px;
                    color: $font-color;
                    background-color: transparent;
                    border: 1px solid $bud-green;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: all .3s ease-in-out;
                }

                .back-button {
                    width: 100px;
                    padding: 10px;
                    margin-bottom: 15px;
                    color: $font-color;
                    background-color: transparent;
                    border: 1px solid $bud-green;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: all .3s ease-in-out;
                }

                .back-button:hover { transform: scale(1.2); }

                .settings-button-div {
                    width: 500px;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                }
            }

            .option-modal-content {
                left: 38%;
                background-color: transparent;
                margin: 5%; /* 15% from the top and centered */
                padding: 20px;
                border: 1px solid $bud-green;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                border-radius: 10px;

                .playButton {
                    width: 100px;
                    padding: 10px;
                    color: $font-color;
                    background-color: transparent;
                    border: 1px solid $bud-green;
                    border-radius: 5px;
                    cursor: pointer;
                    margin-bottom: 15px;
                    transition: all .3s ease-in-out;
                }

                .playButton:hover { transform: scale(1.2); }

                .settingsButton {
                    width: 100px;
                    padding: 10px;
                    color: $font-color;
                    background-color: transparent;
                    border: 1px solid $bud-green;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: all .3s ease-in-out;
                }

                .settingsButton:hover { transform: scale(1.2); }

                .supportButton {
                    width: 100px;
                    padding: 10px;
                    margin-bottom: 15px;
                    color: $font-color;
                    background-color: transparent;
                    border: 1px solid $bud-green;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: all .3s ease-in-out;
                }

                .supportButton:hover { transform: scale(1.2); }
            }

            .sak-div {
                position: fixed;
                overflow: auto;
                width: 400px;
                top: 300px;

                .sak-div-content {
                    left: 38%;
                    background-color: transparent;
                    margin: 5%; /* 15% from the top and centered */
                    padding: 20px;
                    border: 1px solid $bud-green;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                    border-radius: 10px;
                }
                .sak-header { color: $font-color; }
            }
        }

        .start-cont {
            width: 100%;
            height: 100%;

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .btn {
                height: 30px;
                width: 100px;

                cursor: pointer;
                background-color: $bud-green;

                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                border-radius: 10px;

                &:hover { background-color: $bud-green__hover; }
            }
        }

        .hidden { display: none; }
    }
</style>