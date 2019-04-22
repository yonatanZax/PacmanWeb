
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

var pacmanDirection = 'right';

function getTick(){
    return tick;
}

function Start() {
    score = 0;
    tick = 0;
    generateRandomStart();
    pac_color = "yellow";
    // var food_remain = pill_number;
    start_time = new Date();
    // Assign PACMAN location
    board = Board();
    board.initBoard();
    heightStep = canvas.height / board.getBoard().length;
    widthStep = canvas.width / board.getBoard()[0].length;

    // var emptyCellPacman = board.findRandomEmptyCell();
    // // board.board[emptyCellPacman[0]][emptyCellPacman[1]] = PACMAN;
    // shape.i = emptyCellPacman[0];
    // shape.j = emptyCellPacman[1];
    // for (var i = 0; i < monster_number; i ++){
    //     ghosts[i] = MyGhost({"getTick":getTick}, board,'black', i);
    //     ghosts[i].reset();
    // }
    specialSnack = SpecialSnack({"getTick":getTick}, board,'black', 3);
    setCharactersLocations();

    keysDown = {};
    addEventListener("keydown", function (e) {
        keysDown[e.code] = true;
    }, false);
    addEventListener("keyup", function (e) {
        keysDown[e.code] = false;
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
    if (keysDown['ArrowUp']) {
        return 1;
    }
    if (keysDown['ArrowDown']) {
        return 2;
    }
    if (keysDown['ArrowLeft']) {
        return 3;
    }
    if (keysDown['ArrowRight']) {
        return 4;
    }
}

function Draw() {
    context.clearRect(0, 0, canvas.width, canvas.height); //clean board
    lblScore.value = score;
    lblTime.value = time_elapsed;
    heightStep = canvas.height / board.getBoard()[0].length;
    widthStep = canvas.width / board.getBoard().length;
    for (var i = 0; i < board.getBoard().length; i++) {
        for (var j = 0; j < board.getBoard()[0].length; j++) {
            var center = new Object();
            center.x = i * widthStep + widthStep / 2;
            center.y = j * heightStep + heightStep / 2;
            if (i === shape.i && j === shape.j) {
                context.beginPath();
                if(pacmanDirection === 'up'){
                    context.arc(center.x, center.y, widthStep / 2,  (1.50 +.15) % 2 * Math.PI, (1.50 +1.85) % 2 * Math.PI); // half circle
                    context.lineTo(center.x, center.y);
                    context.fillStyle = pac_color; //color
                    context.fill();
                    context.beginPath();
                    context.arc(center.x -12, center.y -3, 4, 0, 2 * Math.PI); // circle
                }else if (pacmanDirection === 'down'){
                    context.arc(center.x, center.y, widthStep / 2, (0.5 + 0.15) % 2 * Math.PI, (0.5 + 1.85) % 2 * Math.PI); // half circle
                    context.lineTo(center.x, center.y);
                    context.fillStyle = pac_color; //color
                    context.fill();
                    context.beginPath();
                    context.arc(center.x + 12, center.y +3, 4, 0, 2 * Math.PI); // circle
                }else if(pacmanDirection === 'right'){
                    context.arc(center.x, center.y, widthStep / 2, (0 + 0.15) % 2 * Math.PI, (0 + 1.85) % 2  * Math.PI); // half circle
                    context.lineTo(center.x, center.y);
                    context.fillStyle = pac_color; //color
                    context.fill();
                    context.beginPath();
                    context.arc(center.x + 3, center.y - 12, 4, 0, 2 * Math.PI); // circle
                }else if (pacmanDirection === 'left'){
                    context.arc(center.x, center.y, widthStep / 2, (1 + 0.15) % 2* Math.PI, (1 + 1.85) % 2 * Math.PI); // half circle
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

            else if (board.boardAt(i,j) > 100) {
                context.beginPath();
                // context.font = '10px Helvetica';
                // context.textAlign = 'center';
                // context.textBaseline = 'middle';

                // set color
                if (board.boardAt(i,j) === PILL_5){
                    context.fillStyle = "purple"; //color
                    context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
                    context.fill();
                    context.strokeStyle = '#ffffff';
                    context.font = '10px Helvetica';
                    context.textAlign = 'center';
                    context.textBaseline = 'middle';
                    context.fillStyle = 'white';
                    context.fillText('5', center.x, center.y);
                    context.stroke();
                    context.closePath();
                }
                else if(board.boardAt(i,j) === PILL_15){
                    context.fillStyle = "red"; //color
                    context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
                    context.fill();
                    context.strokeStyle = '#ffffff';
                    context.font = '10px Helvetica';
                    context.textAlign = 'center';
                    context.textBaseline = 'middle';
                    context.fillStyle = 'white';
                    context.fillText('15', center.x, center.y);
                    context.stroke();
                    context.closePath();
                }else{
                    context.fillStyle = 'blue';
                    context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
                    context.fill();
                    context.strokeStyle = '#ffffff';
                    context.font = '10px Helvetica';
                    context.textAlign = 'center';
                    context.textBaseline = 'middle';
                    context.fillStyle = 'white';
                    context.fillText('25', center.x, center.y);
                    context.stroke();
                    context.closePath();


                }
                // context.fillStyle = "black"; //color
                // context.fill();

            }
            else if (board.boardAt(i,j) === WALL) {
                context.beginPath();
                context.rect(center.x - widthStep/2, center.y - heightStep/2, widthStep, heightStep);
                context.fillStyle = "grey"; //color
                context.fill();
            }

        }
    }
    for (var i = 0; i < ghosts.length; i++){
        ghosts[i].draw(context);
    }
    if (specialSnack.isAlive()){
        specialSnack.draw(context);
    }


}

function moveGhosts(){
    for(var i = 0; i < ghosts.length; i ++){
        var possibleMoves = ghosts[i].getPossibleMoves();
        var bestMoves = new Array();
        var minDistance = 10000;
        var chosenMove ;
        // find minimum distance
        for ( var j = 0; j < possibleMoves.length; j++){
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
    // var index = Math.floor(Math.random() * (possibleMoves.length));
    // var chosenMove = possibleMoves[index];
    // specialSnack.setPosition(chosenMove);


    var bestMoves = new Array();
    var minDistance = 10000;
    var chosenMove ;
    for ( var j = 0; j < possibleMoves.length; j++){
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
    specialSnack.setPosition(chosenMove);

}


function UpdatePosition() {
    board.getBoard()[shape.i][shape.j] = EMPTY;

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
        }
        else if (shape.i - 1 < 0 && board.boardAt(board.getBoard().length - 1, shape.j) !== WALL){
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
        }
        else if (shape.i === board.getBoard().length - 1 && board.boardAt(0, shape.j) !== WALL){
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
    time_elapsed = (currentTime - start_time) / 1000;
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
            window.alert("Oh Snap.. You couldn't stop the Snap\n Everyone is DEAD");
            Start();
        }
        else{
            window.alert("I guess this is not the reality you win.");
            score -= 10;
            setCharactersLocations();
        }
    }

}

function testGhostHit(){
    for (var i = 0; i < ghosts.length; i++){
        var bool_1 = (ghosts[i].getI() === shape.i && ghosts[i].getJ() === shape.j);
        var bool_2 = oldPos !== null;
        var bool_3;
        var bool_4;
        if (bool_2) {
            bool_3 = (ghosts[i].getI() === oldPos.i && ghosts[i].getJ() === oldPos.j);
            bool_4 = (ghosts[i].getOldPosition().i === shape.i && ghosts[i].getOldPosition().j === shape.j);
        }
        if ((ghosts[i].getI() === shape.i && ghosts[i].getJ() === shape.j) ||
            (oldPos !== null && (ghosts[i].getI() === oldPos.i && ghosts[i].getJ() === oldPos.j ) &&
                (ghosts[i].getOldPosition().i === shape.i && ghosts[i].getOldPosition().j === shape.j))){
            return true;
        }
    }
    return false;
}

function testSpecialSnackHit(){
    if ((specialSnack.getI() === shape.i && specialSnack.getJ() === shape.j) ||
        (oldPos !== null && (specialSnack.getI() === oldPos.i && specialSnack.getJ() === oldPos.j ) &&
            (specialSnack.getOldPosition().i === shape.i && specialSnack.getOldPosition().j === shape.j))){
        return true;
    }
    return false;
}


function myClone(src) {
    return Object.assign({}, src);
}