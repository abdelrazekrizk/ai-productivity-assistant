chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  try {
    if (message.action === "summarize") {
      const result = await summarizeText(message.text);
      sendResponse({ result });
    } else if (message.action === "prompt") {
      const result = await promptText(message.text);
      sendResponse({ result });
    } else if (message.action === "translate") {
      const result = await translateText(message.text);
      sendResponse({ result });
    } else {
      sendResponse({ result: "Unknown action." });
    }
  } catch (error) {
    sendResponse({ result: `Error: ${error.message}` });
  }
  return true; // Keeps the message port open for asynchronous response.
});

// Summarization API
async function summarizeText(text) {
  try {
    const response = await fetch("https://summarization-api-url", {
      method: "POST",
      headers: {
        "Authorization": `Bearer YOUR_SUMMARIZATION_API_TOKEN`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    return data.summary;
  } catch (error) {
    console.error("Summarization error:", error);
    throw error;
  }
}

// Prompt API
async function promptText(text) {
  const response = await fetch("https://prompt-api-url", {
    method: "POST",
    headers: {
      "Authorization": `Bearer YOUR_PROMPT_API_TOKEN`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: text }),
  });
  if (!response.ok) throw new Error("Failed to process prompt");
  const data = await response.json();
  return data.response;
}

// Translation API
async function translateText(text) {
  const response = await fetch("https://translation-api-url", {
    method: "POST",
    headers: {
      "Authorization": `Bearer YOUR_TRANSLATION_API_TOKEN`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text, targetLanguage: "es" }), // Example: Translate to Spanish
  });
  if (!response.ok) throw new Error("Failed to translate text");
  const data = await response.json();
  return data.translation;
}
