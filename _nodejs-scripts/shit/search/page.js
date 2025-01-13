import { searchArticles } from '../../lib/articles';
import ArticleList from '../../components/ArticleList';

export default async function SearchPage({ searchParams }) {
  const query = searchParams.q || '';
  const articles = await searchArticles(query);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-4">Search Results for "{query}"</h1>
      <ArticleList articles={articles} />
    </div>
  );
}
