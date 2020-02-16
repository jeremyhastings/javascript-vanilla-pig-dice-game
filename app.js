/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Game Variables

var activePlayer, finalScore, gamePlaying, previousRoll, roundScore, scores;

newGame();

// https://developer.mozilla.org/en-US/docs/Web/Events
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // Using anonymous function instead of calling one.
        
        // 1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;
        if(dice === 6 && dice === previousRoll) {
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            nextPlayer();
        } else {
            previousRoll = dice;
            // 2. Display the result.
            var diceDOM = document.querySelector('.dice')
            diceDOM.style.display = 'block';
            diceDOM.src = 'dice-' + dice +'.png';
            // 3. Update the round score IF the rolled number is not 1.
            if (dice !== 1) {
                // Add Score
                roundScore += dice;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            } else {
                nextPlayer();
            }
        }
    }
}); // Callback function, function called by a function.

document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        // Add Active Player current score to global score.
        scores[activePlayer] += roundScore;
        roundScore = 0;
        // Update UI.
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;

        input = true ? finalScore = input : finalScore = 100;
        // if(input) {
        //     finalScore = input;
        // } else {
        //     finalScore = 100;
        // }
        
        // Check if Player won the game.
        if(scores[activePlayer] >= finalScore) {
            // Declare Active Player Winner
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('winner');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', newGame);

function nextPlayer() {
        // Next Player
        // if (activePlayer === 0) {
        //     activePlayer = 1;
        // } else {
        //     activePlayer = 0;
        // }

        // Current Score gets zeroed out.
        roundScore = 0;
        
        // Zero out current Active Player's current score.
        document.getElementById('current-' + activePlayer).textContent = roundScore;

        // Remove Active from current Active Player
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

        // Change Active Player
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

        // Add Active to new Active Player
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');

        // Make Dice Disappear
        document.querySelector('.dice').style.display = 'none';
        // Could use Toggle but seems better this way to me.
        // document.querySelector('.player-0-panel').classList.toggle('active');
        // document.querySelector('.player-1-panel').classList.toggle('active');

        // Zero out previousRoll
        previousRoll = 0;
}

function newGame() {
    activePlayer = 0;
    roundScore = 0;
    scores = [0, 0];
    gamePlaying = true;

    // Zero out scores
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // Hide Dice at start of game.
    document.querySelector('.dice').style.display = 'none';

    // Make sure players are named players and not winners.
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';

    // Remove Winner Class from both players.
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    // Remove Active Class from both players.
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    // Make Player 1 the Active Player
    document.querySelector('.player-0-panel').classList.add('active');
}

// DICE /////////////
// console.log(dice);
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
// var x = document.querySelector('#score-0').textContent;
// console.log(x);
// document.querySelector('#current-' + activePlayer).textContent = dice;
