import { sber } from './ai-sber.js';
import { vsegpt } from './ai-vsegpt.js';
import { chatgpt } from './ai-chatgpt.js';
import { composePrompt } from './compose-prompt.js';

export async function generateTags({ TITLE, TEXT, MODEL = 'sber' }) {
  const prompt = composePrompt(TITLE, TEXT);
  let tags;

  if (MODEL === 'sber') {
    tags = await sber(prompt);
  }
  if (MODEL === 'vsegpt') {
    tags = await vsegpt(prompt);
  }
  if (MODEL === 'chatgpt') {
    tags = await chatgpt(prompt);
    return;
  }

  try {
    console.log(tags);
    tags = JSON.parse(tags);
    if (Array.isArray(tags)) {
      return tags;
    } else {
      throw new Error('Ответ не является массивом:', tags);
    }
  } catch (error) {
    throw new Error('Неправильный ответ:', tags);
  }
}
