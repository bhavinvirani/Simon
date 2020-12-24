
var buttonColour = ["red", "blue", "green", "yellow"];

var game_pattern = [];
var userClickedPattern = [];

var started = false;
var level = 0

$(document).keypress(function () {        // start initial game ()

  if (!started) {                        //checking that is game start or not.

    $("#level-title").text("Level " + level);       // add text to "#level-title"
    next_sequence();                  // calling function to get sequence of next level
    started = true;

  }
});

document.addEventListener("keypress", function (event) {   // detect key while game started

  let key = (event.key).toLocaleLowerCase();
  var keys = {
    "w": "green", "a": "yellow", "d": "red", "s": "blue",        // use dictionary to identify key
  }
  if (key === "w" || key === "a" || key === "s" || key === "d") {
    forKeys(keys[key]);
  }
  console.log(keys[key]);
})

function forKeys(keys) {

  userClickedPattern.push(keys);        

  play_sound(keys);
  animation_press(keys);

  check_answer(userClickedPattern.length - 1);
}

$(".btn").click(function () {

  var userChosenColour = $(this).attr("id");
  console.log(userChosenColour);
  userClickedPattern.push(userChosenColour);

  play_sound(userChosenColour);
  animation_press(userChosenColour);
  // console.log(userClickedPattern)

  check_answer(userClickedPattern.length - 1);
})


function check_answer(current_level) {
  if (game_pattern[current_level] === userClickedPattern[current_level]) {   // checking in both array that value of index = level is same or not
    if (userClickedPattern.length === game_pattern.length) {                 // compare size of both array if same then call function for next game pattern
      setTimeout(function () {
        next_sequence();
      }, 700);
    }
  }
  else {                                                                     // if answer is wrong
    play_sound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startover();                                                             // restart game 
  }
}


function next_sequence() {

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var random_number = Math.floor(Math.random() * 4);
  var random_color = buttonColour[random_number];

  game_pattern.push(random_color);

  $("#" + random_color).fadeIn(100).fadeOut(100).fadeIn(100);

  play_sound(random_color);
}


function play_sound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}
function animation_press(current_color) {

  $("#" + current_color).addClass("pressed")

  setTimeout(function () {
    $("#" + current_color).removeClass("pressed")
  }, 80);
}

function startover() {
  level = 0;
  game_pattern = [];
  started = false;
}
