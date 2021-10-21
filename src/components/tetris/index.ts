import { Point } from './Point'
import { Tetronimo } from './Tetronimo'
import type Modal from "./_utils/Modal.svelte";

let h_canvas:HTMLCanvasElement;
let h_ctx:CanvasRenderingContext2D;

let canvas:HTMLCanvasElement;
let ctx:CanvasRenderingContext2D;

let v_canvas:HTMLCanvasElement;
let v_ctx:CanvasRenderingContext2D;

let ctrlsList = ["Escape", " ", "s", "a", "d", "q", "e"];
let btnIdList = ["pauseButton", "resetButton", "downButton", "leftButton", "rightButton", "rLeftButton", "rRightButton"];

let upcomingPieceList = [];
let boardMatrix = []
let currentT = null;
let tempT = null;

let isPaused = false;
let hasLocked = false;
let gameOver = false;
let wasSentToHold = false;
let isBeingHeld = false;
let level = 1;

let showGameOverModel = () =>{}

export function init(setOptions:Function, setSettings:Function, setSAK:Function, setLoss:Function, settingsModal:Modal, optionModal:Modal, sakModal:Modal, lossModal:Modal) {
  showGameOverModel = () => { setLoss(true); }
  h_canvas = <HTMLCanvasElement>document.getElementById("holdingBoard");
  h_ctx = h_canvas.getContext("2d");

  h_canvas.width = 150;
  h_canvas.height = 150;

  canvas = <HTMLCanvasElement>document.getElementById("gameBoard");
  ctx = canvas.getContext('2d');

  canvas.width = 300;
  canvas.height = 600;

  v_canvas = createVCanvas(canvas.width, canvas.height);
  v_canvas.className = "vCanvas";
  document.getElementById("canvas-container").appendChild(v_canvas);
  v_ctx = v_canvas.getContext('2d');

  document.getElementById("backButton").onclick = function(){ setSettings(false); setOptions(true); }
  document.getElementById("downButton").onclick = function(e){ displaySAKDiv("downButton", 4); }
  document.getElementById("leftButton").onclick = function(e){ displaySAKDiv("leftButton", 4); }
  document.getElementById("rightButton").onclick = function(e){ displaySAKDiv("rightButton", 2); }
  document.getElementById("rLeftButton").onclick = function(e){ displaySAKDiv("rLeftButton", 5); }
  document.getElementById("rRightButton").onclick = function(e){ displaySAKDiv("rRightButton", 6); }
  document.getElementById("resetButton").onclick = function(e){ displaySAKDiv("resetButton", 1); }
  document.getElementById("pauseButton").onclick = function(e){ displaySAKDiv("pauseButton", 0); }

  function displaySAKDiv(btnId:string, btnIndex:number){
    setSettings(false);
    setSAK(true);
    document.addEventListener('keydown', (e) => {
      let isAssigned = [];
      let i = 0;
      for(let elem of ctrlsList){
        if (elem == e.key && btnIdList[i] != btnId){
          isAssigned[0] = true;
          isAssigned[1] = i;
          break;
        }
        i++;
      }
      if(isAssigned[0]){
        let confirmed = window.confirm("Another control is already bound to this. Are you sure you want to override?");
        if (confirmed){
          if (e.key == " "){
            document.getElementById(btnId).innerHTML = "Space";
            ctrlsList[btnIndex] = " ";
          } else {
            let keyInfo = getKeyPressed(e);
            document.getElementById(btnId).innerHTML = keyInfo[0];
          }
          ctrlsList[isAssigned[1]] = "none";
          document.getElementById(btnIdList[isAssigned[1]]).innerHTML = "none";
        }
        setSAK(false);
        setSettings(true);
      } else {
        if (e.key == " "){
          document.getElementById(btnId).innerHTML = "Space";
          ctrlsList[btnIndex] = " ";
        } else {
          let keyInfo = getKeyPressed(e);
          document.getElementById(btnId).innerHTML = keyInfo[0];
        }
        setSAK(false);
        setSettings(true);
      }
    }, {once: true});
  }

  document.body.addEventListener('keydown', function(e) {
    e.preventDefault();
    if (sakModal.isShowing() || settingsModal.isShowing()){
      return;
    } else if (!gameOver) {
      if (e.key == ctrlsList[0]) {
        let playbtn = document.getElementById("playButton");
        if (gameOver){
          playbtn.innerHTML = "PLAY";
          gameOver = false;
        } else {
          playbtn.innerHTML = "RESUME";
        }
    
        if (optionModal.isShowing()){
          setOptions(false);
          isPaused = false;
        } else {
          setOptions(true);
          isPaused = true;
        }
      }else if (!isPaused){
        if (e.key == ctrlsList[1]){
          hold();
        } else if (e.key == ctrlsList[2]){
          hardDrop();
        } else if (e.key == ctrlsList[3]){
          moveLeft();
        } else if (e.key == ctrlsList[4]){
          moveRight();
        } else if (e.key == ctrlsList[5]){
          rotateLeft();
        } else if (e.key == ctrlsList[6]){
          rotateRight();
        }
      }
    }
  });
  
  document.getElementById("playButton").addEventListener("click", function() {
    if (document.getElementById("playButton").innerHTML == "PLAY") runGame();
    isPaused = false;
    setOptions(false);
  });
  
  document.getElementById("settingsButton").addEventListener("click", function() {
    setOptions(false);
    setSettings
  });
  
  document.getElementById("playAgainButton").addEventListener("click", function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setLoss(false);
    runGame();
  });
}

function update(context, run){
  if(!isPaused && !gameOver){
    if(run % 30 == 0){
      if (isNotMoveAble()){
        hasLocked = true;
        currentT.draw(ctx);
      } else {
        context.clearRect(0, 0, canvas.width, canvas.height);
        currentT.draw(context);
  
        currentT.p1.moveDown(currentT.dy);
        currentT.p2.moveDown(currentT.dy);
        currentT.p3.moveDown(currentT.dy);
        currentT.p4.moveDown(currentT.dy);
      }
    }
  }
  if (!hasLocked && !wasSentToHold) {
    requestAnimationFrame(function(){
      run++;
      update(context, run);
    });
  } else {
    run = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (wasSentToHold){
      wasSentToHold = false;
    } else {
      if(isBeingHeld){
        isBeingHeld = false;
      }
      checkGameOver(currentT);
      if (gameOver){
        console.log(boardMatrix);
        console.log(upcomingPieceList);
        console.log(currentT);
        showGameOverModel();
      } else {
        mapTetronimoToMatrix(currentT);
        hasLocked = false;
        runner();
      }
      checkRows();
    }
    
  }
}


function drawHeldTetronimo(t){
  if (!isPaused){
    h_ctx.clearRect(0, 0, h_canvas.width, h_canvas.height);
    t.drawHeldTet(h_ctx);
  }
  if (isBeingHeld){
    requestAnimationFrame(function(){
      drawHeldTetronimo(t);
    });
  } else {
    h_ctx.clearRect(0, 0, h_canvas.width, h_canvas.height);
  }
  
}

function hold(){
  if (!currentT.hasBeenHeld){
    currentT.hasBeenHeld = true;
    wasSentToHold = true;
    currentT.p1 = currentT.origin1;
    currentT.p2 = currentT.origin2;
    currentT.p3 = currentT.origin3;
    currentT.p4 = currentT.origin4;
    if(upcomingPieceList.length > 1){
      upcomingPieceList.splice(1, 0, currentT);
    } else if (upcomingPieceList.length == 1){
      upcomingPieceList.push(currentT);
    } else {
      tempT = currentT;
    }
    isBeingHeld = true;
    drawHeldTetronimo(currentT);
    runner();
  }
}
function runner(){
  generateNextPieceNum();
  let run = 0;
  update(v_ctx, run);
}

function isNotMoveAble(){
  let p1 = currentT.p1;
  let p2 = currentT.p2;
  let p3 = currentT.p3;
  let p4 = currentT.p4;
  if (p1.y / 30 + 1 == 20 || p2.y / 30 + 1 == 20 || p3.y / 30 + 1 == 20 || p4.y / 30 + 1 == 20){
    return true;
  } else {
    if (boardMatrix[p1.y / 30 + 1][p1.x / 30] == 1 || 
      boardMatrix[p2.y / 30 + 1][p2.x / 30] == 1 || 
      boardMatrix[p3.y / 30 + 1][p3.x / 30] == 1 || 
      boardMatrix[p4.y / 30 + 1][p4.x / 30] == 1){
      return true;
    }
  }
  return false;
}

function mapTetronimoToMatrix(t){
  let p1 = t.p1;
  let p2 = t.p2;
  let p3 = t.p3;
  let p4 = t.p4;

  boardMatrix[p1.y / 30][p1.x / 30] = 1;
  boardMatrix[p2.y / 30][p2.x / 30] = 1; 
  boardMatrix[p3.y / 30][p3.x / 30] = 1;
  boardMatrix[p4.y / 30][p4.x / 30] = 1;
}

function checkRows(){
  let numRowsRemoved = 0;
  let index = 0;
  boardMatrix.forEach((elem) => {
    let isFull = elem.every((num) => num == 1);

    if (isFull){
      numRowsRemoved++;
      ctx.clearRect(0, index * 30, 300, 30);
      let aboveCleared = ctx.getImageData(0, 0, 300, index * 30);
      ctx.clearRect(0, 0, 300, index * 30);
      ctx.putImageData(aboveCleared, 0, 30);
      boardMatrix.splice(index, 1);
      boardMatrix.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }
    index++;
  });
  if (numRowsRemoved == 1){
    addScore(100 * level);
  } else if (numRowsRemoved == 2){
    addScore(300 * level);
  } else if (numRowsRemoved == 3){
    addScore(500 * level);
  } else if (numRowsRemoved == 4){
    addScore(800 * level);
  }
}
function addScore(num){
  document.getElementById("scoreHeader").innerHTML = "Score: " + (parseFloat(document.getElementById("scoreHeader").innerHTML.substr(document.getElementById("scoreHeader").innerHTML.indexOf(" "))) + num);
  document.getElementById("scoreHolder").innerHTML = "Score: " + (parseFloat(document.getElementById("scoreHolder").innerHTML.substr(document.getElementById("scoreHolder").innerHTML.indexOf(" "))) + num);
}
function checkGameOver(t){
  let p1 = t.p1;
  let p2 = t.p2;
  let p3 = t.p3;
  let p4 = t.p4;

  if (boardMatrix[p4.y / 30] == undefined || 
    boardMatrix[p3.y / 30] == undefined || 
    boardMatrix[p2.y / 30] == undefined || 
    boardMatrix[p1.y / 30] == undefined){
    gameOver = true;
  } else {
    gameOver = false;
  }
}
async function runGame(){
  await setBoard();
  runner();
}
function generateNextPieceNum(){
  currentT = null;
  if (upcomingPieceList.length == 0){
    upcomingPieceList = generateNextSevenPieces();
  }
  currentT = upcomingPieceList.shift();
}
async function setBoard(){
  upcomingPieceList = [];
  boardMatrix = []
  currentT = null;
  tempT = null;
  
  isPaused = false;
  hasLocked = false;
  gameOver = false;
  wasSentToHold = false;
  isBeingHeld = false;
  level = 1;
  for(let i = 0; i < 20; i++){
    boardMatrix.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  }
}
function generateNextSevenPieces(){
  let toReturn = [new Tetronimo(new Point(120, 0), new Point(120, -30), new Point(150, 0), new Point(90, 0), "#a903fc", "#b638f5", 1), //T
  new Tetronimo(new Point(120, 0), new Point(90, 0), new Point(150, 0), new Point(180, 0), "#00a6ff", "#00ccff", 2), //I
  new Tetronimo(new Point(120, 0), new Point(90, 0), new Point(150, 0), new Point(90, -30), "#002fff", "#2574cf", 3), //J
  new Tetronimo(new Point(120, 0), new Point(90, 0), new Point(150, 0), new Point(150, -30), "#ff9500", "#e8ab1c", 4), //L
  new Tetronimo(new Point(120, 0), new Point(150, 0), new Point(150, -30), new Point(120, -30), "#e6e61c", "yellow", 5), //O
  new Tetronimo(new Point(120, 0), new Point(150, 0), new Point(150, -30), new Point(120, 30), "#781111", "#fa0505", 6), //S
  new Tetronimo(new Point(120, 0), new Point(150, 0), new Point(150, 30), new Point(120, -30), "#127811", "#21e61e", 7)]; //Z
  for (let i = toReturn.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [toReturn[i], toReturn[j]] = [toReturn[j], toReturn[i]];
  }
  if(!tempT == null){
    toReturn.splice(1, 0, tempT);
    tempT = null;
  }
  return toReturn;
}

function createVCanvas(width, height){
  let toReturn = document.createElement("canvas");
  toReturn.id = "v_canvas";
  toReturn.width = width;
  toReturn.height = height;
  toReturn.style.position = "absolute"
  toReturn.style.backgroundColor = "transparent";
  return toReturn;
}
function getKeyPressed(e){
  let toReturn = [e.key, e.keyCode, e.code]
  return toReturn;
}

//control methods
function canMoveLeft(){
  let p1 = currentT.p1.x;
  let p2 = currentT.p2.x;
  let p3 = currentT.p3.x;
  let p4 = currentT.p4.x;
  if (p1 / 30 == 0 || p2 / 30 == 0 || p3 / 30 == 0 || p4 / 30 == 0){
    return false;
  }
  return true;
}
function canMoveRight(){
  let p1 = currentT.p1.x;
  let p2 = currentT.p2.x;
  let p3 = currentT.p3.x;
  let p4 = currentT.p4.x;
  if (p1 / 30 == 9 || p2 / 30 == 9 || p3 / 30 == 9 || p4 / 30 == 9){
    return false;
  }
  return true;
}
function moveLeft(){
  if(canMoveLeft()){
    currentT.moveLeft();
    v_ctx.clearRect(0, 0, v_canvas.width, v_canvas.height);
    currentT.draw(v_ctx);
  }
}
function moveRight(){
  if (canMoveRight()){
    currentT.moveRight();
    v_ctx.clearRect(0, 0, v_canvas.width, v_canvas.height);
    currentT.draw(v_ctx);
  }
}
function hardDrop(){
  while (!isNotMoveAble()){
    currentT.p1.moveDown(currentT.dy);
    currentT.p2.moveDown(currentT.dy);
    currentT.p3.moveDown(currentT.dy);
    currentT.p4.moveDown(currentT.dy);
    v_ctx.clearRect(0, 0, v_canvas.width, v_canvas.height);
    currentT.draw(v_ctx);
  }
  
}

function canRotate(){
  let p1 = currentT.p1.x;
  let p2 = currentT.p2.x;
  let p3 = currentT.p3.x;
  let p4 = currentT.p4.x;
  if (p1 / 30 == 0 || p2 / 30 == 0 || p3 / 30 == 0 || p4 / 30 == 0 || p1 / 30 == 9 || p2 / 30 == 9 || p3 / 30 == 9 || p4 / 30 == 9){
    return false;
  }
  return true;
}

function rotateLeft(){
  if(canRotate()){
    currentT.rotateLeft();
    v_ctx.clearRect(0, 0, v_canvas.width, v_canvas.height);
    currentT.draw(v_ctx);
  }
}
function rotateRight(){
  if(canRotate()){
    currentT.rotateRight();
    v_ctx.clearRect(0, 0, v_canvas.width, v_canvas.height);
    currentT.draw(v_ctx);
  }
}