export async function translateText(text, token, targetLanguage) {
  const response = await fetch("https://translation-api-url", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text, targetLanguage }),
  });
  if (!response.ok) throw new Error("Failed to translate text");
  const data = await response.json();
  return data.translation;
}
