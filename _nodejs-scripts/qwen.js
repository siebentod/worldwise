import { Client } from '@gradio/client';

async function main() {
  // Подключение к модели
  const client = await Client.connect('Qwen/QVQ-72B-preview', {
    hf_token: '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',
  });

  // Вызов API с текстовым запросом
  const result = await client.predict('/generate', {
    image:
      'https://qwen-qvq-72b-preview.hf.space/gradio_api/file=/tmp/gradio/cae0827f623772bddd2440bebd1831282cf86b060104a28a0424c8bcd1435bb9/cutelogo.jpg', // Структура для изображения
    query: 'Explain the theory of relativity in simple terms', // Ваш текстовый запрос
  });

  // Вывод текстового ответа
  console.log('Text response:', result); // Текстовый ответ
}

main().catch((err) => console.error(err));
