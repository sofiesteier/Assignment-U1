"use strict"

async function quiz_layout (user_name) {

    document.querySelector(".transparent_background").style.display = "none";
    const contacting_server = document.querySelector(".contacting_server");
    contacting_server.style.display = "block";
    contacting_server.textContent = "Getting a random image..."



    document.querySelector("#wrapper").classList.remove("background_login");
    document.querySelector("#wrapper").classList.add("quiz_background");
    document.querySelector("#container_1").style.display = "none";

    document.querySelector("#container_2").style.display = "flex";
    document.querySelector(".login_information > p").textContent = user_name;


}