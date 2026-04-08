let currentMode = "review";


function setMode(event, mode){

currentMode = mode;

/* TITLE CHANGE */

const titles = {
review:"Code Reviewer",
bug:"Bug Fix Assistant",
crud:"CRUD API Generator"
};

document.getElementById("modeTitle").innerText = titles[mode];


/* PLACEHOLDER CHANGE */

const placeholders = {
review:"Paste your code here to review improvements...",
bug:"Paste your error message or broken code...",
crud:"Describe schema (example: User with name,email,password)..."
};

document.getElementById("inputBox").placeholder = placeholders[mode];


/* CLEAR INPUT + OUTPUT */

document.getElementById("inputBox").value="";

document.getElementById("outputBox").innerHTML =
"<span class='text-gray-500'>AI response will appear here...</span>";



/* ACTIVE BUTTON EFFECT (desktop + mobile) */

document.querySelectorAll(".navBtn").forEach(btn=>{
btn.classList.remove("active");
});

event.target.classList.add("active");

}


/* SEND PROMPT */

async function sendPrompt(){

const input = document.getElementById("inputBox").value;
console.log("Input value:", input);
if(!input){
return;
}

const output = document.getElementById("outputBox");

output.innerHTML = "Analyzing...";


const response = await fetch("/api/ask",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({
mode: currentMode,
input: input
})


});


const data = await response.json();

output.innerHTML = formatResponse(data.reply);

}


/* CLEAR BUTTON */

function clearInput(){

document.getElementById("inputBox").value="";

}


/* COPY BUTTON */

function copyOutput(){

const text = document.getElementById("outputBox").innerText;

if(!text || text==="AI response will appear here..."){
return;
}

navigator.clipboard.writeText(text);

}

function formatResponse(text){

return text
.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>")
.replace(/`(.*?)`/g,"<code class='bg-black/40 px-1 rounded'>$1</code>")
.replace(/\n/g,"<br>");

}