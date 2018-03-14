$(document).ready(function(){
    var name = document.getElementById("name");
    var motivation = document.getElementById("motivation");

    name.addEventListener("click", function(){
        if (name.innerHTML == "Jiaqi Gao"){
            name.innerHTML = "高家琪";
            motivation.innerHTML = "\"我记忆其实不是很好，所以做个博客也许是个好主意\" -- 我，一月 2018"
        }else{
            name.innerHTML = "Jiaqi Gao";
            motivation.innerHTML = "\"i'm pretty bad at remembering things so maybe it'll be a good idea to start a blog\" -- me, jan 2018";
        }
    })

});

function time() {
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    m = checkTime(m);
    s = checkTime(s);

    var date = document.getElementById("date");
    date.innerHTML = d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear() + "  ";
    date.innerHTML += h + ":" + m + ":" + s;
    var t = setTimeout(time, 500);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}