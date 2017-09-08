"use strick";

const socket = io();
const chatInput = document.querySelector(".chat-form input[type=text]");
// window.setTimeout(() => {
//     socket.emit("chat:add", {
//         message: "blegh" 
//     });
// }, 2000 );

chatInput.addEventListener("keypress", event => {
    if (event.keyCode !== 13)
        return;
    
    event.preventDefault();

    const text = event.target.value.trim();
    if (text.length === 0)
        return;

    socket.emit("chat:add", {
        message: text
    });

    event.target.value = "";
});

const chatList = document.querySelector(".chat-list ul");

socket.on("chat:added",  data => {
    const messageElement = document.createElement("li");
    messageElement.innerText = data.message;
    chatList.appendChild(messageElement);
    chatList.scrollTop = chatList.scrollHeight;
});