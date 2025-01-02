import fs from 'fs/promises';
import path, { dirname } from 'path';
import { regexH } from './lib/regex-h.js';
import { regexNoH } from './lib/regex-no-h.js';
import { generateId } from './lib/generate-id.js';
import { fileURLToPath } from 'url';

const TITLE = 'On Alain Badiou Philosophy';
const TAGS = ['Ницше'];
const THEME = 'phi'; //phi, psy, rel
const USE_REGEX_H = false; // h or no-h

// Абсолютные пути для файлов
const ID = generateId(TITLE);
const __dirname = dirname(fileURLToPath(import.meta.url));
const inputFilePath = path.join(__dirname, 'input.txt');
const outputFilePath = path.join(__dirname, `${ID}.json`);

// Генерация текущей даты в формате "YYYY-MM-DD"
function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Чтение содержимого input.txt
try {
  const inputContent = await fs.readFile(inputFilePath, 'utf-8');

  // Выбор функции обработки
  const processedContent = USE_REGEX_H
    ? regexH(inputContent)
    : regexNoH(inputContent);

  // Создание JSON-объекта
  const jsonData = {
    title: TITLE,
    date: getCurrentDate(),
    content: processedContent,
    tags: TAGS,
    theme: THEME,
    id: ID,
  };

  // Запись JSON в файл
  await fs.writeFile(
    outputFilePath,
    JSON.stringify(jsonData, null, 2),
    'utf-8'
  );
  console.log('JSON файл успешно создан:', outputFilePath);
} catch (error) {
  console.error('Ошибка при выполнении скрипта:', error);
}
