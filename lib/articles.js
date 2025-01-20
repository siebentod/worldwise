import fs from 'fs';
import path from 'path';

const articlesDirectory = path.join(process.cwd(), 'articles');
const generatedDirectory = path.join(process.cwd(), 'lib', 'generated');

export async function getArticleBySlug(slug) {
  const fullPath = path.join(articlesDirectory, `${slug}.json`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const article = JSON.parse(fileContents);
  return {
    slug,
    ...article,
  };
}

export async function getArticlesByTag(tag) {
  const articles = fs.readFileSync(
    path.join(generatedDirectory, 'articles.json'),
    'utf8'
  );
  const parsedArticles = JSON.parse(articles);
  return parsedArticles.filter((article) => article.tags.includes(tag));
}

// export async function getAllTags() {
//   const articles = await getAllArticles();
//   const tags = new Set();
//   articles.forEach((article) => {
//     article.tags.forEach((tag) => tags.add(tag));
//   });
//   return Array.from(tags);
// }

export async function searchArticles(query) {
  const articles = fs.readFileSync(
    path.join(generatedDirectory, 'articles.json'),
    'utf8'
  );
  const parsedArticles = JSON.parse(articles);
  return parsedArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.content.toLowerCase().includes(query.toLowerCase())
  );
}

export async function getArticlesByTheme(theme) {
  const articles = fs.readFileSync(
    path.join(generatedDirectory, 'articles.json'),
    'utf8'
  );
  const parsedArticles = JSON.parse(articles);
  return parsedArticles
    .filter((article) => article.theme === theme)
    .slice(0, 10);
}
