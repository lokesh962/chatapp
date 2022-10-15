//node server which will handle socket io connections
const { Server } = require("socket.io");
const express=require('express');
const app=express();
const PORT=process.env.PORT || 8000;
const http=require('http').Server(app);
const io=require('socket.io')(http);

const users={};

app.use(express.static('public'))

app.get('/',(req,res)=>{
    // res.sendFile(__dirname + '/index.html')
    res.send('./index.html')
});



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

app.listen(PORT,()=>{
    console.log(`running on ${PORT}`);
    
})