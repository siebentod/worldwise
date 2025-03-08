import fs from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { regexH } from './lib/regex-h.js';
import { regexNoH } from './lib/regex-no-h.js';
import { generateId } from './lib/generate-id.js';
import { getTitle } from './lib/get-title.js';
import { getCurrentDate } from './lib/get-current-date.js';

import { generateTags } from './lib/ai-generate-tags.js';
import { composePrompt } from './lib/compose-prompt.js';

// PREFERENCES

const THEME = 'phi'; //phi, psy, rel
const processContent = regexNoH; // regexH / regexNoH
const MODEL = 'chatgpt'; // sber, vsegpt, chatgpt

// PREFERENCES

const __dirname = dirname(fileURLToPath(import.meta.url));
const inputFilePath = path.join(__dirname, 'input.txt');

let content1Initial;

try {
  content1Initial = await fs.readFile(inputFilePath, 'utf-8');

  const [content2WithoutTitle, TITLE] = getTitle(content1Initial);

  const ID = generateId(TITLE);

  const outputJSONPath = path.join(__dirname, `json/${ID}.json`);
  const outputMDPath = path.join(__dirname, `md/${ID}.md`);

  // const fileExists = await fs
  //   .access(outputFilePath)
  //   .then(() => true)
  //   .catch(() => false);

  // if (fileExists) {
  //   throw new Error('JSON файл уже существует.');
  // }

  const PROMPT = composePrompt(TITLE, content2WithoutTitle)

  let TAGS = await generateTags(PROMPT);

  const content3Processed = processContent(content2WithoutTitle);

  const jsonData = {
    title: TITLE,
    date: getCurrentDate(),
    content: content3Processed,
    tags: JSON.parse(TAGS),
    theme: THEME,
    id: ID,
  };

  await fs.writeFile(
    outputJSONPath,
    JSON.stringify(jsonData, null, 2),
    'utf-8'
  );
  await fs.writeFile(
    outputMDPath,
    JSON.stringify(content1Initial, null, 2),
    'utf-8'
  );
  console.log('Файлы успешно созданы:', outputMDPath);
} catch (error) {
  console.error('Ошибка при выполнении скрипта:', error);
}
