import ArticleList from '@/components/ArticleList';
import Search from '@/components/Search';
import TagCloud from '@/components/TagCloud';
import { hyphenToSpace } from '@/lib/space-and-hyphen';
import './home.css';
import { convert } from 'html-to-text';

import articles from '@/lib/generated/articles.json';
import tags from '@/lib/generated/tags-with-count.json';

export default async function Home({ searchParams: searchParamsPromise }) {
  const searchParams = await searchParamsPromise;
  const selectedTags = searchParams.tags
    ? searchParams.tags.split(' ').map(hyphenToSpace)
    : [];
  const searchQuery = searchParams.search || '';

  const filteredArticles = articles.filter((article) => {
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => article.tags.includes(tag));
    const matchesSearch =
      searchQuery.length < 3 ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      convert(article.content)
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    return matchesTags && matchesSearch;
  });

  return (
    <div className="flex flex-row home">
      <main className="container mx-auto p-4 min-h-screen">
        <div className="flex items-center mb-4">
          <a
            className="text-3xl font-bold cursor-pointer select-none text-center sm:text-start"
            href="/"
          >
            WorldWise
          </a>
          <h2 className="ml-3 mt-[5px] text-xl cursor-default select-none hidden sm:inline">
            Тексты о религии, философии и психологии
          </h2>
        </div>
        <Search searchQuery={searchQuery} selectedTags={selectedTags} />
        {filteredArticles.length > 0 ? (
          <ArticleList
            selectedTags={selectedTags}
            filteredArticles={filteredArticles}
            searchQuery={searchQuery}
            tags={tags}
            loadCount={12}
          />
        ) : (
          'Совпадения не найдены :('
        )}
      </main>
      <aside className="hidden md:w-1/4 md:flex justify-center mx-2">
        <div className="fixed max-h-[100%] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-2 text-center font-[spectral] mt-4">
            Теги
          </h2>
          <TagCloud
            tags={tags}
            searchQuery={searchQuery}
            selectedTags={selectedTags}
            filteredArticles={filteredArticles}
          />
        </div>
      </aside>
    </div>
  );
}