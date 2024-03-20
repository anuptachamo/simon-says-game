/**
 *  ?Simon Says Game
 *      step 1: started game
 *      step 2: levelUp game
 *      step 3: if gameOver, reset all and press any key to start a game
 */

let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (started == false) {
    //game started vako xna
    console.log("Game is started");
    started = true; //game started vayo

    levelUp(); //call levelUp function
  }
});

function gameFlash(btn) {
  btn.classList.add("flash"); //add new class name

  //   remove gameflash btn in 1 sec vaneko
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userflash"); //add new class name

  //   remove userflash btn in 1 sec vaneko
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

function levelUp() {
  userSeq = []; //userSeq will be reset
  level++;
  h2.innerText = `Level ${level}`; //h2 ko value innerText ma baseko print hune

  //   random btn choose
  let randIdx = Math.floor(Math.random() * 3);
  let randomColor = btns[randIdx];
  let randomBtn = document.querySelector(`.${randomColor}`);

  // console.log(randIdx); //kun random index choose gareko tyo show hune vayo
  // console.log(randomColor); //kun random color choose vako tyo show hune vayo
  // console.log(randomBtn);
  gameSeq.push(randomColor);
  console.log(gameSeq);
  gameFlash(randomBtn);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000); //if userSeq and gameSeq match then after 1sec paxii matra level up hunxa
    }
  } else {
    h2.innerHTML = `Game Over! Your score was <b>${level}</b><br> Press any key to start.`;

    document.querySelector("body").style.backgroundColor = "red"; //gameover vaye paxi body ma red color show hunxa

    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white"; //gameover vaye paxi body ma red color show hunxa ani 150ms paxi white show hunxa
    }, 150); //150 mili-sec paxi back to previous

    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  //kun id ko button laii press gareko teslaii track garxa
  userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1); //checking last button
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

// after game over reseting all
function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
