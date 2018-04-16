$(document).ready(function(){
    var name_desktop = document.getElementById("name_desktop");
    var name_mobile = document.getElementById("name_mobile");
    var motivation = document.getElementById("motivation");

    name_desktop.addEventListener("click", function(){
        if (name_desktop.innerHTML == "Jiaqi Gao"){
            name_desktop.innerHTML = "高家琪";
        }else{
            name_desktop.innerHTML = "Jiaqi Gao";
        }
    })

    name_mobile.addEventListener("click", function(){
        if (name_mobile.innerHTML == "Jiaqi Gao"){
            name_mobile.innerHTML = "高家琪";
        }else{
            name_mobile.innerHTML = "Jiaqi Gao";
        }
    })

});


function time() {
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var wk = d.getDay();

    var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    m = checkTime(m);
    s = checkTime(s);
    month = d.getMonth()+1;
    var date = document.getElementById("date");
    date.innerHTML = weekdays[wk] + " " + month + "/" + d.getDate() + "/" + d.getFullYear() + "  ";
    date.innerHTML += h + ":" + m + ":" + s;
    var t = setTimeout(time, 500);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}
