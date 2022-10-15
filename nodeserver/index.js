//node server which will handle socket io connections
const { Server } = require("socket.io");
const io=require('socket.io')(process.env.PORT || 8000);

const users={};

io.on('connection',socket=>{
    //if any new user joins,let other users know
    socket.on('new-user-joined',name =>{
        // console.log(name,"joined the chat");
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name)
        console.log(users);
    });

    //if anyone sends a message,broadcast to all other peoples
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]});
    });

    //if someone leaves the chat ,let other users know
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });


});