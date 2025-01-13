export async function vsegpt(prompt) {
  const apiKey =
    'sk-or-vv-9d4b1a7bd2df4a12bcfed049a2a98c3cf6f07c2acfa7eaeb30a782b634ed42ac';

  const apiURL = 'https://api.vsegpt.ru/v1/chat/completions';

  return await doRequest();

  async function doRequest() {
    await fetch(apiURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        store: true,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Text generated successfully. Model:', data.model);
        return data.choices[0].message.content;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}
