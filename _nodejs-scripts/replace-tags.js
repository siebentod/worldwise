import fs from 'fs';

export function replaceTagsInFile(filePath, newTags) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Ошибка чтения файла:', err);
      return;
    }

    try {
      const jsonObject = JSON.parse(data);

      if (jsonObject.tags) {
        jsonObject.tags = newTags;
      } else {
        console.log('Ключ "tags" не найден.');
        return;
      }

      const updatedData = JSON.stringify(jsonObject, null, 2);

      fs.writeFile(filePath, updatedData, 'utf8', (err) => {
        if (err) {
          console.error('Ошибка записи файла:', err);
        } else {
          console.log('Файл успешно обновлен!');
        }
      });
    } catch (err) {
      console.error('Ошибка при парсинге JSON:', err);
    }
  });
}
