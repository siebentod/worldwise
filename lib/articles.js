import fs from 'fs';
import path from 'path';

const articlesDirectory = path.join(process.cwd(), 'articles');

export async function getAllArticles() {
  const fileNames = fs.readdirSync(articlesDirectory);
  const articles = fileNames.map((fileName) => {
    const fullPath = path.join(articlesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const article = JSON.parse(fileContents);
    return {
      slug: fileName.replace(/\.json$/, ''),
      ...article,
    };
  });

  return articles.sort((a, b) => (a.date > b.date ? -1 : 1));
}

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
  const articles = await getAllArticles();
  return articles.filter((article) => article.tags.includes(tag));
}

export async function getAllTags() {
  const articles = await getAllArticles();
  const tags = new Set();
  articles.forEach((article) => {
    article.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags);
}

export async function getTagsWithCount() {
  const articles = await getAllArticles();
  const tagCount = {};
  articles.forEach((article) => {
    article.tags.forEach((tag) => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });
  return tagCount;
}

export async function searchArticles(query) {
  const articles = await getAllArticles();
  return articles.filter(
    (article) =>
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.content.toLowerCase().includes(query.toLowerCase())
  );
}

export async function getArticlesByTheme(theme) {
  const articles = await getAllArticles();
  return articles.filter((article) => article.theme === theme).slice(0, 10);
}

export async function getAllThemes() {
  const articles = await getAllArticles();
  const themes = new Set(articles.map((article) => article.theme));
  return Array.from(themes);
}
