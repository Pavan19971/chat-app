const socket = io()

// socket.on('countUpdated',(count)=>{
//     console.log("the count has been updated! ",count)
// })

// document.querySelector('#increment').addEventListener(('click'),()=>{
//     console.log("cklicked")
//     socket.emit('increment')
// })

socket.on('message', (event) => {
    console.log(event)
})



document.querySelector('#message-form').addEventListener('submit',(e)=>{ 
    e.preventDefault()
    const message = document.querySelector('input').value
    socket.emit('sendMessage',message,(delivered)=>{
        console.log("the message was "+delivered)
    })
})

document.querySelector('#send-location').addEventListener('click',()=>{
    if(!navigator.geolocation)
    {
        return alert(" Geo location is not supported")
    }
    navigator.geolocation.getCurrentPosition((position)=>{
        socket.emit('sendLocation',{latitude:position.coords.latitude, longitude:position.coords.longitude})
    })
})