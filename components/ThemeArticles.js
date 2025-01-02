import { getAllArticles, getTagsWithCount } from '@/lib/articles';
import ArticleList from './ArticleList';

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ThemeArticles({ theme }) {
  const tags = await getTagsWithCount();
  const articles = await getAllArticles();
  return (
    <div>
      <ArticleList filteredArticles={articles} />
    </div>
  );
}
