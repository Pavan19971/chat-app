const http = require('http')
const path = require('path')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')

const app = express();
const server = http.createServer(app)
const io = socketio(server)

//__dirname is the current file location $ ../path to move a bit back
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath))



//io.on to send to everybody
//socket.emit to one
//scoket.broadcast.emit toeverybody except one

io.on('connection',(socket)=>{
    socket.emit('message',"welcome");
    socket.broadcast.emit('message', 'A new use has joined!');

    socket.on('sendMessage',(text,callback)=>{
        const filter = new Filter();
        if(filter.isProfane(text)){
            return callback("Profanity is not allowed");
        }
        io.emit('message',text);
        callback('delivered')
    })
    socket.on('disconnect',()=>{
        io.emit('message', 'A user has left')
    })
    socket.on('sendLocation',location=>{
      io.emit('message',`https://google.com/maps?q=${location.latitude},${location.longitude}`)
    })
    
})


server.listen(port,()=>{
    console.log(`Server is on up on port ${port}!`)
})

