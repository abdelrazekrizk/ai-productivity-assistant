export async function summarizeText(text, token) {
  const response = await fetch("https://summarization-api-url", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (!response.ok) throw new Error("Failed to summarize text");
  const data = await response.json();
  return data.summary;
}
