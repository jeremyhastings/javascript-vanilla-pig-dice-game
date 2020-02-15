/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Game Variables

var activePlayer, dice, roundScore, scores;

activePlayer = 0;
dice = Math.floor(Math.random() * 6) + 1;
roundScore = 0;
scores = [0, 0];

// Hide Dice at start of game.
document.querySelector('.dice').style.display = 'none';

document.querySelector('#current-' + activePlayer).textContent = dice;

var x = document.querySelector('#score-0').textContent;
console.log(x);



// DICE /////////////
// console.log(dice);
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';