// const socket= io('http://localhost:5500 || process.env.PORT',{transports:['websocket']});
const socket = io({transports:['websocket']});
console.log('run');

//get DOM elements in jS variables
const form=document.getElementById('send');
const messageinput=document.getElementById('messageinp');
const messageContainer=document.querySelector('.container');
var audio= new Audio('ring.mp3');

//function which will append to the container
const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.appendChild(messageElement);
    if(position=='left'){
        audio.play();
    };
};

//when form is submitted
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageinput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageinput.value="";
});

const Name=prompt("Enter your name to join");
socket.emit('new-user-joined',Name);

//when new user joins(name),receive the event from server
socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'right');
});

//when new message recieve ,receive the event from server
socket.on('receive',data=>{
    append(`${data.name} : ${data.message} `,'left');
});
//when someone left,broadcast to all other people
socket.on('left',data=>{
    append(`${data} left the chat `,'left');
});

