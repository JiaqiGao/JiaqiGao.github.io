$(document).ready(function(){
    var name_desktop = document.getElementById("name_desktop");
    var name_mobile = document.getElementById("name_mobile");
    var motivation = document.getElementById("motivation");
    var blog = document.getElementById("blog");

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

    blog.addEventListener("click", function(){
        if (blog.innerHTML == "Summer 2018 Blog &gt;"){
            document.getElementById('bio').style.display = 'none';
            document.getElementById('blog').style.textAlign = 'left';
            document.getElementById('first').style.display = 'block';
            blog.innerHTML = "< Back"
        }else{
            document.getElementById('bio').style.display = 'block';
            document.getElementById('blog').style.textAlign = 'right';
            document.getElementById('first').style.display = 'none';
            blog.innerHTML = "Summer 2018 Blog >"
        }
    })
    
    var yena = document.getElementById("yena");
    yena.addEventListener("click", function() {
        yena.style.color = "lightblue";
        yena.style.textDecoration = "none";
        yena.innerHTML = "tofu <3";
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
    date.innerHTML = "It is " + weekdays[wk] + " "
    if (weekdays[wk] == "Wednesday")
          date.innerHTML += "my dudes <br>" 
    date.innerHTML += month + "/" + d.getDate() + "/" + d.getFullYear() + "  ";
    date.innerHTML += h + ":" + m + ":" + s;
    if ((month == "12") && (d.getDate() == "16"))
        data.innerHTML = "Today marks my " + (int)d.getFullYear() - 1999 + " years of surviving on this planet with you!";
    var t = setTimeout(time, 500);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}
