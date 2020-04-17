let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;
$(".instruction").click(function() {
  $(".btn").toggle();
  $(".instruction").html("<h1>HOW TO PLAY</h1>" +
  "<p>1. The game has four colored buttons: red, yellow, green and blue.</p>"+
  "<p>2. Watch and pay attention to the sequence, which starts with one button.</p>"+
  "<p>3. It starts with a single tone and every level the sequence gets one tone longer.</p>"+
  "<p>4. As long as you repeat the sequence correctly, you’ll stay alive and can keep playing.</p>");
  $(".instruction").click(function() {
$(".instruction").toggle();

});
});


$(".btn").click(function() {
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);

})

$("#level-title").click(function(){
if(!started){
$(".instruction").hide();
$(".btn").show();
$("#level-title").text("Level" + level);
nextSequence();
started= true;
};
});

$(document).bind("keypress", function(e) {
  if(!started && e.keyCode == 13) {
  $(".instruction").hide();
    $(".btn").show();
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100)
}

function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("succes");
    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence()
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200)
    $("#level-title").html("<h1>GAME OVER</h1>" + "<h1>CLICK TO RESTART</h1>");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
