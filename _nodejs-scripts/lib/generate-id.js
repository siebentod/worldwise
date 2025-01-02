export function generateId(title, maxLength = 50) {
  // Простая транслитерация русского текста в латиницу
  const translitMap = {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    е: 'e',
    ё: 'e',
    ж: 'zh',
    з: 'z',
    и: 'i',
    й: 'y',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'kh',
    ц: 'ts',
    ч: 'ch',
    ш: 'sh',
    щ: 'shch',
    ы: 'y',
    э: 'e',
    ю: 'yu',
    я: 'ya',
    ь: '',
    ъ: '',
    ' ': '-',
    '–': '-',
    '—': '-',
  };

  const transliterate = (text) =>
    text
      .toLowerCase()
      .split('')
      .map((char) => translitMap[char] || char)
      .join('');

  // Удаляем знаки препинания, транслитерируем, и заменяем пробелы на дефисы
  const cleanedTitle = transliterate(title)
    .replace(/[^a-z0-9-]/g, '') // Убираем все символы, кроме латинских букв, цифр и дефисов
    .replace(/-+/g, '-') // Заменяем несколько дефисов подряд на один
    .replace(/^-|-$/g, ''); // Убираем дефисы в начале и конце строки

  // Ограничиваем длину
  return cleanedTitle.slice(0, maxLength);
}
