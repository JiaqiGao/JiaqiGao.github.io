$(document).ready(function(){
    var name_desktop = document.getElementById("name_desktop");
    var name_mobile = document.getElementById("name_mobile");
    var motivation = document.getElementById("motivation");
    var blog = document.getElementById("blog");
    var winter2018 = document.getElementById("winter2018");
    var second = document.getElementById("second");

    // name_desktop.addEventListener("click", function(){
    //     if (name_desktop.innerHTML == "Jiaqi Gao"){
    //         name_desktop.innerHTML = "高家琪";
    //     }else{
    //         name_desktop.innerHTML = "Jiaqi Gao";
    //     }
    // });
    //
    // name_mobile.addEventListener("click", function(){
    //     if (name_mobile.innerHTML == "Jiaqi Gao"){
    //         name_mobile.innerHTML = "高家琪";
    //     }else{
    //         name_mobile.innerHTML = "Jiaqi Gao";
    //     }
    // });

    // blog.addEventListener("click", function(){
    //     if (blog.innerHTML == "Summer 2018 Blog &gt;"){
    //         document.getElementById('bio').style.display = 'none';
    //         document.getElementById('blog').style.textAlign = 'left';
    //         document.getElementById('first').style.display = 'block';
    //         blog.innerHTML = "< Back";
    //         second.style.display = 'none';
    //         winter2018.style.display = 'none';
    //     }else {
    //         document.getElementById('bio').style.display = 'block';
    //         document.getElementById('blog').style.textAlign = 'right';
    //         document.getElementById('first').style.display = 'none';
    //         blog.innerHTML = "Summer 2018 Blog >";
    //         winter2018.style.display = 'block';
    //         winter2018.innerHTML = "What I learned about backpacking alone in the Northeast >";
    //     }
    // });

    // winter2018.addEventListener("click", function(){
    //     if (winter2018.innerHTML == "What I learned about backpacking alone in the Northeast &gt;") {
    //         document.getElementById('bio').style.display = 'none';
    //         document.getElementById('winter2018').style.textAlign = 'left';
    //         document.getElementById('second').style.display = 'block';
    //         document.getElementById('first').style.display = 'none';
    //         blog.style.display = 'none';
    //         winter2018.innerHTML = "< Back";
    //     }else {
    //         document.getElementById('bio').style.display = 'block';
    //         document.getElementById('winter2018').style.textAlign = 'right';
    //         document.getElementById('second').style.display = 'none';
    //         document.getElementById('first').style.display = 'none';
    //         blog.style.display = 'block';
    //         blog.innerHTML = "Summer 2018 Blog >";
    //         winter2018.innerHTML = "What I learned about backpacking alone in the Northeast >";
    //     }
    // });


    document.getElementById("translate").addEventListener("click", function(){
        console.log(!(document.getElementById("option1").checked));

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
            date.innerHTML += "my dudes <br>";
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
