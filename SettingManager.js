



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
        var code = event.keyCode;         // Get the Unicode value
        var keyValue = String.fromCharCode(code);    // Convert the value into a character

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

    up_key = $("#settings_upKey").html();
    down_key = $("#settings_downKey").html();
    left_key = $("#settings_leftKey").html();
    right_key = $("#settings_rightKey").html();


    pill_number = $("#settings_numOfBalls").val();
    time_seconds = $("#settings_timeToPlay").val();
    monster_number = $("#settings_numOfMonsters").val();


    switchContent('welcome');



}