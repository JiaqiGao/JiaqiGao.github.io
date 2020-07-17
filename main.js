$(document).ready(function(){
    var name_desktop = document.getElementById("name_desktop");
    var name_mobile = document.getElementById("name_mobile");
    var motivation = document.getElementById("motivation");
    var blog = document.getElementsByClassName("blog");
    for (var j=0; j<blog.length; j+=1){
        blog[j].addEventListener("click", function(){
            for (var i=0; i<blog.length; i+=1) {
                if (blog[i].innerHTML == "blog" || blog[i].innerHTML == "博客") {
                    document.getElementById('home').style.display = 'none';
                    document.getElementById('first').style.display = 'block';
                    if (blog[i].innerHTML != "blog") {
                        blog[i].innerHTML = "回";
                    } else {
                        blog[i].innerHTML = "return";
                    }
                } else {
                    document.getElementById('home').style.display = 'block';
                    document.getElementById('first').style.display = 'none';
                    if (blog[i].innerHTML != "return") {
                        blog[i].innerHTML = "博客";
                    } else {
                        blog[i].innerHTML = "blog";
                    }
                }
            }
        });
    }




    document.getElementById("translate").addEventListener("click", function(){
        translate();
    });


});

function translate(){
    var eng_option = document.getElementById("option1");

    var all_chin    = document.getElementsByClassName("chin");
    var all_eng     = document.getElementsByClassName("eng")

    if (!(eng_option.checked)){
        for (var i = 0; i < all_chin.length; i++ ) {
            all_chin[i].style.display = "none";
        }
        for (var j = 0; j < all_eng.length; j++ ) {
            all_eng[j].style.display = "block";
        }
    }else{
        for (var k = 0; k < all_chin.length; k++ ) {
            all_chin[k].style.display = "block";
        }
        for (var l = 0; l < all_eng.length; l++ ) {
            all_eng[l].style.display = "none";
        }
    }
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

        if (weekdays[wk] == "Wednesday")
            date.innerHTML = "It's "+  date.innerHTML +"my dudes <br>";
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
       
    var t = setTimeout(time, 500);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

var snd = new Audio("jiaqigao.wav");

var proWeb = document.getElementById("pronouce");
proWeb.addEventListener("click", function(){
    snd.play();
    snd.currentTime = 0;
});
