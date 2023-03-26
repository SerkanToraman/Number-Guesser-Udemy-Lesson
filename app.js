/*
GAME FUNCTION:
-Player must guess a number between a min and max
-Player gets a certain amount of guesses
-Notify the player of guesses remaining
-Notify the player of the correct answer if loose
-Let player choose the play again
*/

// Game Values

let min = 1,
    max = 10,
    winningNum = getRandomNumber(min,max);
    guessesLeft = 3;
//UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assaing UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play again event listener
game.addEventListener('mousedown',function(e){
  if(e.target.className ==='play-again'){
    window.location.reload();
  }
});


//Generate a Random Number

function getRandomNumber(min,max){
  return Math.floor(Math.random()*(max-min+1))+min;
}

// Listen for guess

guessBtn.addEventListener('click',function(){
  let guess = parseInt(guessInput.value);
  //Validate
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`,'red')
  }
  //check if won
  else if(guess === winningNum){
    //Game over - won
    gameOver(true,`${winningNum} is correct!, YOU WIN!!`);
  } else {
    //Wrong Number
    guessesLeft -=1;
    if(guessesLeft===0){
    //Game over - lost
    gameOver(false,`Game over, you lost. The correct number was ${winningNum}`);
    } else{ 
    //Game continues - answer wrong
    guessInput.value = '';
    setMessage(`Your guess is wrong. You have ${guessesLeft} guess left`,'red');
    }
  }
})

//     
//Game over
function gameOver(won,msg){
    let color;
    won === true ? color = 'green' : color = 'red'
    //Change border color
    guessInput.style.borderColor = color;
    //Disable Input
    guessInput.disabled = true;
    //Set text color
    message.style.color = color;
    //Set message
    setMessage(msg);
    //Play again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
    }


function setMessage(msg,color){
  message.textContent = msg;
  message.style.color = color;
}