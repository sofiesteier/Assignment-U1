"use strict"

async function login () {
    
    const username = document.querySelector(".username input").value;
    const password = document.querySelector(".password input").value;       
    
    const response = await send_request(`?action=check_credentials&user_name=${username}&password=${password}`);
        
    if(response.status === 404) {
        console.log("fel inlogg");
    } else if(response.status === 418) {
        console.log(response.statusText);
    } else {
        const resource = await response.json();
        console.log("sucess!!");
    }
}

function register_layout () {

    document.querySelector(".login_button").style.display = "none";
    document.querySelector(".register_button").style.display = "block";
    


    document.querySelector(".feedback_log_in").textContent = "Ready when you are..."
    document.querySelector("#wrapper").classList.remove("background_login");
    document.querySelector("#wrapper").classList.add("background_register");


    document.querySelector(".register_button").addEventListener("click", register);


}



async function register () {

    
    
    try {
        const username = document.querySelector(".username input").value;
        const password = document.querySelector(".password input").value;  

        const body_post = {
            action: "register",
            user_name: username,
            password: password,
        };
            
        const options = {
            method: "POST",
            body: JSON.stringify(body_post),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        };
        
        const post_request = new Request ("https://teaching.maumt.se/apis/access/", options);
    
        const response =  await send_request(post_request);

        if(response.ok) {
            const resource = await response.json();
            console.log(resource);
        }
    } catch (e) {
        console.log(e);
    }

    
 

}