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
        console.log(response.status);
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
        const contacting_server = document.querySelector(".contacting_server");
        contacting_server.style.display = "block";
        document.querySelector("#wrapper").classList.toggle("blurred_background")

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

        contacting_server.style.display = "none";
        

        if(response.ok) {
            const resource = await response.json();
            console.log(resource);
        } else if (response.status === 409) {
            const statusCode_409 = document.querySelector(".statusCode_409");
            const close_409_button = document.querySelector(".close_409");
            statusCode_409.style.display = "flex";
            close_409_button.style.display = "block";
            close_409_button.addEventListener("click", close_button);

        } else if (response.status === 418) {
        }
    } catch (e) {
        console.log(e);
    }

    
 

}

function close_button (event) {
   const element = event.target.parentElement;
   element.style.display = "none";
   document.querySelector("#wrapper").classList.toggle("blurred_background");
}