var gamePattern = [];

var userClickedPattern = [];

const buttonColors = ["red", "blue", "green", "yellow"];

var level = -1;

// create a random color sequence and push it into the gamePattern
// will change the number of the level each time the function is called
function nextSequence () {
    userClickedPattern = [];
    level++;
    $("h1").text("Lv" + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    buttonSound(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(120).fadeOut(120).fadeIn(120);
}

// to retrieve back the color of the button user has pressed
// it will also check the answer each time the user press a button
$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    
    buttonSound(userChosenColor);
    animatePress(userChosenColor);
    
    checkAnswer(userClickedPattern.length - 1);
});

// the function to produce the sound of the button
function buttonSound (color) {
    var buttonAudio = new Audio ("sounds/" + color + ".mp3");
        buttonAudio.play();
}

// animation of the button when the button is pressed 
function animatePress (color) {
    $("#" + color).addClass("pressed");

    setTimeout(function () {
        $("#" + color).removeClass("pressed");
    }, 100);
}

// game start when user press a key and will start to countdown from 3 to 1
// setting startedToToggle as a a flag 

// let startedToToggle = true;

// $(document).keypress(function() {
//     if (startedToToggle) {
//         // setTimeout(nextSequence, 4000); // this can put inside the else it will also call the nextSequence function after 3 seconds
//         let count = 3;
//         const interval = setInterval(function () {
//                             if (count > 0) {
//                                 $("h1").html("Game Start in " + count);
//                                 count--;
//                             } else {
//                                 clearInterval(interval);
//                                 nextSequence();
//                             }
//                         }, 1000);
        
//         startedToToggle = false;
//     } else {
//         return;
//     }
// });

// ********************************************************************
let startedToToggle = true;

$(document).keypress(function () {
    if(startedToToggle) {
        let count = 3;
        const interval = setInterval(function () {
            if (count > 0) {
                $("h1").text("Game Start in " + count);
                count--;
            } else {
                clearInterval(interval);
                nextSequence();
            }
        }, 1000);

    startedToToggle = false;
    }
});




function checkAnswer (currentLevel) {
    
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

// it resets the level, gamePattern and the flag for the game to start
function startOver () {
    level = -1;
    gamePattern = [];
    startedToToggle = true;
}