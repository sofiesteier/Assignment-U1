"use strict"


let get_user_data = localStorage.getItem("user_login");
let user_data_parse = JSON.parse(get_user_data);

if (user_data_parse) {
    const login_username = user_data_parse.userName;
    quiz_layout(login_username);
} else {
    console.log("Sticky, did not work");
}
