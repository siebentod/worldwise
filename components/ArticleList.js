import Link from 'next/link';
import Author from './Author';
import Image from 'next/image';
import TagLink from './TagLink';
import parse from 'html-react-parser';
import { convert } from 'html-to-text';

function defaultExcerpt(content, maxLength = 100) {
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

function searchExcerpt(content, searchQuery, contextLength = 45) {
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

export default function ArticleList({
  filteredArticles: articles,
  selectedTags,
  searchQuery,
}) {
  const excerpt = (article) =>
    searchQuery &&
    article.content.toLowerCase().includes(searchQuery.toLowerCase())
      ? searchExcerpt(article.content, searchQuery) // Показываем текст вокруг строки
      : defaultExcerpt(article.content);

  return (
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
      {articles.map((article) => (
        <div key={article.slug} className="border p-4 pr-3 rounded">
          <h2 className="text-xl font-semibold mb-2 leading-6">
            <Link href={`/articles/${article.slug}`}>{article.title}</Link>
          </h2>
          <p className="text-gray-600 mb-2">{article.date}</p>
          <p className="mb-2">{parse(excerpt(article))}</p>
          <div className="flex justify-between items-center">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <TagLink tag={tag} key={tag} selectedTags={selectedTags} />
              ))}
            </div>
            {/* <div className="flex items-center justify-end text-end">
              <Image
                src="/avatar.png"
                alt={`Avatar of Νοῦς Τεχνητός`}
                width={20}
                height={20}
                className="rounded-full"
              />
            </div> */}
          </div>
        </div>
      ))}
    </div>
  );
}
