let order =[];
let playerOrder = [];
let flash;
let count;
let Playergood;
let computerTurn;
let inervalid;
let win;

const turnCounter = document.querySelector("#turn");
const green = document.querySelector("#green");
const red = document.querySelector("#red");
const yellow = document.querySelector("#yellow");
const blue = document.querySelector("#blue");
const startButton = document.querySelector("#start");

startButton.addEventListener('click',(e) =>{
       play();
   
});

function play(){
    win = false;
    order = [];
    playerOrder = [];
    flash = 0;
    intervalId = 0;
    count = 1;
    turnCounter.innerHTML = 1;
    Playergood = true;
    for(let i=0; i<20; i++){
        order.push(Math.floor(Math.random()*4) + 1);
    }
    computerTurn = true;

    inervalid = setInterval(gameturn , 1000 );
}

function gameturn(){
    if(flash == count){
        clearInterval(intervalId);
        computerTurn = false;
        clearColor();
    }

    if (computerTurn) {
       clearColor();
       setTimeout(() => {
       if (order[flash] == 1){
        one();
       } 
       if (order[flash] == 2) {
        two();
       }
       if (order[flash] == 3) {
        three();
       }
       if (order[flash] == 4){
        four();
       } 
       flash++;
    }, 200);
  }
}

 function one() {
    green.style.backgroundColor = "lightgreen";
  }

  function two() {
    red.style.backgroundColor = "yellow";
  }

  function three() {
    blue.style.backgroundColor = "lightblue";
  }

  function four() {
     yellow.style.backgroundColor = "white";
  }

  function flashColor() {
    green.style.backgroundColor = "lightgreen";
    red.style.backgroundColor = "tomato";
    blue.style.backgroundColor = "lightskyblue";
    yellow.style.backgroundColor = "yellow";
  }

  function clearColor() {
    green.style.backgroundColor = "darkgreen";
    red.style.backgroundColor = "darkred";
    blue.style.backgroundColor = "darkblue";
    yellow.style.backgroundColor = "goldenrod";
  }

  green.addEventListener('click', (event) => {
      playerOrder.push(1);
      check();
      one();
      if(!win) {
        setTimeout(() => {
          clearColor();
        }, 300);
      }
  })

  red.addEventListener('click', (event) => {
    playerOrder.push(2);
    check();
    two();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }

  })

  blue.addEventListener('click', (event) => {
    playerOrder.push(3);
    check();
    three();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }

  })

  yellow.addEventListener('click', (event) => {
    playerOrder.push(4);
    check();
    four();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }

  })
  
  function check(){
     // Condition when player win
    if(playerOrder.length == 3 && playerOrder ){
      winGame();
    }
    // Condtion when player failed
    if(playerOrder[playerOrder.length -1] !== order[playerOrder.length -1] ){
      Playergood = false;
    }

    if(Playergood == false){
      flashColor();
      turnCounter.innerHTML = "No !";
      setTimeout(() => {
        turnCounter.innerHTML = count;
        clearColor();
      }, 800 );
    }
      // Codition when player still playing 
      if(Playergood && playerOrder.length == count && !win){
        count++;
        playerOrder = [];
        computerTurn = true;
        flash = 0;
        turnCounter.innerHTML = count;
        inervalid = setInterval(gameturn, 1000);
      }
}

function winGame() {
  flashColor();
  turnCounter.innerHTML = "WIN!";
  win = true;
}