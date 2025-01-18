import { generateTags } from '../lib/tags/ai-generate-tags.js';

export async function processJsonContent(jsonContent) {
  const jsonObject = JSON.parse(jsonContent);

  const TITLE = jsonObject.title;
  const TEXT = jsonObject.content;

  const newTags = await generateTags({ TITLE, TEXT });

  if (jsonObject.tags) {
    jsonObject.tags = newTags;
  } else {
    throw new Error('Ключ "tags" не найден.');
  }

  return JSON.stringify(jsonObject, null, 2);
}
