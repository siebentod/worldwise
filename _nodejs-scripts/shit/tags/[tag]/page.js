import { getArticlesByTag, getAllTags, getTagsWithCount } from '@/lib/articles';
import ArticleList from '@/components/ArticleList';
import Search from '@/components/Search';
import TagCloud from '@/components/TagCloud';

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({
    tag: tag,
  }));
}

export default async function TagPage({ searchParams }) {
  const params = searchParams.q || '';
  const selectedTags = params.getAll('tags') || [];
  const articles = await getArticlesByTag(decodeURIComponent(params.tag || ''));
  const tags = await getTagsWithCount();

  return (
    <div className="flex flex-col md:flex-row">
      <main className="container mx-auto p-4 min-h-screen">
        <h1 className="text-3xl font-bold mb-4">WorldWise</h1>
        <Search selectedTags={selectedTags} />
        <ArticleList articles={articles} />
      </main>
      <aside className="md:w-1/4">
        <div className="sticky top-4">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Популярные теги
          </h2>
          <TagCloud tags={tags} selectedTags={selectedTags} />
        </div>
      </aside>
    </div>
  );
}
