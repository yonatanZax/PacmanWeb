


function getKey(event,direction) {

    var code = event.keyCode;         // Get the Unicode value
    var keyValue = String.fromCharCode(code);    // Convert the value into a character

    document.getElementById(direction+"KeyLabel").innerHTML = keyValue;
}





function saveSettings() {

    up_key = $("#settings_upKey").val();
    down_key = $("#settings_downKey").val();
    left_key = $("#settings_leftKey").val();
    right_key = $("#settings_rightKey").val();


    pill_number = $("#settings_numOfBalls").val();
    time_seconds = $("#settings_timeToPlay").val();
    monster_number = $("#settings_numOfMonsters").val();


    switchContent('welcome');





}