const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

const showChatboxBtn = document.getElementById("showChatboxBtn");



const responses = [
    "Je suis là pour t'aider.",
    
    "Bonjour, merci de me contacter. Actuellement, je ne suis pas disponible, mais je prendrai le temps de lire et de répondre à ta demande dès que possible. Patiente un peu.",
    
    "Bonjour ! Je ne suis pas disponible en ce moment. ton message est important pour moi, et je m'engage à le consulter dès que je serai de retour. Merci pour ta compréhension.",
    
    "Bonjour, merci pour ton message. Actuellement, je ne suis pas en mesure de répondre en détail, mais soit sûr que je prendrai connaissance de ta demande dès que possible. Merci pour ta patience.",
    
    "Salut ! ton message a retenu toute mon attention, mais malheureusement, je ne suis pas disponible en ce moment. Je m'efforcerai de traiter ta demande dans les plus brefs délais. 😄",
    
    "Bonjour, merci pour ton message. À l'heure actuelle, je ne suis pas disponible pour répondre immédiatement, mais soit assuré que je le ferai dès que je le pourrai. Ta compréhension est très appréciée.",
  ];
  

let userMessage = null; // Variable to store user's message
const API_KEY = ""; // Paste your API key here
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">            <img src="logo1.png" alt="Local Logo" id="logo" class="logochat" height=20px margin-top="5px"> </span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // return chat <li> element
}

const generateResponse = (chatElement) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = chatElement.querySelector("p");

    // Définissez les propriétés et le message pour la requête API
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userMessage }],
        })
    }

    // Envoyez une requête POST à l'API, obtenez la réponse et définissez la réponse comme texte du paragraphe
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        if (data.choices && data.choices.length > 0) {
            // Si une réponse est renvoyée par l'API, utilisez-la
            messageElement.textContent = data.choices[0].message.content.trim();
        } else {
            // Sélectionnez une réponse aléatoire parmi les réponses possibles
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            messageElement.textContent = randomResponse;
        }
    }).catch(() => {
        messageElement.classList.add("error");
        messageElement.textContent = "Bonjour! Je ne suis pas disponible pour le moment, je te recontacte dès que possible.";
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

const handleChat = () => {
    userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
    if(!userMessage) return;

    // Clear the input textarea and set its height to default
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    
    setTimeout(() => {
        // Display "Thinking..." message while waiting for the response
        const incomingChatLi = createChatLi("Est entrain d'écrire...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}

chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window 
    // width is greater than 800px, handle the chat
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));

showChatboxBtn.addEventListener("click", () => {
  document.body.classList.add("show-chatbot");
});
