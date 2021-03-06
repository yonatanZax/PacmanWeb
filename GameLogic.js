
var EMPTY       = 0;
var WALL        = 1;
var PACMAN      = 2;
var BISCUIT     = 3; // special power
var BLOCK       = 4;
var GHOST       = 5;
var PILL_5      = 105;
var PILL_15     = 115;
var PILL_25     = 125;


var NONE        = 4,
    UP          = 3,
    LEFT        = 2,
    DOWN        = 1,
    RIGHT       = 11,
    WAITING     = 5,
    COUNTDOWN   = 8,
    EATEN_PAUSE = 9,
    DYING       = 10;

var  heightStep,
    widthStep  ;

keysDown = {};
addEventListener("keydown", function (e) {
    if (e.code === 'KeyP') {
        if (STATE === RUNNING)
            pause();
        else if(STATE === PAUSE)
            play();
    }
    else if(STATE === RUNNING)
        keysDown[e.key] = true;
}, false);
addEventListener("keyup", function (e) {
    keysDown[e.key] = false;
}, false);

var pacmanDirection = 'right',
    gameTime;

var STATE,
    RUNNING = 1,
    PAUSE = 2,
    intervalsArr = [];

async function pause(){
    STATE = PAUSE;
    gameTime = time_elapsed;
    await clearIntervalsArr();
    myAudio.pause();
}

function  play() {
    STATE = RUNNING;
    start_time = new Date();
    clearInterval(interval);
    interval = window.setInterval(UpdatePosition, 250);
    intervalsArr.push(interval);
    myAudio.play();
}

async function ShowAlert(text){
    await pause();
    STATE = WAITING;
    showPopup(text);
    // window.alert(text);
    // play();

}

function getTick(){
    return tick;
}

function clearIntervalsArr(){
    intervalsArr.forEach(function(element){
        window.clearInterval(element);
    });
    intervalsArr = [];
}

async function Start() {
    myAudio.currentTime = 0;
    score = 0;
    tick = 0;
    // generateRandomStart();
    pac_color = "yellow";
    // var food_remain = pill_number;
    lives = 3;
    STATE = RUNNING;
    start_time = new Date();
    // Assign PACMAN location
    board = Board();
    board.initBoard();
    setHeightWidthStep();
    gameTime = time_seconds;
    specialSnack = SpecialSnack({"getTick":getTick}, board,'black', 3);
    setCharactersLocations();



    // interval = setInterval(UpdatePosition, 250);
    await clearIntervalsArr();
    play();
}

function setCharactersLocations(){
    var emptyCellPacman = board.findRandomCellForPacman();
    // board.board[emptyCellPacman[0]][emptyCellPacman[1]] = PACMAN;
    shape.i = emptyCellPacman[0];
    shape.j = emptyCellPacman[1];
    oldPos = null;
    ghosts = [];
    for (var i = 0; i < monster_number; i ++){
        ghosts[i] = MyGhost({"getTick":getTick}, board,'black', i);
        ghosts[i].reset();
    }
    if(specialSnack.isAlive()){
        specialSnack.reset();
    }
}



/**
 * @return {number}
 */
function GetKeyPressed() {

    // Todo - change to global values
    // if (keysDown['ArrowUp']) {
    if (keysDown[up_key]) {
        return 1;
    }
    if (keysDown[down_key]) {
        return 2;
    }
    if (keysDown[left_key]) {
        return 3;
    }
    if (keysDown[right_key]) {
        return 4;
    }
}

function setHeightWidthStep(){
    heightStep = canvas.height / board.getBoard()[0].length;
    widthStep = canvas.width / board.getBoard().length;
}

function Draw() {
    context.clearRect(0, 0, canvas.width, canvas.height); //clean board

    document.getElementById("lblScore").innerHTML = score;
    document.getElementById("lblTime").innerHTML = time_elapsed;
    document.getElementById("lblLives").innerHTML = lives;

    // change height ad width in case it was changed
    setHeightWidthStep();

    // draw board
    board.draw(context);
    // draw pacman
    drawPacMan(context);
    // draw ghosts
    for (var i = 0; i < ghosts.length; i++){
        ghosts[i].draw(context);
    }
    // draw special snack
    if (specialSnack.isAlive()){
        specialSnack.draw(context);
    }
}

function drawPacMan(context){
    var center = {};
    center.x = shape.i * widthStep + widthStep / 2;
    center.y = shape.j * heightStep + heightStep / 2;
    context.beginPath();

    /*    Draw as Image    */
    var pacImag = new Image();
    pacImag.src = 'images/' + pacImgName + '_pacman_' + pacmanDirection + '.png';

    var xPos = center.x - widthStep / 2;
    var yPos = center.y - heightStep / 2;
    var imgWidth = widthStep;
    var imgHeight = heightStep;
    context.drawImage(pacImag, xPos, yPos, imgWidth  , imgHeight);
    context.fill();




    // if (pacmanDirection === 'up') {
    //
    //     /*    Draw as Image    */
    //     const ghostImag = new Image();
    //     ghostImag.src = 'images/thanos_pacman.png';
    //
    //     context.beginPath();
    //
    //     var xPos = center.x - widthStep / 2;
    //     var yPos = center.y - heightStep / 2;
    //     var imgWidth = widthStep;
    //     var imgHeight = heightStep;
    //     context.drawImage(ghostImag, xPos, yPos, imgWidth  , imgHeight + 10);
    //     context.fill();


        // context.arc(center.x, center.y, widthStep / 2, (1.50 + .15) % 2 * Math.PI, (1.50 + 1.85) % 2 * Math.PI); // half circle
        // context.lineTo(center.x, center.y);
        // context.fillStyle = pac_color; //color
        // context.fill();
        // context.beginPath();
        // context.arc(center.x -12, center.y -3, 4, 0, 2 * Math.PI); // circle



    // } else if (pacmanDirection === 'down') {
    //     context.arc(center.x, center.y, widthStep / 2, (0.5 + 0.15) % 2 * Math.PI, (0.5 + 1.85) % 2 * Math.PI); // half circle
    //     context.lineTo(center.x, center.y);
    //     context.fillStyle = pac_color; //color
    //     context.fill();
    //     context.beginPath();
    //     context.arc(center.x + 12, center.y +3, 4, 0, 2 * Math.PI); // circle
    // } else if (pacmanDirection === 'right') {
    //     context.arc(center.x, center.y, widthStep / 2, (0 + 0.15) % 2 * Math.PI, (0 + 1.85) % 2 * Math.PI); // half circle
    //     context.lineTo(center.x, center.y);
    //     context.fillStyle = pac_color; //color
    //     context.fill();
    //     context.beginPath();
    //     context.arc(center.x + 3, center.y - 12, 4, 0, 2 * Math.PI); // circle
    // } else if (pacmanDirection === 'left') {
    //     context.arc(center.x, center.y, widthStep / 2, (1 + 0.15) % 2 * Math.PI, (1 + 1.85) % 2 * Math.PI); // half circle
    //     context.lineTo(center.x, center.y);
    //     context.fillStyle = pac_color; //color
    //     context.fill();
    //     context.beginPath();
    //     context.arc(center.x + 3, center.y - 12, 4, 0, 2 * Math.PI); // circle
    // }
    // context.fillStyle = "black"; //color
    // context.scale.x = -1;
    // // rotatePacman(context);
    // context.fill();
    // context.setTransform(1, 0, 0, 1, 0, 0);
}

function moveGhosts(){
    for(var i = 0; i < ghosts.length; i ++){
        var possibleMoves = ghosts[i].getPossibleMoves();
        var bestMoves = new Array();
        var minDistance = 10000;
        var chosenMove ;
        // find minimum distance
        for (var j = 0; j < possibleMoves.length; j++){
            if ( Math.abs(possibleMoves[j].i - shape.i) + Math.abs(possibleMoves[j].j - shape.j) <= minDistance){
                minDistance = Math.abs(possibleMoves[j].i - shape.i) + Math.abs(possibleMoves[j].j - shape.j);
            }
        }
        // take all the moves with minimum distance
        for ( var j = 0; j < possibleMoves.length; j++){
            if ( Math.abs(possibleMoves[j].i - shape.i) + Math.abs(possibleMoves[j].j - shape.j) === minDistance){
                bestMoves.push(possibleMoves[j]);
            }
        }
        chosenMove = bestMoves[Math.floor(Math.random() * bestMoves.length)];
        ghosts[i].setPosition(chosenMove);
    }
}


function moveSpecialSnack(){
    var possibleMoves = specialSnack.getPossibleMoves();
    var index = Math.floor(Math.random() * (possibleMoves.length));
    var chosenMove = possibleMoves[index];
    specialSnack.setPosition(chosenMove);

}




// window.onload = function (event) {





function UpdatePosition() {
    var isGameOver = board.setEmpty(shape.i, shape.j);

    tick++;

    var pressedKey = GetKeyPressed();
    moveGhosts();
    if (specialSnack.isAlive()) {
        moveSpecialSnack();
    }
    if (pressedKey === 1) {
        if (shape.j > 0 && board.boardAt(shape.i, shape.j - 1) !== WALL) {
            oldPos = myClone(shape);
            shape.j--;
        }
        pacmanDirection = 'up';
    }
    if (pressedKey === 2) {
        if (shape.j < board.getBoard()[0].length && board.boardAt(shape.i, shape.j + 1) !== WALL) {
            oldPos = myClone(shape);
            shape.j++;
        }
        pacmanDirection = 'down';
    }
    if (pressedKey === 3) {
        if (shape.i > 0 && board.boardAt(shape.i - 1, shape.j) !== WALL) {
            oldPos = myClone(shape);
            shape.i--;
        } else if (shape.i - 1 < 0 && board.boardAt(board.getBoard().length - 1, shape.j) !== WALL) {
            // Move Between sides.
            oldPos = myClone(shape);
            shape.i = board.getBoard().length - 1;
        }
        pacmanDirection = 'left';
    }
    if (pressedKey === 4) {
        if (shape.i < board.getBoard().length - 1 && board.boardAt(shape.i + 1, shape.j) !== WALL) {
            oldPos = myClone(shape);
            shape.i++;
        } else if (shape.i === board.getBoard().length - 1 && board.boardAt(0, shape.j) !== WALL) {
            // Move Between sides.
            oldPos = myClone(shape);
            shape.i = 0;
        }
        pacmanDirection = 'right';
    }
    if (board.boardAt(shape.i, shape.j) > 100) {
        score += - 100 + board.boardAt(shape.i, shape.j);
    }
    // board.getBoard()[shape.i][shape.j] = 2;
    var currentTime = new Date();
    time_elapsed = Math.round(gameTime - ((currentTime - start_time) / 1000)) + 1;
    // if (score >= 20 && time_elapsed <= 10) {
    //     pac_color = "green";
    // }
    Draw();

    if (specialSnack.isAlive() && testSpecialSnackHit()){
        score += 50;
        specialSnack.eatSnack();
    }

    if(testGhostHit()){
        lives--;
        if (lives === 0){
            var msg = "Oh Snap.. You couldn't stop the Snap\n Half of the population has DISAPPEARED\n" +
                "Your score is: " + score +'\n' +
                'You Lost!' ;
            gameFinished(msg, false);

        } else {
            ShowAlert("I guess this is not the reality you win.\nLets try a different one");
            score -= 10;
            setCharactersLocations();
        }
    }
    if(isGameOver){
        // TODO set the game is done because all the pills have been eaten
        var msg = "You have collected all the stones!\n" +
            "Your score is: " + score + '\n' +
            'We have a winner!!';

        gameFinished(msg, true);

    }
    if (time_elapsed < 0){
        // TODO - do something about end of time
        var msg;
        if (score < 150){
            msg = "Time has run out.\n" +
                "Your score is: " + score +'\n' +
                'You can do better!';

            gameFinished(msg, false);

        }else {
            msg = "Time has run out.\n" +
                "Your score is: " + score +'\n' +
                'We have a winner!!';

            gameFinished(msg, true);
        }

    }

}

function showPopup(text) {
    var pText = document.getElementById("popup-text");
    pText.innerHTML = text;

    var modal = document.getElementById('myModal');

    modal.style.display = "block";

    // pause();


}

async function gameFinished(reason, win_lost){
    // TODO - do what it say it suppose to do
    await pause();
    if(win_lost === true){
        var winGif = document.getElementById("thanos_win");
        winGif.className = 'visible';
        var lostGif = document.getElementById("thanos_lost");
        lostGif.className = 'hidden';
    }else{
        var winGif = document.getElementById("thanos_win");
        winGif.className = 'hidden';
        var lostGif = document.getElementById("thanos_lost");
        lostGif.className = 'visible';
    }
    showGameOver(reason);

}

function testHit(character){
    return ((character.getI() === shape.i && character.getJ() === shape.j) ||
        (oldPos !== null && (character.getI() === oldPos.i && character.getJ() === oldPos.j ) &&
            (character.getOldPosition().i === shape.i && character.getOldPosition().j === shape.j)));
}

function testGhostHit(){
    for (var i = 0; i < ghosts.length; i++){
        if (testHit(ghosts[i])){
            return true;
        }
    }
    return false;
}

function testSpecialSnackHit(){
    return testHit(specialSnack);
}


function myClone(src) {
    return Object.assign({}, src);
}
