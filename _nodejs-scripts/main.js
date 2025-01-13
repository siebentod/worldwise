import fs from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { regexH } from './lib/regex-h.js';
import { regexNoH } from './lib/regex-no-h.js';
import { generateId } from './lib/generate-id.js';
import { getTitle } from './lib/get-title.js';
import { getCurrentDate } from './lib/get-current-date.js';

import { generateTags } from './lib/tags/ai-generate-tags.js';

// PREFERENCES

const THEME = 'phi'; //phi, psy, rel
const processContent = regexNoH; // regexH / regexNoH
const MODEL = 'sber'; // sber, vsegpt

// PREFERENCES

const __dirname = dirname(fileURLToPath(import.meta.url));
const inputFilePath = path.join(__dirname, 'input.txt');

try {
  const content1Initial = await fs.readFile(inputFilePath, 'utf-8');

  const [content2WithoutTitle, TITLE] = getTitle(content1Initial);

  const ID = generateId(TITLE);

  const outputFilePath = path.join(__dirname, `json/${ID}.json`);

  const fileExists = await fs
    .access(outputFilePath)
    .then(() => true)
    .catch(() => false);

  if (fileExists) {
    throw new Error('JSON файл уже существует.');
  }

  const TAGS = await generateTags({
    TITLE,
    TEXT: content2WithoutTitle,
    MODEL,
  });

  if (!TAGS) {
    throw new Error('Ошибка при генерации тегов.');
  }

  const content3Processed = processContent(content2WithoutTitle);

  const jsonData = {
    title: TITLE,
    date: getCurrentDate(),
    content: content3Processed,
    tags: TAGS,
    theme: THEME,
    id: ID,
  };

  await fs.writeFile(
    outputFilePath,
    JSON.stringify(jsonData, null, 2),
    'utf-8'
  );
  console.log('JSON файл успешно создан:', outputFilePath);
} catch (error) {
  console.error('Ошибка при выполнении скрипта:', error);
}
