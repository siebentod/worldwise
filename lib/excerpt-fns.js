import { convert } from 'html-to-text';

export function defaultExcerpt(content, maxLength = 100) {
  const strippedContent = convert(content);
  if (strippedContent.length <= maxLength) return strippedContent; // Если текст короткий

  // Обрезаем текст до максимальной длины
  let excerpt = strippedContent.slice(0, maxLength);

  // Ищем последний пробел, чтобы завершить текст на целое слово
  const lastSpaceIndex = excerpt.lastIndexOf(' ');
  if (lastSpaceIndex > 0) {
    return excerpt.slice(0, lastSpaceIndex).trim() + '...';
  }

  excerpt = excerpt.replace(/[.,!?;:]+$/, '');

  // Если пробелов нет, просто возвращаем обрезанный текст с многоточием
  return excerpt.trim() + '...';
}

export function searchExcerpt(content, searchQuery, contextLength = 45) {
  const strippedContent = convert(content);

  const queryLower = searchQuery.toLowerCase();
  const contentLower = strippedContent.toLowerCase();

  // Находим индекс вхождения строки
  const matchIndex = contentLower.indexOf(queryLower);

  if (matchIndex === -1) return ''; // Если совпадения не найдено

  // Определяем начало и конец выделенного текста с учётом контекста
  const start = Math.max(matchIndex - contextLength, 0);
  let end = Math.min(
    matchIndex + queryLower.length + contextLength,
    strippedContent.length
  );

  // Проверяем последний пробел в рамках текущего конца
  const lastSpaceIndex = strippedContent.lastIndexOf(' ', end);
  if (lastSpaceIndex > matchIndex + queryLower.length) {
    end = lastSpaceIndex; // Корректируем `end`, чтобы текст заканчивался целым словом
  }

  // Извлекаем окружение текста
  let excerpt = strippedContent.slice(start, end).trim();

  // Убираем лишние знаки препинания в конце
  excerpt = excerpt.replace(/[.,!?;:]+$/, '');

  // Добавляем жирное выделение для искомого текста
  const highlightedQuery = `<b>${strippedContent.slice(
    matchIndex,
    matchIndex + searchQuery.length
  )}</b>`;
  excerpt = excerpt.replace(
    strippedContent.slice(matchIndex, matchIndex + searchQuery.length),
    highlightedQuery
  );

  // Добавляем многоточия, если есть обрезка текста
  const prefix = start > 0 ? '...' : '';
  const suffix = end < strippedContent.length ? '...' : '';

  return `${prefix}${excerpt}${suffix}`;
}
