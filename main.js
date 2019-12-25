

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

    // if (eng_option != new_option){
    //     eng_option = new_option;
    //     var eng_display = "block";
    //     var chin_display = "none";
    //     if (!eng_option){
    //         var eng_display = "none";
    //         var chin_display = "block";
    //     }
    //     for (var i = 0; i < all_chin.length; i++ ) {
    //         all_chin[i].style.display = eng_display;
    //     }
    //     for (var j = 0; j < all_eng.length; j++ ) {
    //         all_eng[j].style.display = chin_display;
    //     }
    // }
    
}


function time() {
    var eng_option = document.getElementById("option1").checked;

    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var wk = d.getDay();

    var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var weekdays_chin = ["天", "一", "二", "三", "四", "五", "六"];

    m = checkTime(m);
    s = checkTime(s);
    month = d.getMonth()+1;

    var date = document.getElementById("date");

    if (eng_option){
        date.innerHTML = weekdays[wk] + " "
        date.innerHTML += month + "/" + d.getDate() + "/" + d.getFullYear() + "  ";
    }else{
        date.innerHTML = "星期" + weekdays_chin[wk] + " "

        date.innerHTML += d.getFullYear() + "-" + month + "-" +  d.getDate() + " ";
    }

    date.innerHTML += h + ":" + m + ":" + s;


    // Birthday
    if ((month == "12") && (d.getDate() == "16")){
        date.innerHTML = "Today marks my " + (d.getFullYear() - 1999).toString() + " year(s) of surviving in this world!";
    }

    translate(eng_option);
       
    var t = setTimeout(time, 500);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}
