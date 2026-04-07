let currentMode = "review";

function setMode(mode) {

  currentMode = mode;

  const titles = {
    review: "Code Reviewer",
    bug: "Bug Fix Assistant",
    crud: "CRUD API Generator"
  };

  document.getElementById("modeTitle").innerText = titles[mode];

}


async function sendPrompt() {

  const input = document.getElementById("inputBox").value;

  if (!input.trim()) {
    alert("Please enter something first!");
    return;
  }

  const output = document.getElementById("outputBox");

  output.innerHTML = "<span class='text-cyan-400 animate-pulse'>Thinking...</span>";
  try {

    const response = await fetch("/api/ask", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        prompt: `${currentMode}: ${input}`
      })

    });

    const data = await response.json();

    output.innerHTML = formatResponse(data.reply);

  } catch (error) {

    output.innerText = "Error connecting to AI server.";

  }

}
/* 👇 ADD THIS FUNCTION AT THE BOTTOM */
function formatResponse(text) {

  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/`(.*?)`/g, "<code class='bg-black/40 px-1 rounded'>$1</code>")
    .replace(/\n/g, "<br>");

}
function clearInput() {

  const input = document.getElementById("inputBox");
  const clearBtn = document.getElementById("clearBtn");

  input.value = "";

  clearBtn.innerHTML = "✅ Cleared";

  setTimeout(() => {
    clearBtn.innerHTML = "🧹 Clear";
  }, 1500);

}

function copyOutput() {

  const output = document.getElementById("outputBox").innerText;
  const copyBtn = document.getElementById("copyBtn");

  if (!output.trim()) return;

  navigator.clipboard.writeText(output);

  // Change button text + icon
  copyBtn.innerHTML = "✅ Copied";

  // Restore original text after 2 seconds
  setTimeout(() => {
    copyBtn.innerHTML = "📋 Copy Output";
  }, 2000);

}