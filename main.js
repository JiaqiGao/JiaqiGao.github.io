var all_chin    = document.getElementsByClassName("chin");
var all_eng     = document.getElementsByClassName("eng");


function translate(eng_option){
    if (eng_option){
        var eng_display = "block";
        var chin_display = "none";
    }else{
        var eng_display = "none";
        var chin_display = "block";
    }

    for (var i = 0; i < all_chin.length; i++ ) {
        all_chin[i].style.display = chin_display;
    }
    for (var j = 0; j < all_eng.length; j++ ) {
        all_eng[j].style.display = eng_display;
    }
}

function time() {
    var eng_option = document.getElementById("option1").checked;
    translate(eng_option);     
    var t = setTimeout(time, 500);
}

