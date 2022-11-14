const messageContainer = document.querySelector(".fil")
const messageField = document.querySelector('#messageField')
const sendMessageButton = document.querySelector('#sendMessageButton')
const regUsername = document.querySelector('#regUsername')
const regPassword = document.querySelector('#regPassword')
const regButton = document.querySelector('#regButton')

regButton.addEventListener("click", ()=>{
    register(regUsername.value, regPassword.value)
})

sendMessageButton.addEventListener("click", ()=>{
    getMessages()
    sendMessage(messageField.value)
})

let userId = 2

function getMessages(){
     fetch('https://192.168.12.246:8000/messages')
        .then(reponse=>reponse.json())
        .then(data=>{
            console.log(data)
            data.forEach(message=>{
                creerMessage(message)
            })
        })
}

function creerMessage(message){
    let template = `
    <div class="card mt-2 mb-2">
        <div class="card-body">
            <blockquote class="blockquote mb-0">
                <p class="text-center">${message.content}</p>
                <footer class="blockquote-footer text-center">${message.author.username}</footer>
            </blockquote>
        </div>
    </div>
    `
     messageContainer.innerHTML += template
 }

 getMessages()

function sendMessage(messageText){
    let url = `https://192.168.12.246:8000/messages/${userId}/new`
    let body = {
        content : messageText
    }
    let bodySerialise = JSON.stringify(body)
    let fetchParams = {
        method : "POST",
        body: bodySerialise
    }
    fetch(url, fetchParams)
}

function register(username, password){
    let url = `https://192.168.12.246:8000/register`
    let body = {
        username: username,
        password: password
    }
    let bodySerialise = JSON.stringify(body)
    let fetchParams = {
        method: "POST",
        body : bodySerialise
    }
    fetch(url, fetchParams)
        .then(reponse=>reponse.json())
        .then(data=>{
            console.log(data)
        })
}