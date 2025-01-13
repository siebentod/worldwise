import { sber } from './ai-sber.js';
import { vsegpt } from './ai-vsegpt.js';
import { composePrompt } from './compose-prompt.js';

export async function generateTags({ TITLE, TEXT, MODEL }) {
  const prompt = composePrompt(TITLE, TEXT);
  let tags;

  if (MODEL === 'sber') {
    tags = await sber(prompt);
  }
  if (MODEL === 'vsegpt') {
    tags = await vsegpt(prompt);
  }

  try {
    tags = JSON.parse(tags);
    if (Array.isArray(tags)) {
      return tags;
    } else {
      throw new Error('Ответ не является массивом:');
    }
  } catch (error) {
    return [];
  }
}
