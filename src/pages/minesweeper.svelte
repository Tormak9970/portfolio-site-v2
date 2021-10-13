<script lang="ts">
    import { init, createBoard } from "../components/minesweeper/index";
    
    let showGame:boolean;
    $: showGame = false;
    let showWin:boolean;
    $: showWin = false;
    let showLoss:boolean;
    $: showLoss = false;

    async function start() {
        showGame = true;
        init();
        await createBoard();
    }
</script>

<div id="minesweeperCont">
	<div class="game-container{showGame ? '' : ' hidden'}">
        <div id="ms-header" class="header">
            <div id="difficulty-dropdown-menu" class="difficulty-dropdown-menu" style="width: min(22.222vw, 100px); height: min(8vw, 36px);">
                <select id="difficultySelector">
                    <option value="default">Easy</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>
            <div class="flags-left">
                <img src="./img/projs/flag.png" alt="flags" class="flags-left__img">
                <h2 id="flagsLeft" style="color: white; font-size: min(4.314159292035399vw, 19.5px);">0</h2>
            </div>
        </div>
        <div id="canvas-container" class="canvas-container">
            <canvas id="gameBoard" style="position: absolute; width: min(100vw, 450px); height: min(80vw, 360px);"></canvas>
        </div>
    </div>
    <div class="start-cont{!showGame ? '' : ' hidden'}">
        <div class="btn" on:click|stopPropagation="{start}">
            <div>Click to Start</div>
        </div>
    </div>

    <div id="looseModal" class="modal{showWin ? '' : ' hidden'}">
        <div class="modal-content">
            <h1 class="looseModalH1">Game Over</h1>
            <h3>Time: </h3>
            <button type="button" class="newGameButton" id="newGameOnLooseButton">NEW GAME</button>
        </div>
    </div>

    <div id="winModal" class="modal{showLoss ? '' : ' hidden'}">
        <div class="modal-content">
            <h1 class="winModalH1">You Won!</h1>
            <h3>Time: </h3>
            <button type="button" class="newGameButton" id="newGameOnWinButton">NEW GAME</button>
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
        justify-content: center;

        .game-container {
            .header {
                height: 60px;
                background-color: $bud-green;

                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-start;

                .flags-left {
                    width: 50%;
                    height: 50%;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                }

                .flags-left__img {
                    height: 93.33%;
                }
            }
            .canvas-container {
                position: relative;
            }
        }

        .start-cont {
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

        .hidden {
            display: none;
        }
    }
</style>