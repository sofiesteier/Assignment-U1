"use strict"

async function send_request (request) {
    
    const promise = await fetch(request);
    
    return promise;
}

