import { fileURLToPath } from 'url';
import fs from 'fs';
import * as path from 'path';
import { processJsonContent } from './process-json-content.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const inputFolder = path.join(__dirname, 'input-folder');
const outputFolder = path.join(__dirname, 'output-folder');

fs.readdir(inputFolder, (err, files) => {
  if (err) {
    console.error('Ошибка чтения папки:', err);
    return;
  }

  const jsonFiles = files.filter((file) => file.endsWith('.json'));

  const newFiles = [];

  async function processJsonFiles() {
    try {
      for (const file of jsonFiles) {
        console.log(file);
        const filePath = path.join(inputFolder, file);
        const jsonContent = fs.readFileSync(filePath, 'utf-8');
        const newContent = await processJsonContent(jsonContent);
        newFiles.push({ file, newContent });
      }
    } catch (error) {
      console.error('Произошла ошибка:', error.message);
      throw error;
    }
  }

  processJsonFiles()
    .then(() => {
      newFiles.forEach(({ file, newContent }) => {
        const outputFilePath = path.join(outputFolder, file);
        fs.writeFile(outputFilePath, newContent, 'utf8', (err) => {
          if (err) {
            console.error('Произошла ошибка:', err.message);
            throw err;
          }
        });
      });
    })
    .catch((error) => {
      console.error('Произошла ошибка:', error);
    })
    .finally(() => {
      console.log('Процесс завершен успешно!');
    });
});
