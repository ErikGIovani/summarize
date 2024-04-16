import { capitalize } from "./capitalize";

export async function fetching(text: string, token: string, userId: string) {
  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${userId}/ai/run/@cf/meta/llama-2-7b-chat-fp16`,
      {
        method: "POST",
        body: JSON.stringify({
          messages: [
            { role: "system", content: "You are a friendly assistant" },
            {
              role: "user",
              content: `The following text is from a website, try to understand what the website is about and explain it: ${text}`,
            },
          ],
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return capitalize(data.result.response);
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}
