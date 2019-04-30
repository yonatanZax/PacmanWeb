

function switchContent(makeVisible) {

    var contentList = ["welcome","game","settings","loginDiv"];

    var makeHidden = contentList.filter(function (value) {
        return value!=makeVisible;
    });

    for (var i = 0; i < makeHidden.length ; i++){
        var hide = document.getElementById(makeHidden[i]);
        hide.className = "hidden";
    }


    var get = document.getElementById(makeVisible);
    get.className = "visible";

    var footer = document.getElementById("footer");
    footer.innerHTML = makeVisible;

    document.getElementById('loginDiv').style.display='none';


}