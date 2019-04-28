
var EMPTY       = 0;
var WALL        = 1;
var PACMAN      = 2;
var BISCUIT     = 3; // special power
var BLOCK       = 4;
var GHOST       = 5;
var PILL_5      = 105;
var PILL_15     = 115;
var PILL_25     = 125;

Board = function() {
    var board;
    function initBoard() {
        board_demo = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
            [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
            [4, 4, 4, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 4, 4, 4],
            [1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1],
            [4, 4, 4, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 4, 4, 4],
            [1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
            [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
            [1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        board = new Array();
        for (var i = 0; i < board_demo[0].length; i++){
            board[i] = new Array();
            for (var j = 0; j < board_demo.length; j++){
                board[i][j] = board_demo[j][i];
            }
        }

        var food_remain = pill_number;
        // start_time = new Date();
        // Assign PACMAN location
        // var emptyCellPacman = findRandomEmptyCell(board);
        // board[emptyCellPacman[0]][emptyCellPacman[1]] = PACMAN;
        // shape.i = emptyCellPacman[0];
        // shape.j = emptyCellPacman[1];
        // Assign all PILLS
        var pill_5_number = Math.floor(pill_number * 0.6);
        var pill_15_number = Math.floor(pill_number * 0.3);
        var pill_25_number = Math.floor(pill_number * 0.1);
        while (pill_15_number > 0){
            var emptyCell = findRandomEmptyCell();
            board[emptyCell[0]][emptyCell[1]] = PILL_15;
            food_remain--;
            pill_15_number--;
        }
        while (pill_25_number > 0){
            var emptyCell = findRandomEmptyCell();
            board[emptyCell[0]][emptyCell[1]] = PILL_25;
            food_remain--;
            pill_25_number--;
        }
        while (food_remain > 0) {
            var emptyCell = findRandomEmptyCell();
            board[emptyCell[0]][emptyCell[1]] = PILL_5;
            food_remain--;
        }
    }

    function findRandomEmptyCell() {
        var i = Math.floor((Math.random() * board.length));
        var j = Math.floor((Math.random() * board[0].length) );
        while (board[i][j] !== EMPTY || (j === 10 && (i >= 8 || i <= 10)) || (j === 9 && i === 9)) {
            i = Math.floor((Math.random() * board.length));
            j = Math.floor((Math.random() * board[0].length) );
        }
        return [i, j];
    }

    function getBoard(){
        return board;
    }

    function boardAt(i, j){
        try {
            return board[i][j];
        }
        catch (e) {
            console.log(e.message);
            return WALL;
        }
    }

    function getPossibleMoves(i, j){
        moves = new Array();
        if (i - 1 >= 0 && (boardAt(i-1,j) !== WALL && boardAt(i-1,j) !== BLOCK)){
            moves.push({'i': i-1,
                'j': j});
        }else if (i - 1 < 0 && (boardAt(board.length - 1,j) !== WALL && boardAt(board.length - 1,j) !== BLOCK)){
            moves.push({'i': board.length - 1,
                'j': j});
        }
        if (j - 1 >= 0 && (boardAt(i,j-1) !== WALL && boardAt(i,j-1) !== BLOCK)){
            moves.push({'i': i,
                'j': j-1});
        }
        if (i + 1 < board.length - 1 && (boardAt(i+1,j) !== WALL && boardAt(i+1,j) !== BLOCK)){
            moves.push({'i': i+1,
                'j': j});
        }else if (i + 1 === board.length && (boardAt(0,j) !== WALL && boardAt(0,j) !== BLOCK)){
            moves.push({'i': 0,
                'j': j});
        }
        if (j + 1 < board[0].length && (boardAt(i,j+1) !== WALL && boardAt(i,j+1) !== BLOCK)){
            moves.push({'i': i,
                'j': j+1});
        }

        if (j - 1 < 0 && (boardAt(i,j-1) !== WALL && boardAt(i,j-1) !== BLOCK)){
            moves.push({'i': i,
                'j': j-1});
        }
        if (i + 1 === board[0].length && (boardAt(i+1,j) !== WALL && boardAt(i+1,j) !== BLOCK)){
            moves.push({'i': i+1,
                'j': j});
        }

        return moves;

    }

    function draw(context){

        for (var i = 0; i < board.length; i++) {
            for (var j = 0; j < board[0].length; j++) {
                var center = {};
                center.x = i * widthStep + widthStep / 2;
                center.y = j * heightStep + heightStep / 2;
                if (board[i][j] > 100) {
                    context.beginPath();
                    // set color
                    if (board[i][j] === PILL_5){
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
                    else if(board[i][j] === PILL_15){
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
                else if (board[i][j] === WALL) {
                    context.beginPath();
                    context.rect(center.x - widthStep/2, center.y - heightStep/2, widthStep, heightStep);
                    context.fillStyle = "grey"; //color
                    context.fill();
                }
            }

        }
    }

    return {
        'initBoard'             : initBoard,
        'findRandomEmptyCell'   : findRandomEmptyCell,
        'getBoard'              : getBoard,
        'boardAt'               : boardAt,
        'getPossibleMoves'      : getPossibleMoves,
        'draw'                  : draw,
    };

};