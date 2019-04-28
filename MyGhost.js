MyGhost = function (game, map, colour, pId) {

    var position = null,
        oldPos = null,
        id = pId,
        direction = null,
        eatable = null,
        eaten = null;

    var animationInterval;

    function getPossibleMoves() {
        var possibleMoves = map.getPossibleMoves(position.i, position.j);
        if (oldPos === null || possibleMoves.length === 1) {
            return possibleMoves;
        }
        possibleMoves = possibleMoves.filter(function (value, index, arr) {
            return value.i !== oldPos.i || value.j !== oldPos.j;
        });
        return possibleMoves;
    }

    function getOldPosition() {
        return oldPos;
    }

    function setPosition(nPosition) {
        oldPos = position;
        position = nPosition;
    }

    function draw(cxt) {
        var center = {};


        /*    Draw as Image    */
        const ghostImag = new Image();
        ghostImag.src = 'images/thanos_pacman.png';

        center.x = position.i * widthStep + widthStep / 2;
        center.y = position.j * heightStep + heightStep / 2;
        cxt.beginPath();

        var xPos = center.x - widthStep / 2;
        var yPos = center.y - heightStep / 2;
        var imgWidth = widthStep;
        var imgHeight = heightStep;


        cxt.drawImage(ghostImag, xPos, yPos, imgWidth - 10, imgHeight);

        // cxt.rect(center.x - widthStep/2, center.y - heightStep/2, widthStep, heightStep);
        // cxt.fillStyle = "black"; //color
        cxt.fill();
    }

    function isVulnerable() {
        return eatable !== null;
    }

    function isDangerous() {
        return eaten === null;
    }

    function isHidden() {
        return eatable === null && eaten !== null;
    }

    function makeEatable() {
        direction = oppositeDirection(direction);
        eatable = game.getTick();
    }

    function oppositeDirection(dir) {
        return dir === LEFT && RIGHT ||
            dir === RIGHT && LEFT ||
            dir === UP && DOWN || UP;
    }

    function getRandomDirection() {
        var moves = (direction === LEFT || direction === RIGHT)
            ? [UP, DOWN] : [LEFT, RIGHT];
        return moves[Math.floor(Math.random() * 2)];
    }

    function reset() {
        eaten = null;
        eatable = null;
        position = {};
        switch (id) {
            case 0:
                position.i = 1;
                position.j = 1;
                break;
            case 1:
                position.i = 1;
                position.j = map.getBoard()[0].length - 2;
                break;
            case 2:
                position.i = map.getBoard().length - 2;
                position.j = 1;
                break;
            case 3:
                position.i = map.getBoard().length - 2;
                position.j = map.getBoard()[0].length - 2;
                break;
        }
        // position.i = 9;
        // position.j = 10;
        direction = getRandomDirection();
        // due = getRandomDirection();
    }

    function secondsAgo(tick) {
        return (game.getTick() - tick);
    }

    function getI() {
        return position.i;
    }

    function getJ() {
        return position.j;
    }


    function getColour() {
        if (eatable) {
            if (secondsAgo(eatable) > 5) {
                return game.getTick() % 20 > 10 ? "#FFFFFF" : "#0000BB";
            } else {
                return "#0000BB";
            }
        } else if (eaten) {
            return "#222";
        }
        return colour;
    }


    return {
        "isVulnerable": isVulnerable,
        "isDangerous": isDangerous,
        "makeEatable": makeEatable,
        "reset": reset,
        "draw": draw,
        'getI': getI,
        'getJ': getJ,
        'getOldPosition': getOldPosition,
        'setPosition': setPosition,
        'getPossibleMoves': getPossibleMoves,

    };
};





