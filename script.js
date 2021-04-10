"use strict";

//Selecting Elements

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  //Starting Conditions
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

init();

//Fuction Defination
const switchPlayers = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//Rolling Dice Function
btnRoll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    //Displaying Dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    //Check For Rolled 1
    if (dice !== 1) {
      //Add Score To Current Score
      currentScore += dice;

      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      //Switch To 2nd Player
      switchPlayers();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //Add Current Score To Scores
    scores[activePlayer] += currentScore;

    //Displaing To Scores
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //Finish The Game
    if (scores[activePlayer] >= 100) {
      playing = false;

      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //Switching Players
      switchPlayers();
    }
  }
});

btnNew.addEventListener("click", init);
