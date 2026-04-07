let currentMode = "review";


function setMode(mode){

currentMode = mode;

const titles = {
review:"Code Reviewer",
bug:"Bug Fix Assistant",
crud:"CRUD API Generator"
};

document.getElementById("modeTitle").innerText = titles[mode];

console.log("Mode changed:", mode);

}


async function sendPrompt(){

console.log("Analyze button clicked"); // debug test

const input = document.getElementById("inputBox").value;
const output = document.getElementById("outputBox");

if(!input.trim()){
output.innerHTML = "Please enter input first.";
return;
}

output.innerHTML = "Thinking...";

try{

const response = await fetch("/api/ask", {

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
mode:currentMode,
input:input
})

});

const data = await response.json();

output.innerHTML = formatResponse(data.reply);

}catch(error){

console.error(error);

output.innerHTML = "Server connection failed.";

}

}


// function formatResponse(text) {

//   // Fix language-style code blocks like ```cpp
//   text = text.replace(/```(\w+)?\n([\s\S]*?)```/g, function(match, lang, code) {
//     return `
//       <div class="my-4 rounded-xl bg-[#0d1117] border border-white/10">
//         <div class="px-4 py-2 text-xs text-gray-400 border-b border-white/10">
//           ${lang || "code"}
//         </div>
//         <pre class="p-4 overflow-x-auto text-sm font-mono text-green-300">
// ${code}
//         </pre>
//       </div>
//     `;
//   });

//   // Inline code
//   text = text.replace(/`([^`]+)`/g,
//     "<code class='bg-black/40 px-2 py-1 rounded text-cyan-300'>$1</code>"
//   );

//   // Bold text
//   text = text.replace(/\*\*(.*?)\*\*/g,
//     "<strong class='text-white'>$1</strong>"
//   );

//   // Numbered lists
//   text = text.replace(/^\d+\.\s+(.*)$/gm,
//     "<div class='ml-4'>• $1</div>"
//   );

//   // Bullet points
//   text = text.replace(/^\*\s+(.*)$/gm,
//     "<div class='ml-4'>• $1</div>"
//   );

//   // Line breaks
//   text = text.replace(/\n/g, "<br>");

//   return text;
// }
function formatResponse(text) {

  // Code blocks ```language
  text = text.replace(/```(\w+)?\n([\s\S]*?)```/g,
    (match, lang, code) => `
      <div class="my-6 rounded-xl bg-[#0d1117] border border-white/10">
        <div class="px-4 py-2 text-xs text-gray-400 border-b border-white/10">
          ${lang || "code"}
        </div>
        <pre class="p-4 overflow-x-auto text-sm font-mono text-green-300 leading-6">
${code}
        </pre>
      </div>`
  );

  // Headings
  text = text.replace(/^## (.*)$/gm,
    "<h2 class='text-xl font-semibold mt-6 mb-2 text-cyan-400'>$1</h2>"
  );

  // Bullet points
  text = text.replace(/^\* (.*)$/gm,
    "<div class='ml-4'>• $1</div>"
  );

  // Line spacing
  text = text.replace(/\n/g, "<br>");

  return text;
}
function clearInput() {

  const inputBox = document.getElementById("inputBox");
  const clearBtn = document.getElementById("clearBtn");

  if (!inputBox) return;

  inputBox.value = "";

  clearBtn.innerHTML = "✅ Cleared";

  setTimeout(() => {
    clearBtn.innerHTML = "🧹 Clear";
  }, 1500);
}



// function copyOutput() {

//   const outputBox = document.getElementById("outputBox");
//   const copyBtn = document.getElementById("copyBtn");

//   if (!outputBox) return;

//   const text = outputBox.innerText.trim();

//   if (!text) {
//     copyBtn.innerHTML = "⚠ Nothing to copy";
//     setTimeout(() => {
//       copyBtn.innerHTML = "📋 Copy Output";
//     }, 1500);
//     return;
//   }

//   navigator.clipboard.writeText(text);

//   copyBtn.innerHTML = "✅ Copied";

//   setTimeout(() => {
//     copyBtn.innerHTML = "📋 Copy Output";
//   }, 2000);
// }
function copyOutput() {

  const outputBox = document.getElementById("outputBox");
  const copyBtn = document.getElementById("copyBtn");

  if (!outputBox || !copyBtn) return;

  // Remove placeholder text before checking
  const text = outputBox.innerText.replace("AI response will appear here...", "").trim();

  if (!text) {

    copyBtn.innerHTML = "⚠ Nothing to copy";

    setTimeout(() => {
      copyBtn.innerHTML = "📋 Copy Output";
    }, 1500);

    return;
  }

  navigator.clipboard.writeText(text);

  copyBtn.innerHTML = "✅ Copied";

  setTimeout(() => {
    copyBtn.innerHTML = "📋 Copy Output";
  }, 2000);
}