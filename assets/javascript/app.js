$(document).ready(function() {
var cylons = ["cylon1.jpg", "cylon2.jpg", "cylon3.jpg", "cylon4.jpg", "cylon5.jpg", "cylon6.jpg", "cylon7.jpg", "cylon8.jpg", "cylon9.jpg", "cylon10.jpg", "cylon11.jpg", "cylon12.jpg"];
var humans = ["human1.jpg", "human2.jpg", "human3.jpg", "human4.jpg", "human5.jpg", "human6.jpg", "human7.jpg", "human8.jpg", "human9.jpg", "human10.jpg", "human11.jpg", "human12.jpg", "human13.jpg", "human14.jpg", "human15.jpg", "human16.jpg", "human17.jpg", "human18.jpg", "human19.jpg", "human20.jpg", "human21.jpg", "human22.jpg", "human23.jpg", "human24.jpg", "human25.jpg", "human26.jpg", "human27.jpg", "human28.jpg", "human29.jpg", "human30.jpg", "human31.jpg", "human32.jpg", "human33.jpg", "human34.jpg", "human35.jpg", "human36.jpg"];
var spentHumans = [];
var spentCylons = [];
var timeLeft=5;
var rightGuess = 0;
var wrongGuess = 0;


$(".container").on("click", "#startBtn", choose);

    function choose() {
        console.log(spentCylons);
        
        $("#gameArea").empty();
        if (spentCylons.length===12) {
            //display stats
            console.log("DONE!");
        }
        else {
            timeLeft = 5;
            // Generates a group of 3 humans and 1 cylon into imgTray
            
                var imgTray = [];
                k=0;
                while (k<3) {
                    var humanVar = humans[Math.floor(Math.random()*humans.length)];
                    //console.log(humanVar);
                    if (spentHumans.indexOf(humanVar)===-1) {
                        spentHumans.push(humanVar);
                        imgTray.push(humanVar);
                        k++;
                    }
                }
                cylonPop = true;
                while (cylonPop) {
                    var cylonVar = cylons[Math.floor(Math.random()*cylons.length)];
                    if (spentCylons.indexOf(cylonVar)===-1) {
                        spentCylons.push(cylonVar);
                        imgTray.push(cylonVar);
                        cylonPop = false;
                    }
                }
                //console.log(imgTray);
                //next we randomize imgTray
                var cylonShuffle = [];
                j=0;
                while (j<4) {
                    var shuffledOption = imgTray[Math.floor(Math.random()*4)];
                    if (cylonShuffle.indexOf(shuffledOption)===-1) {
                        cylonShuffle.push(shuffledOption);
                        j++;
                    }
                }
                console.log(cylonShuffle);
                //now we populate the four clickable images
                for (l=0; l<4; l++) {
                    var colonistIcon = $("<img>");
                    colonistIcon.addClass("possibleToaster");
                    colonistIcon.attr("src", "assets/images/"+cylonShuffle[l]);
                    colonistIcon.attr("alt", cylonShuffle[l]);
                    colonistIcon.attr("id", cylonShuffle[l]);
                    $("#gameArea").append(colonistIcon);
                }
                
                
                
                $("#gameArea").on("click", ".possibleToaster", function(){
                    var shuffleId = $(this).attr("id");
                    console.log(shuffleId);
                    var imgPosition = (imgTray).indexOf(shuffleId);
                    console.log(imgPosition);
                    clearTimeout(timerVar);
                    if (imgPosition===3) {
                        cylonDetector = true;
                        correct();
                        console.log("CYLON!");
                    }
                    else {
                        incorrect();
                    }
                });
            }
        
            var timerVar = setInterval(timer, 1000);
            function timer() {
                console.log(timeLeft);
                if (timeLeft == 0) {
                    clearTimeout(timerVar);
                    incorrect();
                }
                else {
                    $("#timer").empty();
                    $("#timer").append("<h2>You have "+timeLeft+" seconds remaining.</h2>");
                    timeLeft--;
                }
            }
        
    }
    
    function incorrect() {
        setTimeout(choose, 3000);
        wrongGuess++;
        $("#gameArea").empty();
        $("#gameArea").append("<h1>YOU'RE DEAD.</h1>");
    }
    function correct() {
        //add a timer here
        setTimeout(choose, 3000);
        rightGuess++;
        $("#gameArea").empty();
        $("#gameArea").append("<h1>CYLON IDENTIFIED.</h1><p>Well done, cadet.</p>");
    }
});