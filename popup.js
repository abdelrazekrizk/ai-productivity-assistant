document.getElementById("summarize-btn").addEventListener("click", () => {
  handleAction("summarize");
});

document.getElementById("prompt-btn").addEventListener("click", () => {
  handleAction("prompt");
});

document.getElementById("translate-btn").addEventListener("click", () => {
  handleAction("translate");
});

function handleAction(action) {
  const text = document.getElementById("input").value;
  if (!text.trim()) {
    alert("Please enter some text.");
    return;
  }

  chrome.runtime.sendMessage({ action, text }, (response) => {
    if (chrome.runtime.lastError) {
      console.error("Runtime error:", chrome.runtime.lastError.message);
      document.getElementById("result").innerText = "Error processing request.";
      return;
    }

    const result = response?.result || "Error: No result received.";
    document.getElementById("result").innerText = result;
  });
}
