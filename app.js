//node server which will handle socket io connections
// const { Server } = require("socket.io");
// const express=require('express');
// const app=express();
// const PORT=process.env.PORT || 8000;
// const http=require('http').Server(app);
// const io=require('socket.io')(http);

// const users={};

// app.use(express.static('public'))

// app.get('/',(req,res)=>{
//     // res.sendFile(__dirname + '/index.html')
//     res.send('./index.html')
// });



// io.on('connection',socket=>{
//     //if any new user joins,let other users know
//     socket.on('new-user-joined',name =>{
//         // console.log(name,"joined the chat");
//         users[socket.id]=name;
//         socket.broadcast.emit('user-joined',name)
//         console.log(users);
//     });

//     //if anyone sends a message,broadcast to all other peoples
//     socket.on('send',message=>{
//         socket.broadcast.emit('receive',{message:message,name:users[socket.id]});
//     });

//     //if someone leaves the chat ,let other users know
//     socket.on('disconnect',message=>{
//         socket.broadcast.emit('left',users[socket.id]);
//         delete users[socket.id];
//     });


// });

// app.listen(PORT,()=>{
//     console.log(`running on ${PORT}`);
    
// })




// const express=require('express');
// const app=express();
// const path=require('path');
// const { Server } = require("socket.io");
// const PORT=process.env.PORT || 8000;
// const http=require('http').Server(app);
// const io=require('socket.io')(http);




// const users={};

// //use static website
// app.use('/static_folder',express.static('static_folder'));
// app.use(express.urlencoded());

// // //set template as pug
// // app.set('views',path.join(__dirname,'template'));

// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname + '/static_folder/index.html'));

//     io.on('connection',socket=>{
//     //if any new user joins,let other users know
//     socket.on('new-user-joined',name =>{
//         // console.log(name,"joined the chat");
//         users[socket.id]=name;
//         socket.broadcast.emit('user-joined',name)
//         console.log(users);
//     });

//     //if anyone sends a message,broadcast to all other peoples
//     socket.on('send',message=>{
//         socket.broadcast.emit('receive',{message:message,name:users[socket.id]});
//     });

//     //if someone leaves the chat ,let other users know
//     socket.on('disconnect',message=>{
//         socket.broadcast.emit('left',users[socket.id]);
//         delete users[socket.id];
//     });


// });

// });



// app.listen(PORT,()=>{
//     console.log('running');
// });

const express=require('express');
const app=express();
var server=app.listen(process.env.PORT||8000);

app.use(express.static('static_folder'));
console.log('server is running');

const socket=require('socket.io');

const io=socket(server);

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


