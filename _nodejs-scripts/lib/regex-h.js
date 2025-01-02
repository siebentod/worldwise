export function regexH(text) {
  // Обработка списков: добавляем <ul> и <li>
  text = text.replace(/^\s*\* (.*)$/gm, '<li>$1</li>'); // Преобразуем строки в <li>
  text = text.replace(/(<li>.*<\/li>)/gms, '<ul>$1</ul>'); // Оборачиваем блоки <li> в <ul>

  // Замена заголовков "###" и "##"
  text = text.replace(/^###\s*(.+?)$/gm, '<h3>$1</h3>');
  text = text.replace(/^##\s*(.+?)$/gm, '<h2>$1</h2>');

  // Замена выделений: **bold** и *italic*
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/\*(?!\s)(.+?)(?<!\s)\*/g, '<em>$1</em>');

  // Обработка двойного пробела -> один пробел
  text = text.replace(/ {2,}/g, ' ');

  // Оборачивание абзацев в <p> (кроме строк с уже существующими тегами)
  text = text.replace(
    /^(?!<h[2-3]>|<strong>|<em>|<ul>|<li>|<\/li>)(.+?)$/gm,
    '<p>$1</p>'
  );

  // Удаление лишних пробелов в конце тегов
  text = text.replace(/ <\/p>/g, '</p>');

  // Объединение всех строк в одну
  text = text.replace(/\r?\n|\r/g, '');

  text = text.replace(/---/g, '<br/><hr/><br/>');

  // Экранирование кавычек и очистка
  const result = text.replace(/"/g, '&quot;').trim();

  return result;
}
