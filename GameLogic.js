


var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;

// settings variables
var up_key = 'ArrowUp';
var down_key = 'ArrowDown';
var left_key = 'ArrowLeft';
var right_key = 'ArrowRight';
var pill_number = 50 + Math.floor(Math.random() * 41); // return a number between 50-90
var time_seconds = 60;
var monster_number = 1 + Math.floor(Math.random() * 3); // return a number between 1-3







var EMPTY       = 0;
var WALL        = 1;
var PACMAN      = 2;
var BISCUIT     = 3; // special power
var BLOCK       = 4;
var GHOST       = 5;
var PILL_5      = 105;
var PILL_15     = 115;
var PILL_25     = 125;

var pacmanDirection = 'right';


function Start() {
    board = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
        [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
        [4, 4, 4, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 4, 4, 4],
        [1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 5, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
        [4, 4, 4, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 4, 4, 4],
        [1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
        [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];
    score = 0;
    pac_color = "yellow";
    var cnt = 100;
    var food_remain = pill_number;
    var pacman_remain = 1;
    start_time = new Date();
    // Assign PACMAN location
    var emptyCellPacman = findRandomEmptyCell(board);
    board[emptyCellPacman[0]][emptyCellPacman[1]] = PACMAN;
    shape.i = emptyCellPacman[0];
    shape.j = emptyCellPacman[1];
    // Assign all PILLS
    var pill_5_number = Math.floor(pill_number * 0.6);
    var pill_15_number = Math.floor(pill_number * 0.3);
    var pill_25_number = Math.floor(pill_number * 0.1);
    while (pill_15_number > 0){
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = PILL_15;
        food_remain--;
        pill_15_number--;
    }
    while (pill_25_number > 0){
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = PILL_25;
        food_remain--;
        pill_25_number--;
    }
    while (food_remain > 0) {
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = PILL_5;
        food_remain--;
    }
    // for (var i = 0; i < 10; i++) {
    //     // board[i] = new Array();
    //     //put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
    //     for (var j = 0; j < 10; j++) {
    //         if ((i === 3 && j === 3) || (i === 3 && j === 4) || (i === 3 && j === 5) || (i === 6 && j === 1) || (i === 6 && j === 2)) {
    //             board[i][j] = 4;
    //         } else {
    //             var randomNum = Math.random();
    //             if (randomNum <= 1.0 * food_remain / cnt) {
    //                 food_remain--;
    //                 board[i][j] = 1;
    //             } else if (randomNum < 1.0 * (pacman_remain + food_remain) / cnt) {
    //                 shape.i = i;
    //                 shape.j = j;
    //                 pacman_remain--;
    //                 board[i][j] = 2;
    //             } else {
    //                 board[i][j] = 0;
    //             }
    //             cnt--;
    //         }
    //     }
    // }

    keysDown = {};
    addEventListener("keydown", function (e) {
        keysDown[e.code] = true;
    }, false);
    addEventListener("keyup", function (e) {
        keysDown[e.code] = false;
    }, false);
    interval = setInterval(UpdatePosition, 250);
}


function findRandomEmptyCell(board) {
    var i = Math.floor((Math.random() * board.length));
    var j = Math.floor((Math.random() * board[0].length) );
    while (board[i][j] !== EMPTY) {
        i = Math.floor((Math.random() * board.length));
        j = Math.floor((Math.random() * board[0].length) );
    }
    return [i, j];
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
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var center = new Object();
            center.x = i * 30 + 20;
            center.y = j * 30 + 20;
            if (board[i][j] === PACMAN) {
                context.beginPath();
                context.arc(center.x, center.y, 15, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
                context.lineTo(center.x, center.y);
                context.fillStyle = pac_color; //color
                context.fill();
                context.beginPath();
                context.arc(center.x + 3, center.y - 12, 4, 0, 2 * Math.PI); // circle
                context.fillStyle = "black"; //color
                context.scale.x = -1;
                // rotatePacman(context);
                context.fill();
                context.setTransform(1, 0, 0, 1, 0, 0);
            } else if (board[i][j] > 100) {
                context.beginPath();
                context.arc(center.x, center.y, 8, 0, 2 * Math.PI); // circle
                // set color
                if (board[i][j] === PILL_5){
                    context.fillStyle = "purple"; //color
                }
                else if(board[i][j] === PILL_15){
                    context.fillStyle = "red"; //color
                }else{
                    context.fillStyle = "blue"; //color
                }
                // context.fillStyle = "black"; //color
                context.fill();
            } else if (board[i][j] === WALL) {
                context.beginPath();
                context.rect(center.x - 20, center.y - 20, 30, 30);
                context.fillStyle = "grey"; //color
                context.fill();
            }
        }
    }


}

function rotatePacman(ctx){
    if(pacmanDirection === 'up'){
        ctx.rotate(270 * Math.PI / 180);
    }else if (pacmanDirection === 'down'){
        ctx.rotate(90 * Math.PI / 180);
    }else if(pacmanDirection === 'right'){

    }else if (pacmanDirection === 'left'){
        ctx.rotate(180 * Math.PI / 180);
    }
}

function UpdatePosition() {
    board[shape.i][shape.j] = 0;
    var x = GetKeyPressed();
    if (x === 1) {
        if (shape.j > 0 && board[shape.i][shape.j - 1] !== WALL) {
            shape.j--;
        }
        pacmanDirection = 'up';
    }
    if (x === 2) {
        if (shape.j < 9 && board[shape.i][shape.j + 1] !== WALL) {
            shape.j++;
        }
        pacmanDirection = 'down';
    }
    if (x === 3) {
        if (shape.i > 0 && board[shape.i - 1][shape.j] !== WALL) {
            shape.i--;
        }
        pacmanDirection = 'left';
    }
    if (x === 4) {
        if (shape.i < 9 && board[shape.i + 1][shape.j] !== WALL) {
            shape.i++;
        }
        pacmanDirection = 'right';
    }
    if (board[shape.i][shape.j] > 100) {
        score += score - 100 + board[shape.i][shape.j];
    }
    board[shape.i][shape.j] = 2;
    var currentTime = new Date();
    time_elapsed = (currentTime - start_time) / 1000;
    if (score >= 20 && time_elapsed <= 10) {
        pac_color = "green";
    }
    if (score === 50) {
        window.clearInterval(interval);
        window.alert("Game completed");
    } else {
        Draw();
    }
}
