const apiKey =
  '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';

const TITLE = 'Философия Георгия Гурджиева';

const PROMPT = `Напиши длинную познавательную статью с названием ${TITLE}. Не используй пустые риторические фразы, будь скромнее и лаконичнее, строже. Не используй перечисления чего-либо. Не дели на главы. Выделяй основные идеи и понятия жирным шрифтом, но не больше 4 слов подряд`;
let TEXT;
let TAGS;

(async function GPTWork() {
  await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'omni-moderation-latest',
      store: true,
      messages: [{ role: 'user', content: PROMPT }],
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      TEXT = data.choices[0].message.content;
      console.log(data);
      console.log('Text generated successfully. Model:', data.model);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

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
          content: `Напиши 5 тегов для статьи в разделе "Философия". Теги скорее должны касаться затрагиваемого автора и раздела философии, чем "темы статьи". Т.е. не надо писать теги вроде "социальная ответственность", "человеческая природа", "смерть", "любовь". Хорошие примеры: "Кант", "Такер", "ЭтикаДобродетели", "НовоеВремя". Верни их в формате json.\n\n${TEXT}`,
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

  const fileContent = `${TAGS}\n\n# ${TITLE}\n\n${TEXT}`;

  // Создаем файл для скачивания
  const blob = new Blob([fileContent], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${TITLE}.md`;
  a.click();
  URL.revokeObjectURL(url);
})();
