"use strict"

document.querySelector(".logout").addEventListener("click", logout);


async function quiz_layout (user_name) {
    document.querySelector(".background_logo").style.display = "block";
    document.querySelector(".transparent_background_quiz").style.display = "flex"
    document.querySelector(".getting_random_image").style.display = "block";
    document.querySelector("#wrapper").classList.remove("background_login");
    document.querySelector("#wrapper").classList.add("quiz_background");
    document.querySelector("#container_1").style.display = "none";
    document.querySelector("#container_2").style.display = "flex";
    document.querySelector(".contacting_server").style.display = "none";


    
    document.querySelector(".login_information > p").textContent = user_name;

    console.log(ALL_BREEDS.length);
    let for_dogs = [];
    for (let i = 0; i < 4; i++) {
        const dog = ALL_BREEDS.splice(random_number(ALL_BREEDS.length), 1);
        for_dogs.push(dog);
        
    }
    
    console.log(ALL_BREEDS.length);

    const correct_dog = for_dogs[random_number(for_dogs.length)][0];
    console.log(correct_dog);

    const request_breed = new Request (`https://dog.ceo/api/breed/${correct_dog.url}/images/random`)
    const response = await send_request(request_breed);
    console.log(response);

    
    const resource = await response.json();
    console.log(resource);
    document.querySelector(".background_logo").style.display = "none";
    document.querySelector(".getting_random_image").style.display = "none";
    document.querySelector(".transparent_background_quiz").style.display = "none";


    document.querySelector(".dog_image").setAttribute("src", resource.message);
    document.querySelector(".answer_options").style.display = "grid";

    const all_options = document.querySelectorAll(".answer_options > button");
    
    for (let i = 0; i < all_options.length; i++){
        all_options[i].textContent = for_dogs[i][0].name;
    }

    document.querySelector(".quiz_button1").addEventListener("click", quiz);
    document.querySelector(".quiz_button2").addEventListener("click", quiz);
    document.querySelector(".quiz_button3").addEventListener("click", quiz);
    document.querySelector(".quiz_button4").addEventListener("click", quiz);

    function quiz (event) {
        if(event.target.textContent === correct_dog.name) {
            console.log("correct!");
            create_statusCode_quiz("CORRECT!");
        } else {
            console.log("try again");
            create_statusCode_quiz("Sorry, that's not right...");
        }
     }
    
}

function close_button_quiz (event) {
   const element = event.target.parentElement;
   element.style.display = "none";
   document.querySelector(".transparent_background_quiz").style.display = "none";

   const login_username = document.querySelector(".login_information > p").textContent;
   quiz_layout(login_username);
}

function create_statusCode_quiz (string) {
    document.querySelector(".transparent_background_quiz").style.display = "flex";

    const statusCode = document.querySelector(".statusCode_quiz");
    const close_b = document.querySelector(".close_button_quiz");
    const p_statusCode = document.querySelector(".statusCode_quiz > p");

    statusCode.style.display = "flex";
    close_b.style.display = "block";

    p_statusCode.textContent = string;
    close_b.addEventListener("click", close_button_quiz);
}

function logout () {
    document.querySelector(".feedback_login").style.backgroundColor = "";
    document.querySelector(".feedback_login").textContent = "Ready when you are..."
    document.querySelector("#wrapper").classList.remove("quiz_background");
    document.querySelector("#wrapper").classList.add("background_login");
    document.querySelector(".transparent_background").style.display = "none";


    document.querySelector("#container_2").style.display = "none";
    document.querySelector("#container_1").style.display = "flex";

    const username = document.querySelector(".username input");
    const password = document.querySelector(".password input"); 
    
    username.value = "";
    password.value = "";

    localStorage.removeItem("user_login");
}

function random_number(max) {

    return Math.floor(max * Math.random());
};





 