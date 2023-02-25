"use strict"

async function login () {
    const contacting_server = document.querySelector(".contacting_server");
    contacting_server.style.display = "block";
    document.querySelector(".transparent_background").style.display = "flex";
    
    const username = document.querySelector(".username input").value;
    const password = document.querySelector(".password input").value;       
    
    const response = await send_request(`https://teaching.maumt.se/apis/access/?action=check_credentials&user_name=${username}&password=${password}`);
    
    contacting_server.style.display = "none";

    if(response.ok) {
        const resource = await response.json();
        quiz_layout(resource.data.user_name);
    } else if (response.status === 404) {
        document.querySelector(".feedback_login").textContent = "Wrong user name or password."
        document.querySelector(".feedback_login").style.backgroundColor = "white";
     } else if (response.status === 418) {
        create_statusCode("The server thinks it's not a teapot!")
    }    
}

function register_layout () {
    document.querySelector(".feedback_login").style.backgroundColor = "";
    document.querySelector(".login_button").style.display = "none";
    document.querySelector(".register_here_link").style.display = "none";
    document.querySelector(".register_button").style.display = "block";
    document.querySelector(".login_here_link").style.display = "block";


    document.querySelector(".feedback_login").textContent = "Ready when you are..."
    document.querySelector("#wrapper").classList.remove("background_login");
    document.querySelector("#wrapper").classList.add("background_register");

    document.querySelector(".login_here_link").addEventListener("click", login_layout);
    document.querySelector(".register_button").addEventListener("click", register);


}

function login_layout () {
    document.querySelector(".login_button").style.display = "block";
    document.querySelector(".register_here_link").style.display = "block";
    document.querySelector(".register_button").style.display = "none";
    document.querySelector(".login_here_link").style.display = "none";


    document.querySelector(".feedback_login").textContent = "Let the magic start!"
    document.querySelector("#wrapper").classList.add("background_login");
    document.querySelector("#wrapper").classList.remove("background_register");
}



async function register () {
    
    try {
        const contacting_server = document.querySelector(".contacting_server");
        contacting_server.style.display = "block";
        document.querySelector(".transparent_background").style.display = "flex";
        

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
            create_statusCode("Registration complete. Please proceed to login.")
        } else if (response.status === 409) {
            create_statusCode("Sorry, that name is taken. Please try another one.");
        } else if (response.status === 418) {
            create_statusCode("The server thinks it's not a teapot!")
        }
    } catch (e) {
        console.log(e);
    }

}

function close_button (event) {
   const element = event.target.parentElement;
   element.style.display = "none";
   document.querySelector(".transparent_background").style.display = "none";
}

function create_statusCode (string) {
    const statusCode = document.querySelector(".statusCode");
    const close_b = document.querySelector(".close_button");
    const p_statusCode = document.querySelector(".statusCode > p");

    statusCode.style.display = "flex";
    close_b.style.display = "block";

    p_statusCode.textContent = string;
    close_b.addEventListener("click", close_button);
}

