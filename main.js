$(document).ready(function(){
    var name = document.getElementById("name");
    var motivation = document.getElementById("motivation");

    name.addEventListener("click", function(){
        if (name.innerHTML == "Jiaqi Gao"){
            name.innerHTML = "高家琪";
           // motivation.innerHTML = "\"我记忆其实不是很好，所以做个博客也许是个好主意\" -- 我，一月 2018"
        }else{
            name.innerHTML = "Jiaqi Gao";
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

    var date = document.getElementById("date");
    date.innerHTML = weekdays[wk] + " " + d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear() + "  ";

    if(h > 12){
        date.innerHTML += h-12 + ":" + m + ":" + s + "PM";
    }else{
        date.innerHTML += h + ":" + m + ":" + s + "AM";
    }
    var t = setTimeout(time, 500);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}