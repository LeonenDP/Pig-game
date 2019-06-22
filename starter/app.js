/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*
how to get a random number 1-6 for the dice:

- Math.random() returns us a random number between 0 and 1.
- Math.random() * 6  Will return a number between 0 and 6.
- The Math.floor() function returns the largest integer less than or equal to a given number.
- Use Math.floor on the value Math.random returns:
- Math.floor(Math.random() * 6) Will return a number between 0-5 (because of Math.floor) so let's add 1 to it.
*/

/*
How to 'throw the dice'?

- document.query selector() is used to select an element i n the document, like Jquery.
- Inside document.query selector(), there is the selector, in our case, it is id='current-0' (**where current score is 11),
- Then, change the 0 to the activePlayer var, and change it's content to be the dice result.

document.querySelector('#current-' + activePlayer).textContent = dice;
-Now, instead of replacing the text content, let's change the innerHtml:

document.querySelector('#current-' + activePlayer).innerHTML = '<em> ' + dice + '</em>';;
- innerHTML let me use html code inside, for example, the <em> tag(emphasize)

 */

// Let's set up some variables we can use everywhere
var scores, roundScore, activePlayer, gamePlaying, throwSixInRow;

// the init function starts a new game (resets scores, removes the winner and active classes)
init();





// Adding an event listener to the 'roll dice' button:
document.querySelector('.btn-roll').addEventListener('click', function () {

    if(gamePlaying) {

        // 1. Random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        // var dice1 = 6;
        // var dice2 = 6;
        // 2. Display result :
        showDice();
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        // 3. Update round score, IF the rolled number is NOT 1
        if (dice1 === 6 && dice2 === 6){
            alert('6 on both dices resets your OVERALL score ;(');
            nextPlayer();

            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            nextPlayer();
        }

        else if (dice1 !== 1 && dice2 !==1) {
            //add score
            roundScore += dice1 +dice2;
            // Display score in UI
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }

        // If the dice is 1
        else {
            document.querySelector('.game-info').textContent = '1 resets this round score.';
            setTimeout(nextPlayer, 1000);
        }


    }

});

    /* ******************** The HOLD button ******************** */

    // Select the button and add an event listener:
    document.querySelector('.btn-hold').addEventListener('click', function () {
        if (gamePlaying){
            // Add current score to global score
            scores[activePlayer] += roundScore;

            // Update the UI
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

            var input = document.querySelector('.final-score').value;
            var winningScore;

            if(input){
                winningScore = input;
            } else {
                // deafult final score is 100
                winningScore = 100;
            }
            // Check if player won the game
            if (scores[activePlayer] >= winningScore){
                announceWinner();
            } else {
                // Next player
                nextPlayer();
            }
        }
    });

    /* ******************** The NEW GAME button ******************** */

        //Target the button
        document.querySelector('.btn-new').addEventListener('click', init);




        /*
        ___________________________________________________

        ******************** FUNCTIONS ********************
        ___________________________________________________
         */

        // The init function starts a new game.
    function init() {
        // declare new scores.
        scores = [0,0];
        roundScore = 0;
        activePlayer = 0;
        gamePlaying = true;
        throwSixInRow = 0;

        // The methods used here on the dice class, first style, then 'display' (CSS property), then 'none' (Value).
        hideDice();

        document.getElementById('score-0').textContent = '0';
        document.getElementById('score-1').textContent = '0';
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        document.getElementById('name-0').textContent = 'Player 1';
        document.getElementById('name-1').textContent = 'Player 2';

        document.querySelector('.player-0-panel').classList.remove('winner');
        document.querySelector('.player-1-panel').classList.remove('winner');
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.remove('active');
        document.querySelector('.player-0-panel').classList.add('active');
    }


    
    function nextPlayer() {
        // next player
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        // same as writing if (activePlayer === 0){activePlayer = 1} else {activePlayer = 0}
        roundScore = 0;
        throwSixInRow = 0;

        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        // document.querySelector('.player-0-panel').classList.remove('active');
        // document.querySelector('.player-1-panel').classList.add('active');

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        document.querySelector('.game-info').textContent = '';
// hide the dice again
        hideDice();
    }



function announceWinner() {
    // Change active player name to 'Winner'
    document.getElementById('name-' + activePlayer).textContent = 'Winner!';
    // Hide the dice
    hideDice();
    // Announce a winner
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('.winner');
    // Remove the 'active' class
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    gamePlaying = false;
}

// Handling dice images:
    // show the dices
function showDice (){
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
}
 // hide the dices
function hideDice (){
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}






















