export async function promptText(text, token) {
  const response = await fetch("https://prompt-api-url", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: text }),
  });
  if (!response.ok) throw new Error("Failed to process prompt");
  const data = await response.json();
  return data.response;
}
