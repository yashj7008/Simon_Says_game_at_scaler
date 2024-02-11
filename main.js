let order =[];
let playerOrder = [];
let flash;
let count;
let Playergood;
let computerTurn;
let inervalid;
let on = false;
let win;
let highestScore  = 0;
const turnCounter = document.querySelector("#turn");
const green = document.querySelector("#green");
const red = document.querySelector("#red");
const yellow = document.querySelector("#yellow");
const blue = document.querySelector("#blue");
const startButton = document.querySelector("#start");
const onButton = document.querySelector("#on");
const gameOverMessage = document.querySelector("#gameOverMessage");
const maxScore = document.querySelector("#maxScore");

const onClick_sound = new Audio();
onClick_sound.src = "./onClick_sound.wav"

const gameOver_Sound = new Audio();
gameOver_Sound.src = "./gameOver.wav"

const gameStart_sound = new Audio();
gameStart_sound.src = "./gameStart.mp3"

const winGame_sound = new Audio();
winGame_sound.src = "./winGame.wav"

onButton.addEventListener('click', (event) => {
  if (onButton.checked == true) {
    on = true;
    turnCounter.innerHTML = "-";
    gameStart_sound.play();
  } else {
    on = false;
    turnCounter.innerHTML = "";
    clearColor();
    clearInterval(inervalid);
  }
});

startButton.addEventListener('click',(e) =>{
  if (on || win) {
    play();
    gameStart_sound.play();
  }
   
});

function play(){
   // gameOver.style.display = 'none';
   
    win = false;
    order = [];
    playerOrder = [];
    flash = 0;
    inervalid = 0;
    count = 1;
    turnCounter.innerHTML = 1;
    Playergood = true;
    for(let i=0; i<20; i++){
        order.push(Math.floor(Math.random()*4) + 1);
    }
    computerTurn = true;

    inervalid = setInterval(gameturn , 800 );
}

function gameturn(){    // This function is only for computer default work
    on = false;

    if(flash == count){      
        clearInterval(inervalid);
        computerTurn = false;
        clearColor();
        on = true;
    }

    if (computerTurn) {
       clearColor();
       setTimeout(() => {
       if (order[flash] == 1){
        onClick_sound.play();
        one();
       } 
       if (order[flash] == 2) {
        onClick_sound.play();
        two();
       }
       if (order[flash] == 3) {
        onClick_sound.play();
        three();
       }
       if (order[flash] == 4){
        onClick_sound.play();
        four();
       } 
       flash++;
    }, 300);
  }
}

 function one() {
    green.style.backgroundColor = "lightgreen";
  }

  function two() {
    red.style.backgroundColor = "#db7b7b";
  }

  function three() {
    blue.style.backgroundColor = "#6c6ccf";
  }

  function four() {
     yellow.style.backgroundColor = "#e8d196";
  }

  function flashColor() {
    green.style.backgroundColor = "lightgreen";
    red.style.backgroundColor = "#db7b7b";
    blue.style.backgroundColor = "#6c6ccf";
    yellow.style.backgroundColor = "#e8d196";
  }

  function clearColor() {
    green.style.backgroundColor = "darkgreen";
    red.style.backgroundColor = "darkred";
    blue.style.backgroundColor = "darkblue";
    yellow.style.backgroundColor = "goldenrod";
  }

  green.addEventListener('click', (event) => {
    onClick_sound.play();
    if(on == true){
      playerOrder.push(1);
      check();
      one();
      if(!win) {
        setTimeout(() => {
          clearColor();
        }, 300);
      }

    }
     
  })

  red.addEventListener('click', (event) => {
    onClick_sound.play();
    if(on == true){
    playerOrder.push(2);
    check();
    two();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
    }

  })

  blue.addEventListener('click', (event) => {
    onClick_sound.play();
    if(on == true){
    playerOrder.push(3);
    check();
    three();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
  })

  yellow.addEventListener('click', (event) => {
    onClick_sound.play();
    if(on == true){
    playerOrder.push(4);
    check();
    four();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }

  })
  
  function check(){
     // Condition when player win
    if(playerOrder.length == 3 && Playergood ){
      winGame();
    }
    // Condtion when player failed
    if(playerOrder[playerOrder.length -1] !== order[playerOrder.length -1] ){
      Playergood = false;
    }

    if(Playergood == false){
      flashColor();
      gameOver_Sound.play();
      turnCounter.innerHTML = "No !";
      setTimeout(() => {
      turnCounter.innerHTML = count;
      clearColor();
      gameOverMessage.style.display = "block"; // Show the game over message
      gameOverMessage.innerHTML = `Game Over Your Score is ${count}`;
      if (count > highestScore) {
        highestScore = count;
        maxScore.innerHTML = `Highest Score: ${highestScore}`;
      }
      restartGame();
      }, 800 );

    }
      // Codition when player still playing 
      if(Playergood && playerOrder.length == count && !win){
        count++;
        playerOrder = [];
        computerTurn = true;
        flash = 0;
        turnCounter.innerHTML = count;
        inervalid = setInterval(gameturn, 800);
      }

    

}

function winGame() {
  flashColor();
  winGame_sound.play();
  turnCounter.innerHTML = "WIN!";
  on = false;
  win = true;
  gameOverMessage.style.display = "block"; // Show the game over message
  gameOverMessage.innerHTML = "Congratulations, You Win!";

  if (count > highestScore) {
    highestScore = count;
    maxScore.innerHTML = `Highest Score: ${highestScore}`;
  }

  restartGame();
}


function restartGame() {
  setTimeout(() => {
    gameOverMessage.style.display = "none"; 
   //  play();  
  }, 3000); 
}

