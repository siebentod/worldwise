import ArticleList from './ArticleList';

export default async function ThemeArticles({ theme, tags, articles }) {
  return (
    <div>
      <ArticleList
        filteredArticles={articles}
        tags={tags}
        loadCount={3}
        articlesInArticle={true}
      />
    </div>
  );
}
