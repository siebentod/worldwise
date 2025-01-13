import { fileURLToPath } from 'url';
import * as path from 'path';
import { replaceTagsInFile } from './replace-tags.js';
// import { composePrompt } from './compose-prompt.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'chetveroyakiy-koren-shopengauera.json');

const newTags = [
  'Шопенгауэр',
  'Эпистемология',
  'Логика',
  'Причинность',
  'Математикs',
];

replaceTagsInFile(filePath, newTags);
