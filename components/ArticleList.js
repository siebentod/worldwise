'use client';
// !!!

import Link from 'next/link';
import TagLink from './TagLink';
import parse from 'html-react-parser';
import { convert } from 'html-to-text';
import { useInView } from 'react-intersection-observer';
import { searchExcerpt, defaultExcerpt } from '@/lib/excerpt-fns';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function ArticleList({
  filteredArticles: articles,
  selectedTags,
  searchQuery,
  tags,
  loadCount: articlesCount,
  articlesInArticle = false,
}) {
  const [visibleCards, setVisibleCards] = useState([]);
  const [loadCount, setLoadCount] = useState(articlesCount);
  const { ref, inView } = useInView();

  const excerpt = (article) => {
    return searchQuery
      ? // &&   convert(article.content).toLowerCase().includes(searchQuery.toLowerCase())
        searchExcerpt(article.content, searchQuery)
      : defaultExcerpt(article.content);
  };

  useEffect(() => {
    setVisibleCards(articles.slice(0, loadCount));
  }, [articles, loadCount]);

  // Подгружаем новую партию при скролле
  useEffect(() => {
    if (inView && loadCount < articles.length) {
      const nextLoadCount = loadCount + 20;
      setVisibleCards(articles.slice(0, nextLoadCount));
      setLoadCount(nextLoadCount);
    }
  }, [articles, inView, loadCount]);

  const ArticleSkeleton = () => (
    <div key={1} className="border p-4 pr-3 rounded bg-white">
      <h2 className="text-xl font-semibold mb-2 leading-6">
        <Skeleton height={80} />
      </h2>
      <p className="text-gray-600 mb-2">
        <Skeleton height={30} />
      </p>
      <p className="mb-2">
        <Skeleton height={300} />
      </p>
    </div>
  );

  return (
    <div
      className={`grid gap-4 ${
        articlesInArticle
          ? 'md:grid-cols-2 xlg:grid-cols-2'
          : 'sm:grid-cols-2 900px:grid-cols-3 xlg:grid-cols-3'
      }`}
    >
      {visibleCards.length > 0 ? (
        visibleCards.map((article) => (
          <div key={article.slug} className="border p-4 pr-3 rounded bg-white">
            <h2 className="text-xl font-semibold mb-2 leading-[1.375rem]">
              <Link href={`/articles/${article.slug}`}>{article.title}</Link>
            </h2>
            <p className="text-gray-600 mb-2">{article.date}</p>
            <p className="mb-2 leading-[1.375rem]">{parse(excerpt(article))}</p>
            <div className="flex justify-between items-center">
              <div className="flex flex-wrap gap-2">
                {article.tags.slice(0, 3).map((tag) => (
                  <TagLink
                    tag={tag}
                    key={tag}
                    selectedTags={selectedTags}
                    count={tags[tag]}
                  />
                ))}
              </div>
            </div>
          </div>
        ))
      ) : (
        <>
          <ArticleSkeleton />
          <ArticleSkeleton />
          <ArticleSkeleton />
          <ArticleSkeleton />
        </>
      )}
      {/* Невидимый триггер для подгрузки */}
      {loadCount < articles.length && (
        <div ref={ref} style={{ height: '20px' }} />
      )}
    </div>
  );
}
