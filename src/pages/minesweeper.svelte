<script lang="ts">
    import { onMount } from "svelte";
    import { createBoard } from "../components/minesweeper/index";
    
    function selectionHandler(): void {

    }

    onMount(() => {
        createBoard();
    });
</script>

<main>
	<div class="page-centerer">
        <div class="game-container">
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
    
        <div id="looseModal" class="modal">
            <div class="modal-content">
                <h1 class="looseModalH1">Game Over</h1>
                <h3>Time: </h3>
                <button type="button" class="newGameButton" id="newGameOnLooseButton">NEW GAME</button>
            </div>
        </div>
    
        <div id="winModal" class="modal">
            <div class="modal-content">
                <h1 class="winModalH1">You Won!</h1>
                <h3>Time: </h3>
                <button type="button" class="newGameButton" id="newGameOnWinButton">NEW GAME</button>
            </div>
        </div>
    </div>
</main>

<style lang="scss">
	$grey-primary: #252525;
	$grey-secondary: #383838;
	$font-color: rgb(231, 231, 231);
	$bud-green: #82b74bff;
    $bud-green__hover: rgb(138, 194, 78);

    main {
        .game-container {
            display: grid;
            grid-template-rows: min(13.333vw, 60px) 1fr;
        }
        .flags-left {
            width: 50%;
            height: 50%;
            display: flex;
            flex-direction: row;
            align-items: center;
        }
        .header {
            background: #e89c0e;
            display: flex;
            column-gap: 7em;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
        }

        .canvas-container {
            position: relative;
        }
        .flags-left__img {
            height: 93.33%;
        }
    }
</style>