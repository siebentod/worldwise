import path from 'path';
import fs from 'fs/promises';

import {
  getArticleBySlug,
  getAllArticles,
  getTagsWithCount,
} from '@/lib/articles';
import Link from 'next/link';
import Author from '@/components/Author';
import TagCloud from '@/components/TagCloud';
import ThemeArticles from '@/components/ThemeArticles';
import { Suspense } from 'react';
import TagLink from '@/components/TagLink';
import { spaceToHyphen } from '@/lib/space-and-hyphen';
import './article.css';

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const filePath = path.join(process.cwd(), 'articles', `${slug}.json`);
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileContent);

    return {
      title: `${data.title} | WorldWise`,
      description: 'Тексты о философии',
    };
  } catch (err) {
    console.error(`Ошибка чтения файла ${filePath}:`, err.message);
    return { title: 'Страница не найдена', description: '' };
  }
}

export default async function ArticlePage({ params }) {
  const article = await getArticleBySlug((await params).slug);
  const tags = await getTagsWithCount();
  const articles = await getAllArticles();

  return (
    <div className="article">
      <article className="container mx-auto p-4 min-h-screen">
        <h1 className="text-3xl font-bold my-4">{article.title}</h1>
        <p className="text-gray-600 mb-4">Published on: {article.date}</p>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
        <Author />
        <div className="mt-2 flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold mb-2">Теги:</h2>
            <div className="flex flex-wrap gap-2">
              {article.tags.map(
                (tag) => (
                  // tags[tag] > 1 && (
                  <Link
                    key={tag}
                    href={`/?tags=${spaceToHyphen(tag)}`}
                    className="bg-gray-200 px-2 py-1 rounded transition-all hover:bg-gray-300"
                  >
                    {tag}
                  </Link>
                )
                // )
              )}
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">
            Больше по теме:{' '}
            <a
              key={article.theme}
              // href={`/theme/${article.theme}`}
              className="bg-gray-200 px-2 py-1 rounded font-semibold transition-all hover:bg-gray-300 cursor-pointer"
            >
              {article.theme === 'phi' ? 'Философия' : article.theme}
            </a>
          </h2>
          <Suspense fallback={<div>Loading...</div>}>
            <ThemeArticles
              theme={article.theme}
              tags={tags}
              articles={articles}
            />
          </Suspense>
        </div>
      </article>
    </div>
  );
}
