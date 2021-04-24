// STEPS 0.

var buttonColors = ["red", "blue", "green", "yellow"]; //3.

var gamePattern = []; //4.
var userClickedPattern = []; // 9.

//16. 
var level = 0;

//15.
var firstKeypress = false;
$("body").keydown(()=>{
    if(firstKeypress === false){
        $("#level-title").text("Level " + level);
        nextSequence();
        firstKeypress = true; //?? place after calling nextSequence 
    }
})

//8.
$(".btn").click(function() {
    var userChosenColor = $(this).attr("id"); 
    userClickedPattern.push(userChosenColor); //10.

    playSound(userChosenColor); // 12.
    animatePress(userChosenColor); //13.
    
    //18.
    checkAnswer(userClickedPattern.length - 1); // indexOfLastAnswer in userClickedPattern
})

function nextSequence() {
    userClickedPattern = [];

    //17.
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4); //1.
    var randomChosenColor = buttonColors[randomNumber]; //2.
    gamePattern.push(randomChosenColor); //5.

    // 6.
    $("#" + randomChosenColor)
        .fadeOut(100)
        .fadeIn(100)
        .fadeOut(100)
        .fadeIn(100);

    //7.
    var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
    audio.play();
}

//11.
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//13.
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    
    //14.
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

//18.
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        if(gamePattern.length === userClickedPattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        //19.
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

        $("body").addClass("game-over");

        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

//20.
function startOver(){
    gamePattern = [];
    firstKeypress = false;
    level = 0;
}
