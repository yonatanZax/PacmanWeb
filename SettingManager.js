



// settings variables
function generateRandomStart() {
    return {
    up_key : 'ArrowUp',
    down_key : 'ArrowDown',
    left_key : 'ArrowLeft',
    right_key : 'ArrowRight',
    pill_number : 50 + Math.floor(Math.random() * 41), // return a number between 50-90
    time_seconds : 60 + Math.floor(Math.random() * 120),
    monster_number : 1 + Math.floor(Math.random() * 3), // return a number between 1-3
    tick : 0,
    lives : 3,
    }
}



function settings_randomValues() {

    var rand = generateRandomStart();

    // up_key = rand["up_key"];
    $("#settings_upKey").html(rand["up_key"]);
    $("#settings_leftKey").html(rand["left_key"]);
    $("#settings_downKey").html(rand["down_key"]);
    $("#settings_rightKey").html(rand["right_key"]);


    $("#settings_numOfBalls").val(rand["pill_number"]);
    $("#settings_timeToPlay").val(rand["time_seconds"]);
    $("#settings_numOfMonsters").val(rand["monster_number"]);





    // down_key = $("#settings_downKey").val();
    // left_key = $("#settings_leftKey").val();
    // right_key = $("#settings_rightKey").val();
    //
    //
    // pill_number = $("#settings_numOfBalls").val();
    // time_seconds = $("#settings_timeToPlay").val();
    // monster_number = $("#settings_numOfMonsters").val();

}




function getKey(event,direction) {

    var code = event.keyCode;         // Get the Unicode value
    var keyValue = String.fromCharCode(code);    // Convert the value into a character

    document.getElementById(direction+"KeyLabel").innerHTML = keyValue;
}




var currentDirection = null;

document.addEventListener('keydown', function(event){


    if ( currentDirection != null){
        var keycode = event.which || event.keyCode;
        var keyValue = String.fromCharCode(keycode); // Convert the value into a character

        if (keycode < 47)
            keyValue = specialValue(keycode,event);

        // var elmBtn = document.getElementById("settings_" + currentDirection + "Key");
        // elmBtn.innerHTML = keyValue;
        // elmBtn.style.background='#00cc00';
        document.getElementById("settings_" + currentDirection + "Key").innerHTML = keyValue;
        document.getElementById("settings_" + currentDirection + "Key").style.background='#ffff00';
    }

    currentDirection = null;
} );






function setCurDirection( direction){
    document.getElementById("settings_" + direction + "Key").style.background='#00cc00';
    currentDirection = direction;
}






function saveSettings() {


    if ($("#settings_upKey").html() === '-1' || $("#settings_leftKey").html() === '-1' ||
        $("#settings_downKey").html() === '-1' || $("#settings_rightKey").html() === '-1'){
        alert("Minus 1 is not a valid key");
        return;
    }

    up_key = $("#settings_upKey").html();
    if (up_key === 'UP')
        up_key = '&uarr';
    down_key = $("#settings_downKey").html();
    left_key = $("#settings_leftKey").html();
    right_key = $("#settings_rightKey").html();


    if ($("#settings_numOfBalls").val() === '' || $("#settings_timeToPlay").val() === '' || $("#settings_numOfMonsters").val() === ''){
        alert("Please fill all the fields");
        return;
    }


    pill_number = $("#settings_numOfBalls").val();
    time_seconds = $("#settings_timeToPlay").val();
    monster_number = $("#settings_numOfMonsters").val();


    switchContent('welcome');



}












//TODO - CHECK BUTTONS FOR DOUBLE MEANING
function specialValue(keycode, event) {

    var keyValue = -1;
    switch (keycode) {
        case 8:
            keyValue = "BACKSPACE";
            break;
        case 9:
            keyValue = "TAB";
            break;
        // case 13:
        //     keyValue = "ENTER";
        //     break;
        case 16:
            if (event.location === KeyboardEvent.DOM_KEY_LOCATION_LEFT) {
                keyValue = "L-SHIFT";
            } else if (event.location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT) {
                keyValue = "R-SHIFT";
            }
            break;
        case 17:
            if (event.location === KeyboardEvent.DOM_KEY_LOCATION_LEFT) {
                keyValue = "L-CTRL";
            } else if (event.location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT) {
                keyValue = "R-CTRL";
            }
            break;
        case 18:
            if (event.location === KeyboardEvent.DOM_KEY_LOCATION_LEFT) {
                keyValue = "L-ALT";
            } else if (event.location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT) {
                keyValue = "R-ALT";
            }
            break;
        case 20:
            keyValue = "CAPS LOCK";
            break;
        case 27:
            keyValue = "ESCAPE";
            break;
        // case 32:
        //     keyValue = "SPACE-BAR";
        //     break;
        case 33:
            keyValue = "PAGE UP";
            break;
        case 34:
            keyValue = "PAGE DOWN";
            break;
        case 35:
            keyValue = "END";
            break;
        case 36:
            keyValue = "HOME";
            break;
        case 37:
            keyValue = '&larr;';
            break;
        case 38:
            keyValue = '&uarr;';
            break;
        case 39:
            keyValue = '&rarr;';
            break;
        case 40:
            keyValue = '&darr;';
            break;
        case 45:
            keyValue = "INSERT";
            break;
        case 46:
            keyValue = "DELETE";
            break;
    }

    return keyValue;
}