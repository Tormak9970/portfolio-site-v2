<script lang="ts">
    import { afterPageLoad, beforeUrlChange } from "@roxi/routify";

    // import { init } from "../components/tetris/index";
    import { navCheck, showProject } from "../Stores";
    import Modal from "./_utils/Modal.svelte";
    
    let showGame:boolean;
    $: showGame = false;
    let settingsModal:Modal;
    let optionModal:Modal;
    let sakModal:Modal;
    let lossModal:Modal;

    async function start() {
        showGame = true;
        // init(setOptions, setSettings, setSAK, setLoss, settingsModal, optionModal, sakModal, lossModal);
    }

    const setOptions = (stat:boolean) => { optionModal.show(stat); };
    const setSettings = (stat:boolean) => { settingsModal.show(stat); };
    const setSAK = (stat:boolean) => { sakModal.show(stat); };
    const setLoss = (stat:boolean) => { lossModal.show(stat); };

    $afterPageLoad(() => { $showProject = false; });
    $beforeUrlChange((event, route) => {
        if (route.path.indexOf('/projects') > -1 && !$navCheck) $showProject = true;
        return true;
    });
</script>

<div id="tetrisContainer">
	<div class="game-container{showGame ? '' : ' hidden'}">
        <div class="holding-div" style="margin-right: 80px;">
            <div id="holdHeader" class="hold-header">
                <h3>Holding</h3>
            </div>
            <div id="holdingCanvasContainer" class="holding-canvas-container">
                <canvas id="holdingBoard" style="position: absolute; background: black; z-index: 1;"></canvas>
            </div>
        </div>
        <div class="board-div">
            <div id="game-header" class="header">
                <h2 id="scoreHeader" class="score-header">Score: 0</h2>
            </div>
            <div id="canvas-container" class="canvas-container">
                <canvas id="gameBoard" style="position: absolute; background: black; z-index: 1;"></canvas>
            </div>
    
            <Modal id="settingsModal" bind:this={settingsModal} showing={false}>
                <div class="settings-modal-content">
                    <div id="down-div" class="settings-button-div">
                        <h3 class="setting-name">Hard Drop</h3>
                        <button type="button" class="p1-up-button" id="downButton">s</button>
                    </div>
                    <div id="left-div" class="settings-button-div">
                        <h3 class="setting-name">Left</h3>
                        <button type="button" class="p1-down-button" id="leftButton">a</button>
                    </div>
                    <div id="right-div" class="settings-button-div">
                        <h3 class="setting-name">Right</h3>
                        <button type="button" class="p2-up-button" id="rightButton">d</button>
                    </div>
                    <div id="r-left-div" class="settings-button-div">
                        <h3 class="setting-name">Rotate Left</h3>
                        <button type="button" class="p2-up-button" id="rLeftButton">q</button>
                    </div>
                    <div id="r-right-div" class="settings-button-div">
                        <h3 class="setting-name">Rotate Right</h3>
                        <button type="button" class="p2-up-button" id="rRightButton">e</button>
                    </div>
            
                    <div id="reset-div" class="settings-button-div">
                        <h3 class="setting-name">Hold</h3>
                        <button type="button" class="reset-button" id="resetButton">Space</button>
                    </div>
                    <div id="pause-div" class="settings-button-div">
                        <h3 class="setting-name">Pause</h3>
                        <button type="button" class="pause-button" id="pauseButton">Esc</button>
                    </div>
                    <div class="back-button-div">
                        <button type="button" class="back-button" id="backButton">Back</button>
                    </div>
                </div>
            </Modal>
        
            <Modal id="gameOverModal" bind:this={lossModal} showing={false}>
                <div class="game-over-modal-content">
                    <button type="button" class="button notLastButton" id="playAgainButton">PLAY AGAIN</button>
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

    #tetrisContainer {
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
                justify-content: center;

                .score-header {
                    color: $font-color;
                    
                }
            }

            .settings-modal-content {
                left: 38%;
                background-color: transparent;
                margin: 5%; /* 15% from the top and centered */
                padding: 20px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                border-radius: 10px;
                height: 367.5px;
                top: 100px;
                width: 300px;
                border: 1px solid $bud-green;

                .p1-up-button {
                    width: 55px;
                    height: 40px;
                    padding: 7.5px;
                    color: white;
                    background-color: transparent;
                    border: 1px solid #e89c0e;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: all .3s ease-in-out;
                }

                .p1-down-button {
                    width: 55px;
                    height: 40px;
                    padding: 7.5px;
                    color: white;
                    background-color: transparent;
                    border: 1px solid #e89c0e;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: all .3s ease-in-out;
                }

                .p2-up-button {
                    width: 55px;
                    height: 40px;
                    padding: 7.5px;
                    color: white;
                    background-color: transparent;
                    border: 1px solid #e89c0e;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: all .3s ease-in-out;
                }

                .p2-down-button {
                    width: 55px;
                    height: 40px;
                    padding: 7.5px;
                    color: white;
                    background-color: transparent;
                    border: 1px solid #e89c0e;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: all .3s ease-in-out;
                }

                .reset-button {
                    width: 55px;
                    height: 40px;
                    padding: 7.5px;
                    color: white;
                    background-color: transparent;
                    border: 1px solid #e89c0e;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: all .3s ease-in-out;
                }

                .pause-button {
                    width: 55px;
                    height: 40px;
                    padding: 7.5px;
                    color: white;
                    background-color: transparent;
                    border: 1px solid #e89c0e;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: all .3s ease-in-out;
                }

                .back-button {
                    width: 80px;
                    padding: 7.5px;
                    margin-bottom: 15px;
                    color: white;
                    background-color: transparent;
                    border: 1px solid #e89c0e;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: all .3s ease-in-out;
                }

                .back-button:hover { transform: scale(1.2); }

                .settings-button-div {
                    width: 225px;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                }

                .setting-name {
                    color: white;
                    font-size: 16px;
                    padding: 0;
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