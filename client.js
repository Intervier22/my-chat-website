const socket= io('http://localhost:8000');

const form=document.getElementById('send-con');
const messageInput=document.getElementById('mi')
const container=document.querySelector('.container')
const append= (message,position) =>{
    const me=document.createElement('div');
    me.innerText = message;
    me.classList.add('message')
    me.classList.add(position)
    container.append(me);
}

form.addEventListener('submit', (r)=>{
    r.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right')
    socket.emit('send',message); 
      messageInput.value='';
})
const name= prompt("Enter your name to join");
socket.emit('new-user-joined',name)

socket.on('user-joined', name =>{
append(`${name} joined the chat`,`right`)

})
socket.on('recieve',data =>{
    append(`${data.name} : ${data.message}`,`left`)
})
