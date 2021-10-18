<script lang="ts">
    import { afterPageLoad, beforeUrlChange } from "@roxi/routify";

    import { init, createBoard } from "../components/minesweeper/index";
    import { navCheck, showProject } from "../Stores";
    import Dropdown from "./_utils/dropdown.svelte";
    import Modal from "./_utils/Modal.svelte";

    let difficulty:string;
    $: difficulty = "Easy";
    
    let showGame:boolean;
    $: showGame = false;
    let winModal:Modal;
    let lossModal:Modal

    async function start() { showGame = true; init(setWin, setLoss); await createBoard(difficulty); }

    const setWin = (stat:boolean) => { winModal.show(stat); };
    const setLoss = (stat:boolean) => { lossModal.show(stat); };

    $afterPageLoad(() => { $showProject = false; });
    $beforeUrlChange((event, route) => {
        if (route.path.indexOf('/projects') > -1 && !$navCheck) $showProject = true;
        return true;
    });

    async function callback(e:Event) { const elem = <HTMLElement>e.currentTarget; difficulty = elem.innerHTML; await createBoard(difficulty); }
</script>

<div id="minesweeperCont">
	<div class="game-container{showGame ? '' : ' hidden'}">
        <div id="ms-header" class="header">
            <div class="diff-menu" style="width: min(22.222vw, 100px); height: min(8vw, 36px); margin: 0px 10px;">
                <Dropdown config={{
                    "default": "Easy",
                    "values": [
                        "Easy",
                        "Medium",
                        "Hard"
                    ]
                }} clickCallback={callback} />
            </div>
            <div class="flags-left">
                <img src="./img/projs/flag.png" alt="flags" class="flags-left__img">
                <h2 id="flagsLeft" style="color: white; font-size: min(4.314159292035399vw, 19.5px); font-family: 'Baloo Tamma 2'">0</h2>
            </div>
        </div>
        <div id="canvas-container" class="canvas-container">
            <canvas id="gameBoard" style="position: absolute;"></canvas>
        </div>

        <Modal id="looseModal" bind:this={lossModal} showing='{false}'>
            <h1 class="looseModalH1">Game Over</h1>
            <h3>Time: </h3>
            <button type="button" class="newGameButton" id="newGameOnLooseButton">NEW GAME</button>
        </Modal>
    
        <Modal id="winModal" bind:this={winModal} showing='{false}'>
            <h1 class="winModalH1">Game Over</h1>
            <h3>Time: </h3>
            <button type="button" class="newGameButton" id="newGameOnWinButton">NEW GAME</button>
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

    #minesweeperCont {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;

        .game-container {
            margin-top: 10%;

            position: relative;

            .header {
                height: 40px;
                background-color: $bud-green;

                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-start;

                .diff-menu { width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; }
                .flags-left { width: 50%; height: 50%; display: flex; flex-direction: row; align-items: center; }
                .flags-left__img { height: 93.33%; }
            }
            .canvas-container { position: relative; }
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