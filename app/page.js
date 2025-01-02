import { getAllArticles, getTagsWithCount } from '@/lib/articles';
import ArticleList from '@/components/ArticleList';
import Search from '@/components/Search';
import TagCloud from '@/components/TagCloud';

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles;
}

export default async function Home({ searchParams: searchParamsPromise }) {
  const articles = await getAllArticles();
  const tags = await getTagsWithCount();
  const searchParams = await searchParamsPromise;
  const selectedTags = searchParams.tags ? searchParams.tags.split(' ') : [];
  const searchQuery = searchParams.search || '';

  const filteredArticles = articles.filter((article) => {
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => article.tags.includes(tag));
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTags && matchesSearch;
  });

  return (
    <div className="flex flex-col md:flex-row">
      <main className="container mx-auto p-4 min-h-screen">
        <h1 className="text-3xl font-bold mb-4">WorldWise</h1>
        <Search searchQuery={searchQuery} selectedTags={selectedTags} />
        <ArticleList
          selectedTags={selectedTags}
          filteredArticles={filteredArticles}
          searchQuery={searchQuery}
        />
      </main>
      <aside className="md:w-1/4">
        <div className="sticky top-4">
          <h2 className="text-xl font-semibold mb-4 text-center">Теги</h2>
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
