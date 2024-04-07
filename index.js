let userClickedPattern = [];

let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let level = 0;

let started = false;


// Use jQuery to detect when any of the buttons are clicked and trigger a handler function. 
// 2. Inside the handler, create a new letiable called userChosenColour to store the id of the button that got clicked.
$(`.btn`).on("click", function (){

  let userChosenColour =  $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);


  playSound(userChosenColour);
  $(`#${userChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});




function nextSequence() {
  userClickedPattern = []; //step 8------------------------------------------

  level++;
  $(`#level-title`).html(`level ${level}`);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  
  //1. Use jQuery to select the button with the same id as the randomChosenColour
  //2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
  $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name){
  
  //3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
  let audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}


function animatePress(currentColour){
  
  
    $(`#${currentColour}`).addClass("pressed");
    setTimeout(function (){
      $(`#${currentColour}`).removeClass("pressed");
    },100);
  
  
}
$(document).keydown(function (event){
    if(!started){
      nextSequence();
      started = true;
    }
});

/*------------- step 8 ------------------------------*/
function checkAnswer(currentLevel){
if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
  console.log("Sucess");

  if(gamePattern.length === userClickedPattern.length){
    setTimeout(function () {
    nextSequence();
  }, 1000);
}
}
  else{
    console.log("wrong");
    $("body").addClass("game-over");
    setTimeout(function (){
      $("body").removeClass("game-over");
    },100);
    $("h1").html("Game Over press any key to restart.");
    gameOver();
  }

}

/*------------- step 8 ------------------------------*/
function gameOver() {
  level = 0;
  gamePattern = [];
  started = false;
  playSound("wrong");
}

