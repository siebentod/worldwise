const apiKey =
  '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';

let TAGS;

(async function chatgpt() {
  await fetch('https://api.openai.com/v1/chat/completions', {
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
      TAGS = data.choices[0].message.content;
      console.log(data);
      console.log('Text generated successfully. Model:', data.model);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  const fileContent = `${TAGS}`;

  // Создаем файл для скачивания
  const blob = new Blob([fileContent], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `TAGS.md`;
  a.click();
  URL.revokeObjectURL(url);
})();
