import fs from 'fs';
import path from 'path';

const articlesDirectory = path.join(process.cwd(), 'articles');
const generatedDirectory = path.join(process.cwd(), 'lib', 'generated');

await generateAllArticles();
await generateTagsWithCount();
await generateAllThemes();

async function generateAllArticles() {
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

  const sortedArticles = articles.sort((a, b) => (a.date > b.date ? -1 : 1));
  fs.writeFileSync(
    path.join(generatedDirectory, 'articles.json'),
    JSON.stringify(sortedArticles)
  );
}

async function generateTagsWithCount() {
  const articles = fs.readFileSync(
    path.join(generatedDirectory, 'articles.json'),
    'utf8'
  );
  const parsedArticles = JSON.parse(articles);
  const tagCount = {};
  parsedArticles.forEach((article) => {
    article.tags.forEach((tag) => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });
  fs.writeFileSync(
    path.join(generatedDirectory, 'tags-with-count.json'),
    JSON.stringify(tagCount)
  );
}

async function generateAllThemes() {
  const articles = fs.readFileSync(
    path.join(generatedDirectory, 'articles.json'),
    'utf8'
  );
  const parsedArticles = JSON.parse(articles);
  const themes = new Set(parsedArticles.map((article) => article.theme));
  const arrThemes = Array.from(themes);
  fs.writeFileSync(
    path.join(generatedDirectory, 'themes.json'),
    JSON.stringify(arrThemes)
  );
}
