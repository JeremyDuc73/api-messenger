const messageContainer = document.querySelector(".fil")
const messageField = document.querySelector('#messageField') // INPUT MESSAGE
const sendMessageButton = document.querySelector('#sendMessageButton') // ENVOYER LE FORMULAIRE NOUVEAU MESSAGE
const chatButton = document.querySelector('#chatButton') // AFFICHER LES MESSAGES
const signUpButton = document.querySelector('#signUpButton') // AFFICHER LE FORMULAIRE D'INSCRIPTION
const homeButton = document.querySelector('#homeButton')

homeButton.addEventListener("click",()=>{
    clearContainer()
    templateHome()
})

sendMessageButton.addEventListener("click", ()=>{
    clearContainer()
    getMessages()
    sendMessage(messageField.value)
    messageField.value = ""
})

chatButton.addEventListener("click", ()=>{
    showChat()
})

signUpButton.addEventListener("click",()=>{
    showSignUpForm()
})

let userId = 5

function getMessages(){
     fetch('https://139.162.156.85:8000/messages')
        .then(reponse=>reponse.json())
        .then(data=>{
            console.log(data)
            data.reverse().forEach(message=>{
                templateMessages(message)
            })
        })
}

function clearContainer(){
    messageContainer.innerHTML = ""
}

function templateHome(){
    let template = `
    <div class="mt-5 text-center d-flex flex-column justify-content-center">
        <h1>Bienvenue sur Messenger</h1>
        <h2>Cliquer sur Chat ci-dessus</h2>
    </div>
    `
    messageContainer.innerHTML += template
}

function templateMessages(message){
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

function templateSignUp(){
    let template = `
    <div class="mt-5 text-center d-flex flex-column justify-content-center">
        <h1>S'inscrire</h1>
        <label for="regUsername">Username : </label>
        <input class="mb-4" id="regUsername">
        <label for="regPassword">Password (at least 6) : </label>
        <input class="mb-4" id="regPassword">
        <button id="regButton" class="btn btn-primary">Envoyer</button>
    </div>
    `
     messageContainer.innerHTML += template
     const regButton = document.querySelector('#regButton') // ENVOYER LE FORMULAIRE INSCRIPTION
     const regUsername = document.querySelector('#regUsername') // INPUT USERNAME
     const regPassword = document.querySelector('#regPassword') // INPUT MDP
     regButton.addEventListener("click", ()=>{
         register(regUsername.value, regPassword.value)
         showChat()
     })

 }

async function sendMessage(messageText){
    let url = `https://139.162.156.85:8000/messages/${userId}/new`
    let body = {
        content : messageText
    }
    let bodySerialise = JSON.stringify(body)
    let fetchParams = {
        method : "POST",
        body: bodySerialise
    }
    await fetch(url, fetchParams)
}

async function register(username, password){
    let url = `https://139.162.156.85:8000/register`
    let body = {
        username: username,
        password: password
    }
    let bodySerialise = JSON.stringify(body)
    let fetchParams = {
        method: "POST",
        body : bodySerialise
    }
    await fetch(url, fetchParams)
        .then(reponse=>reponse.json())
        .then(data=>{
            console.log(data)
        })
}

function showChat(){
    clearContainer()
    getMessages()
}

function showSignUpForm(){
    clearContainer()
    templateSignUp()
}