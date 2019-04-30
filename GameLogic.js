
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
    PAUSE       = 6,
    PLAYING     = 7,
    COUNTDOWN   = 8,
    EATEN_PAUSE = 9,
    DYING       = 10;

var  heightStep,
    widthStep  ;

var pacmanDirection = 'right',
    gameTime;

function getTick(){
    return tick;
}

function Start() {
    score = 0;
    tick = 0;
    // generateRandomStart();
    pac_color = "yellow";
    // var food_remain = pill_number;
    lives = 3;
    start_time = new Date();
    // Assign PACMAN location
    board = Board();
    board.initBoard();
    setHeightWidthStep();
    gameTime = time_seconds;
    specialSnack = SpecialSnack({"getTick":getTick}, board,'black', 3);
    setCharactersLocations();

    keysDown = {};
    addEventListener("keydown", function (e) {
        keysDown[e.key] = true;
    }, false);
    addEventListener("keyup", function (e) {
        keysDown[e.key] = false;
    }, false);
    if (interval !== null){
        clearInterval(interval);
    }
    interval = setInterval(UpdatePosition, 250);
}

function setCharactersLocations(){
    var emptyCellPacman = board.findRandomEmptyCell();
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
    // if (keysDown['ArrowDown']) {
    if (keysDown[down_key]) {
        return 2;
    }
    // if (keysDown['ArrowLeft']) {
    if (keysDown[left_key]) {
        return 3;
    }
    // if (keysDown['ArrowRight']) {
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
    lblScore.value = score;
    lblTime.value = time_elapsed;
    lblLives.value = lives;
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
    if (pacmanDirection === 'up') {
        context.arc(center.x, center.y, widthStep / 2, (1.50 + .15) % 2 * Math.PI, (1.50 + 1.85) % 2 * Math.PI); // half circle
        context.lineTo(center.x, center.y);
        context.fillStyle = pac_color; //color
        context.fill();
        context.beginPath();
        context.arc(center.x -12, center.y -3, 4, 0, 2 * Math.PI); // circle
    } else if (pacmanDirection === 'down') {
        context.arc(center.x, center.y, widthStep / 2, (0.5 + 0.15) % 2 * Math.PI, (0.5 + 1.85) % 2 * Math.PI); // half circle
        context.lineTo(center.x, center.y);
        context.fillStyle = pac_color; //color
        context.fill();
        context.beginPath();
        context.arc(center.x + 12, center.y +3, 4, 0, 2 * Math.PI); // circle
    } else if (pacmanDirection === 'right') {
        context.arc(center.x, center.y, widthStep / 2, (0 + 0.15) % 2 * Math.PI, (0 + 1.85) % 2 * Math.PI); // half circle
        context.lineTo(center.x, center.y);
        context.fillStyle = pac_color; //color
        context.fill();
        context.beginPath();
        context.arc(center.x + 3, center.y - 12, 4, 0, 2 * Math.PI); // circle
    } else if (pacmanDirection === 'left') {
        context.arc(center.x, center.y, widthStep / 2, (1 + 0.15) % 2 * Math.PI, (1 + 1.85) % 2 * Math.PI); // half circle
        context.lineTo(center.x, center.y);
        context.fillStyle = pac_color; //color
        context.fill();
        context.beginPath();
        context.arc(center.x + 3, center.y - 12, 4, 0, 2 * Math.PI); // circle
    }
    context.fillStyle = "black"; //color
    context.scale.x = -1;
    // rotatePacman(context);
    context.fill();
    context.setTransform(1, 0, 0, 1, 0, 0);
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


    // var bestMoves = new Array();
    // var minDistance = 10000;
    // var chosenMove ;
    // for ( var j = 0; j < possibleMoves.length; j++){
    //     if ( Math.abs(possibleMoves[j].i - shape.i) + Math.abs(possibleMoves[j].j - shape.j) <= minDistance){
    //         minDistance = Math.abs(possibleMoves[j].i - shape.i) + Math.abs(possibleMoves[j].j - shape.j);
    //     }
    // }
    // // take all the moves with minimum distance
    // for ( var j = 0; j < possibleMoves.length; j++){
    //     if ( Math.abs(possibleMoves[j].i - shape.i) + Math.abs(possibleMoves[j].j - shape.j) === minDistance){
    //         bestMoves.push(possibleMoves[j]);
    //     }
    // }
    // chosenMove = bestMoves[Math.floor(Math.random() * bestMoves.length)];
    // specialSnack.setPosition(chosenMove);

}


function UpdatePosition() {
    var isGameOver = board.setEmpty(shape.i, shape.j);

    tick++;

    var x = GetKeyPressed();
    moveGhosts();
    if (specialSnack.isAlive()) {
        moveSpecialSnack();
    }
    if (x === 1) {
        if (shape.j > 0 && board.boardAt(shape.i, shape.j - 1) !== WALL) {
            oldPos = myClone(shape);
            shape.j--;
        }
        pacmanDirection = 'up';
    }
    if (x === 2) {
        if (shape.j < board.getBoard()[0].length && board.boardAt(shape.i, shape.j + 1) !== WALL) {
            oldPos = myClone(shape);
            shape.j++;
        }
        pacmanDirection = 'down';
    }
    if (x === 3) {
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
    if (x === 4) {
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
            ShowAlert("Oh Snap.. You couldn't stop the Snap\n Everyone is DEAD", Start);
            // Start();
        } else {
            ShowAlert("I guess this is not the reality you win.", setCharactersLocations);
            score -= 10;
            // setCharactersLocations();
        }
    }
    if(isGameOver){
        // TODO set the game is done because all the pills have been eaten
        ShowAlert("All Gems were consumed.", setCharactersLocations);
        // setCharactersLocations();
    }
    if (time_elapsed < 0){
        // TODO - do something about end of time
        ShowAlert("Time has run out.", Start);
        // Start();
    }

}

function ShowAlert(text, callback){
    gameTime = time_elapsed;
    window.alert(text, callback);
    start_time = new Date();
}



function gameFinished(){
    // TODO - do what it say it suppose to do
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

// var currentCallback;
//
// // override default browser alert
// window.alert = function(msg, callback){
//
//     $('.message').text(msg);
//     $('.customAlert').css('animation', 'fadeIn 0.3s linear');
//     $('.customAlert').css('display', 'inline');
//     setTimeout(function(){
//         $('.customAlert').css('animation', 'none');
//     }, 300);
//     currentCallback = callback;
// };
//
// $(function(){
//
//     // add listener for when our confirmation button is clicked
//     $('.confirmButton').click(function(){
//         $('.customAlert').css('animation', 'fadeOut 0.3s linear');
//         setTimeout(function(){
//             $('.customAlert').css('animation', 'none');
//             $('.customAlert').css('display', 'none');
//         }, 300);
//         currentCallback();
//     });
//
//     $('.customAlert').css('animation', 'fadeOut 0.3s linear');
// });