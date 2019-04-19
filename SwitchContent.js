

function switchContent(makeVisible) {

    var contentList = ["welcome","game","settings"];

    var makeHidden = contentList.filter(function (value) {
        return value!=makeVisible;
    });

    for (var i = 0; i < makeHidden.length ; i++){
        var hide = document.getElementById(makeHidden[i]);
        hide.className = "hidden";
    }


    var get = document.getElementById(makeVisible);
    get.className = "visible";




}